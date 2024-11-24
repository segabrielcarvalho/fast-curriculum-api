import { Field, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { Type as TypeClassTransformer } from 'class-transformer';

export interface IGenericConnectManyInputType<T> {
   connect: T[];
}

export function GenericConnectManyInput<T>(
   classRef: Type<T>,
): Type<IGenericConnectManyInputType<T>> {
   @InputType({ isAbstract: true })
   abstract class GenericConnectManyInputType
      implements IGenericConnectManyInputType<T>
   {
      @TypeClassTransformer(() => classRef)
      @ValidateNested()
      @Field(() => [classRef])
      connect: T[];
   }
   return GenericConnectManyInputType as Type<IGenericConnectManyInputType<T>>;
}
