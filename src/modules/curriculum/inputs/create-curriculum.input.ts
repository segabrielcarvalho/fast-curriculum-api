import { Field, InputType, PickType } from '@nestjs/graphql';
import { CurriculumObject } from '../objects/curriculum.object';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GenericConnectIdInput } from '../../graphql/inputs/generic/generic-connect-id.input';

@InputType()
export class CreateCurriculumInput extends PickType(
   CurriculumObject,
   ['title', 'jobDescription', 'isPublic'] as const,
   InputType,
) {}
