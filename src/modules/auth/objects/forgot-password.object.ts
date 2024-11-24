import { ObjectType, PickType } from '@nestjs/graphql';
import { LoginObject } from './login-object';

@ObjectType()
export class ForgotPasswordObject extends PickType(
   LoginObject,
   ['token'],
   ObjectType,
) {}
