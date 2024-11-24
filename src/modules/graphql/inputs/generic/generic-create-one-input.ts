import { Field, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { Type as TypeClassTransformer } from 'class-transformer';

export interface IGenericCreateOneInputType<T> {
   create: T;
}

export function GenericCreateOneInput<T>(
   classRef: Type<T>,
): Type<IGenericCreateOneInputType<T>> {
   @InputType({ isAbstract: true })
   abstract class GenericCreateOneInputType
      implements IGenericCreateOneInputType<T>
   {
      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => classRef)
      create: T;
   }
   return GenericCreateOneInputType as Type<IGenericCreateOneInputType<T>>;
}
