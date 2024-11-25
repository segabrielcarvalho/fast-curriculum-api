import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProfessionalInfoObject } from '../objects/professional-info.object';
import { GetProfessionalInfoService } from '../services/get/get-professional-info.service';
import { GetProfessionalInfoByUserIdService } from '../services/get-by-user-id/get-professional-info-by-userId.service';

@Resolver(() => ProfessionalInfoObject)
export class ProfessionalInfoResolver {
   constructor(
      private readonly getProfessionalInfoService: GetProfessionalInfoService,
      private readonly getProfessionalInfoByUserIdService: GetProfessionalInfoByUserIdService,
   ) {}

   @Query(() => ProfessionalInfoObject)
   async getProfessionalInfo(@Args('id') id: string) {
      return this.getProfessionalInfoService.run(id);
   }

   @Query(() => ProfessionalInfoObject)
   async getProfessionalInfoByUserId(@Args('userId') userId: string) {
      return this.getProfessionalInfoByUserIdService.run(userId);
   }
}
