import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserObject } from '../../objects/user.object';
import { CreateUserService } from '../../services/create/create-user.service';
import { CreateUserArgs } from '../../args/create-user.args';

@Resolver(() => UserObject)
export class UserResolver {
   constructor(private readonly createUserService: CreateUserService) {}

   @Mutation(() => UserObject)
   async createUser(@Args() args: CreateUserArgs) {
      return this.createUserService.run(args);
   }
}
