import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginService } from '../services/login/login.service';
import { Public } from '../decorators/public.decorator';
import { LoginObject } from '../objects/login-object';
import { LoginArgs } from '../args/login.args';

@Resolver()
export class AuthResolver {
   constructor(private readonly loginService: LoginService) {}

   @Public()
   @Mutation(() => LoginObject)
   login(@Args() args: LoginArgs) {
      return this.loginService.run(args);
   }
}
