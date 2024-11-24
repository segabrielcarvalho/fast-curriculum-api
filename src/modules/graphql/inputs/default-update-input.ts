import { InputType, PickType } from '@nestjs/graphql';
import { UniqueFieldIDInput } from './unique-field-id-input';

@InputType()
export class DefaultUpdateInput extends PickType(
   UniqueFieldIDInput,
   ['id'] as const,
   InputType,
) {}
