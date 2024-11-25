import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
   IsBoolean,
   IsDate,
   IsOptional,
   IsString,
   IsUUID,
   ValidateNested,
} from 'class-validator';
import { ProfessionalInfoObject } from '../../professional-info/objects/professional-info.object';

@ObjectType()
export class SkillObject {
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
   @Field(() => Boolean, { nullable: false })
   isActive!: boolean;

   @IsString()
   @Field(() => String, { nullable: false })
   name!: string;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   description!: string | null;

   @ValidateNested()
   @Type(() => ProfessionalInfoObject)
   @Field(() => ProfessionalInfoObject, { nullable: false })
   ProfessionalInfo?: ProfessionalInfoObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   professionalInfoId!: string;
}
