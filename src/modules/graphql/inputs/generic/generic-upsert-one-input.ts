import { Field, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { Type as TypeClassTransformer } from 'class-transformer';

export interface IGenericUpsertOneInputType<T> {
   upsert: T;
}

export function GenericUpsertOneInput<T>(
   classRef: Type<T>,
): Type<IGenericUpsertOneInputType<T>> {
   @InputType({ isAbstract: true })
   abstract class GenericUpsertOneInputType
      implements IGenericUpsertOneInputType<T>
   {
      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => classRef)
      upsert: T;
   }
   return GenericUpsertOneInputType as Type<IGenericUpsertOneInputType<T>>;
}
