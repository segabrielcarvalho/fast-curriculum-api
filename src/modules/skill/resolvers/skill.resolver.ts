import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SkillObject } from '../objects/skill.object';
import { CreateSkillService } from '../services/create/create-skill.service';
import { CreateSkillArgs } from '../args/create-skill.args';
import { DeleteSkillService } from '../services/delete/delete-skill.service';

@Resolver(() => SkillObject)
export class SkillResolver {
   constructor(
      private readonly createSkillService: CreateSkillService,
      private readonly deleteSkillService: DeleteSkillService,
   ) {}

   @Mutation(() => SkillObject)
   async createSkill(@Args() args: CreateSkillArgs) {
      return this.createSkillService.run(args);
   }

   @Mutation(() => SkillObject)
   async deleteSkill(@Args('id') id: string) {
      return this.deleteSkillService.run(id);
   }
}
