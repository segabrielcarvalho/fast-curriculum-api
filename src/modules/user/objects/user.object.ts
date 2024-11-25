import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { RoleEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
   IsBoolean,
   IsDate,
   IsEmail,
   IsEnum,
   IsOptional,
   IsString,
   IsUUID,
   ValidateNested,
} from 'class-validator';
import { AvatarObject } from '../../avatar/objects/avatar.object';
import { ProfessionalInfoObject } from '../../professional-info/objects/professional-info.object';

@ObjectType()
export class UserObject {
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
   name!: string | null;

   @IsEmail()
   @Field(() => String, { nullable: false })
   email!: string;

   @IsEnum(RoleEnum)
   @Field(() => RoleEnum, { nullable: false })
   role!: RoleEnum;

   @IsDate()
   @IsOptional()
   @Field(() => Date, { nullable: true })
   lastLogin!: Date | null;

   @ValidateNested()
   @Type(() => AvatarObject)
   @Field(() => AvatarObject, { nullable: true })
   Avatar?: AvatarObject;

   @ValidateNested()
   @Type(() => ProfessionalInfoObject)
   @Field(() => ProfessionalInfoObject, { nullable: true })
   ProfessionalInfo?: ProfessionalInfoObject | null;

   // @Field(() => [Curriculum], { nullable: true })
   // CVs?: Array<Curriculum>;
}
