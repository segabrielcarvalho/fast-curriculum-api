import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
   IsBoolean,
   IsDate,
   IsOptional,
   IsString,
   IsUUID,
   ValidateNested,
} from 'class-validator';
import { ProfessionalInfoObject } from '../../professional-info/objects/professional-info.object';
import { Type } from 'class-transformer';

@ObjectType()
export class EducationObject {
   @IsUUID()
   @Field(() => ID, { nullable: false })
   id!: string;

   @IsDate()
   @Field(() => Date, { nullable: false })
   createdAt!: Date;

   @IsDate()
   @Field(() => Date, { nullable: false })
   updatedAt!: Date;

   @IsBoolean()
   @Field(() => Boolean, { nullable: false, defaultValue: true })
   isActive!: boolean;

   @IsString()
   @Field(() => String, { nullable: false })
   institution!: string;

   @IsString()
   @Field(() => String, { nullable: false })
   degree!: string;

   @IsString()
   @Field(() => String, { nullable: false })
   studyArea!: string;

   @IsDate()
   @Field(() => Date, { nullable: false })
   startAt!: Date;

   @IsDate()
   @IsOptional()
   @Field(() => Date, { nullable: true })
   endAt!: Date | null;

   @ValidateNested()
   @Type(() => ProfessionalInfoObject)
   @Field(() => ProfessionalInfoObject, { nullable: false })
   ProfessionalInfo?: ProfessionalInfoObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   professionalInfoId!: string;
}
