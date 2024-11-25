import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactInfoObject } from '../objects/contact-info.object';
import { UpdateContactInfoService } from '../services/update/update-contact-info.service';
import { GetContactInfoByUserIdService } from '../services/get-by-userId/get-contact-info-by-userId.service';
import { UpdateContactInfoArgs } from '../args/update-contact-info.args';

@Resolver(() => ContactInfoObject)
export class ContactInfoResolver {
   constructor(
      private readonly updateContactInfoService: UpdateContactInfoService,
      private readonly getContactInfoByUserIdService: GetContactInfoByUserIdService,
   ) {}

   @Mutation(() => ContactInfoObject)
   async updateContactInfo(@Args() args: UpdateContactInfoArgs) {
      return this.updateContactInfoService.run(args);
   }

   @Query(() => ContactInfoObject)
   async getContactInfoByUserId(@Args('userId') userId: string) {
      return this.getContactInfoByUserIdService.run(userId);
   }
}
