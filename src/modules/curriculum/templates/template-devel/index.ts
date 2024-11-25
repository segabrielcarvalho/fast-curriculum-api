import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { compile } from 'handlebars';

export type CurriculumTemplateArgs = {
   header: {
      name: string;
      contact: string;
   };
   education?: {
      institution: string;
      location: string;
      graduationDate: string;
      degree: string;
      details: string[];
   }[];
   technicalSkills?: {
      category: string;
      skills: string;
      details: string[];
   }[];
   relevantCoursework?: string[];
   experience?: {
      organization: string;
      location: string;
      position: string;
      date: string;
      responsibilities: string[];
   }[];
   interests?: string[];
};

export const generateCurriculumTemplate = async (
   args: CurriculumTemplateArgs,
): Promise<string> => {
   const templatePath = path.resolve(__dirname, './template-devel.hbs');
   const templateContent = await fs.readFile(templatePath, {
      encoding: 'utf-8',
   });

   const compiledTemplate = compile<CurriculumTemplateArgs>(templateContent);
   return compiledTemplate(args);
};
