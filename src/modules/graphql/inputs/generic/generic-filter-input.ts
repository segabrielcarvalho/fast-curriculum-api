import { Field, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { Type as TypeClassTransformer } from 'class-transformer';

export interface IGenericFilterInputType<T> {
   AND?: T;
   NOT?: T;
   OR?: T;
}

export function GenericFilterInput<T>(
   classRef: Type<T>,
): Type<IGenericFilterInputType<T>> {
   @InputType({ isAbstract: true })
   abstract class GenericFilterInputType implements IGenericFilterInputType<T> {
      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => classRef, { nullable: true })
      AND?: T;

      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => classRef, { nullable: true })
      NOT?: T;

      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => classRef, { nullable: true })
      OR?: T;
   }
   return GenericFilterInputType as Type<IGenericFilterInputType<T>>;
}
