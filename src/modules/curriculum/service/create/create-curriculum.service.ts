import { Injectable, NotFoundException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PrismaService } from '../../../prisma/prisma.service';
import OpenAIProvider from '../../../openAI/providers/openAI.provider';
import { zodResponseFormat } from 'openai/helpers/zod';
import { CreateCurriculumArgs } from '../../args/create-curriculum.args';
import { generateCurriculumTemplate } from '../../templates/template-devel';
import { ICurrentUser } from '../../../auth/auth.types';
import { CurriculumSchema } from './constants';
import PromiseType from '../../../../types/promise-type';

@Injectable()
export class CreateCurriculumService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly openAIProvider: OpenAIProvider,
   ) {}

   public async run({ data }: CreateCurriculumArgs, user: ICurrentUser) {
      const professionalInfo = await this.getProfessionalInfo(user.id);

      if (!professionalInfo)
         throw new NotFoundException(
            'Informações profissionais não encontradas.',
         );

      const payload = this.buildPayload(professionalInfo, data.jobDescription);
      const completion = await this.completion(payload);
      const pdfBuffer = await this.generatePDF(completion);

      const base64PDF = Buffer.from(pdfBuffer).toString('base64');

      return base64PDF;
   }

   private buildPayload(
      professionalInfo: PromiseType<
         ReturnType<typeof this.getProfessionalInfo>
      >,
      jobDescription: string,
   ) {
      const contactInfo = professionalInfo.ContactInfo;
      return {
         header: {
            name: professionalInfo.User?.name || 'Usuário',
            contact: [
               contactInfo.phone,
               contactInfo.address,
               contactInfo.city,
               contactInfo.state,
               contactInfo.linkedin,
               contactInfo.github,
            ]
               .filter(Boolean)
               .join(' | '),
         },
         education: professionalInfo.Educations?.map((edu) => ({
            institution: edu.institution,
            graduationDate: new Date(edu.endAt).toLocaleDateString('pt-BR', {
               month: 'long',
               year: 'numeric',
            }),
            degree: edu.degree,
            details: [edu.studyArea],
         })),
         technicalSkills: professionalInfo.Skills?.map((skill) => ({
            skills: skill.name,
            details: skill.description ? [skill.description] : [],
         })),
         experience: professionalInfo.Companies?.map((company) => ({
            organization: company.name,
            location: '',
            position: company.role,
            date: `${new Date(company.startAt).toLocaleDateString('pt-BR', {
               month: 'short',
               year: 'numeric',
            })} - ${
               company.endAt
                  ? new Date(company.endAt).toLocaleDateString('pt-BR', {
                       month: 'short',
                       year: 'numeric',
                    })
                  : 'Atual'
            }`,
            responsibilities: [
               'Responsabilidade genérica (personalize conforme necessário)',
            ],
         })),
         interests: ['Tecnologia', 'Inovação'],
         jobDescription,
      };
   }

   private async completion(payload: {
      header: { name: any; contact: string };
      education: any;
      technicalSkills: any;
      experience: any;
      interests: string[];
      jobDescription: string;
   }) {
      const response = await this.openAIProvider.createChatCompletion({
         model: 'gpt-4o-2024-11-20',
         messages: [
            {
               role: 'system',
               content:
                  'Você é um assistente especializado em criar currículos otimizados. Use as informações fornecidas para gerar um currículo',
            },
            { role: 'user', content: JSON.stringify(payload) },
         ],
         response_format: zodResponseFormat(CurriculumSchema, 'math_response'),
      });

      if (response.content) return response.content;

      if (response.refusal)
         throw new NotFoundException(
            'O modelo se recusou a gerar o currículo.',
         );

      throw new NotFoundException('Erro ao gerar o conteúdo do currículo.');
   }

   private async generatePDF(content: any) {
      const parsedContent =
         typeof content === 'string' ? JSON.parse(content) : content;
      const template = await generateCurriculumTemplate(parsedContent);

      const browser = await puppeteer.launch({
         headless: true,
         args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setContent(template, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      await browser.close();

      return pdfBuffer;
   }

   private async getProfessionalInfo(userId: string) {
      return this.prisma.professionalInfo.findUnique({
         where: { userId },
         include: {
            Companies: true,
            Educations: true,
            Skills: true,
            ContactInfo: true,
            User: true,
         },
      });
   }
}
