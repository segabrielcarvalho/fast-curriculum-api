import { Field, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { Type as TypeClassTransformer } from 'class-transformer';

export interface IGenericConnectOneInputType<T> {
   connect: T;
}

export function GenericConnectOneInput<T>(
   classRef: Type<T>,
): Type<IGenericConnectOneInputType<T>> {
   @InputType({ isAbstract: true })
   abstract class GenericConnectOneInputType
      implements IGenericConnectOneInputType<T>
   {
      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => classRef)
      connect: T;
   }
   return GenericConnectOneInputType as Type<IGenericConnectOneInputType<T>>;
}
