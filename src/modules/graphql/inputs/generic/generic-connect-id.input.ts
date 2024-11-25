import { InputType } from '@nestjs/graphql';
import { GenericConnectOneInput } from './generic-connect-one-input';
import { UniqueFieldIDInput } from '../unique-field-id-input';

@InputType()
export class GenericConnectIdInput extends GenericConnectOneInput(
   UniqueFieldIDInput,
) {}
