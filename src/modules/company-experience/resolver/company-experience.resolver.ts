import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyExperienceObject } from '../objects/company-experience.object';
import { CreateCompanyExperienceService } from '../service/create/create-company-experience.service';
import { CreateCompanyExperienceArgs } from '../args/create-company-experience.args';
import { DeleteCompanyExperienceService } from '../service/delete/delete-company-experience.service';
import { ListCompaniesExperienceService } from '../service/list/list-companies-experience.service';
import { ListCompaniesExperienceArgs } from '../args/list-companies-experience.args';

@Resolver(() => CompanyExperienceObject)
export class CompanyExperienceResolver {
   constructor(
      private readonly createCompanyExperienceService: CreateCompanyExperienceService,
      private readonly deleteCompanyExperienceService: DeleteCompanyExperienceService,
      private readonly listCompanyExperienceService: ListCompaniesExperienceService,
   ) {}

   @Mutation(() => CompanyExperienceObject)
   async createCompanyExperience(@Args() args: CreateCompanyExperienceArgs) {
      return this.createCompanyExperienceService.run(args);
   }

   @Mutation(() => CompanyExperienceObject)
   async deleteCompanyExperience(@Args('id') id: string) {
      return this.deleteCompanyExperienceService.run(id);
   }

   @Query(() => [CompanyExperienceObject])
   async listCompanyExperience(@Args() args: ListCompaniesExperienceArgs) {
      return this.listCompanyExperienceService.run(args);
   }
}
