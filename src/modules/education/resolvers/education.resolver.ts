import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EducationObject } from '../objects/education.object';
import { CreateEducationService } from '../services/create/create-education.service';
import { CreateEducationArgs } from '../args/create-education.args';
import { ListEducationsService } from '../services/list/list-educations.service';
import { ListEducationsArgs } from '../args/list-educations.args';
import { DeleteEducationService } from '../services/delete/delete-education.service';

@Resolver(() => EducationObject)
export class EducationResolver {
   constructor(
      private readonly createEducationService: CreateEducationService,
      private readonly listEducationService: ListEducationsService,
      private readonly deleteEducationService: DeleteEducationService,
   ) {}

   @Mutation(() => EducationObject)
   async createEducation(@Args() args: CreateEducationArgs) {
      return this.createEducationService.run(args);
   }

   @Mutation(() => EducationObject)
   async deleteEducation(@Args('id') id: string) {
      return this.deleteEducationService.run(id);
   }

   @Query(() => [EducationObject])
   async listEducations(@Args() args: ListEducationsArgs) {
      return this.listEducationService.run(args);
   }
}
