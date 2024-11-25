import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurriculumObject } from '../objects/curriculum.object';
import { CreateCurriculumArgs } from '../args/create-curriculum.args';
import { CreateCurriculumService } from '../service/create/create-curriculum.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../auth/auth.types';

@Resolver(() => CurriculumObject)
export class CurriculumResolver {
   constructor(
      private readonly crateCurriculumService: CreateCurriculumService,
   ) {}

   @Mutation(() => String)
   async createCurriculum(
      @Args() args: CreateCurriculumArgs,
      @CurrentUser() user: ICurrentUser,
   ): Promise<string> {
      return this.crateCurriculumService.run(args, user);
   }
}
