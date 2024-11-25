import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CompanyExperienceTypeEnum } from '@prisma/client';
import { ProfessionalInfoObject } from '../../professional-info/objects/professional-info.object';
import {
   IsBoolean,
   IsDate,
   IsEnum,
   IsOptional,
   IsString,
   IsUUID,
   ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@ObjectType()
export class CompanyExperienceObject {
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
   @Field(() => String, { nullable: true })
   description?: string;

   @IsString()
   @Field(() => String, { nullable: false })
   role!: string;

   @IsEnum(CompanyExperienceTypeEnum)
   @Field(() => CompanyExperienceTypeEnum, { nullable: false })
   type!: keyof typeof CompanyExperienceTypeEnum;

   @IsDate()
   @Field(() => Date, { nullable: false })
   startAt!: Date;

   @IsDate()
   @IsOptional()
   @Field(() => Date, { nullable: true })
   endAt?: Date | null;

   @ValidateNested()
   @Type(() => ProfessionalInfoObject)
   @Field(() => ProfessionalInfoObject, { nullable: false })
   ProfessionalInfo?: ProfessionalInfoObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   professionalInfoId!: string;
}
