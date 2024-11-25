import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import OpenAI from 'openai';
import { MyLogger } from '../../logger/my-logger.service';
import openAIConfig from '../openAI.config';
import { DefaultQuery, RequestOptions } from 'openai/core';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';

@Injectable()
class OpenAIProvider {
   private readonly openAIApi: OpenAI;

   constructor(
      @Inject(openAIConfig.KEY)
      private readonly config: ConfigType<typeof openAIConfig>,
      private readonly logger: MyLogger,
   ) {
      this.logger.setContext(OpenAIProvider.name);

      this.openAIApi = new OpenAI({
         apiKey: this.config.apiKey,
         organization: this.config.organization,
         baseURL: this.config.apiBaseUrl,
      });
   }

   private handleError(e: any, prefix = 'Erro no OpenAI Provider: ') {
      if (e?.response?.data) {
         const { data } = e.response;
         this.logger.error('data: ', data);
         if (data.message)
            throw new BadRequestException(`${prefix} ${data.message}`);
         if (data.error)
            throw new BadRequestException(`${prefix} ${data.error}`);
         throw new Error(`${prefix} ${data}`);
      }
      this.logger.error(e);
      throw new BadRequestException(`${prefix} ${e.message}`);
   }

   async createChatCompletion(
      body: ChatCompletionCreateParamsNonStreaming,
      options?: RequestOptions,
   ) {
      try {
         const response = await this.openAIApi.chat.completions.create(
            body,
            options,
         );
         return response.choices[0].message;
      } catch (e) {
         this.handleError(e, 'Erro ao criar chat completion no OpenAI:');
      }
   }

   /**
    * Cria uma nova instância do cliente OpenAI com uma baseQuery customizada.
    * @param baseQuery - Parâmetros de consulta padrão a serem aplicados.
    * @returns Instância personalizada do cliente OpenAI.
    */
   createCustomClient(baseQuery: DefaultQuery) {
      const customClient = new OpenAI({
         apiKey: this.config.apiKey,
         organization: this.config.organization,
         baseURL: this.config.apiBaseUrl,
         defaultQuery: baseQuery,
      });

      this.logger.log(
         'Custom OpenAI client created with baseQuery:',
         baseQuery,
      );
      return customClient;
   }
}

export default OpenAIProvider;
