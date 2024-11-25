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
export class ContactInfoObject {
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
   @IsOptional()
   @Field(() => String, { nullable: true })
   phone!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   address!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   city!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   state!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   country!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   zipCode!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   website!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   linkedin!: string | null;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   github!: string | null;

   @ValidateNested()
   @Type(() => ProfessionalInfoObject)
   @Field(() => ProfessionalInfoObject, { nullable: false })
   ProfessionalInfo?: ProfessionalInfoObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   professionalInfoId!: string;
}
