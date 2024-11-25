import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
   IsBoolean,
   IsDate,
   IsOptional,
   IsString,
   IsUrl,
   IsUUID,
   ValidateNested,
} from 'class-validator';
import { UserObject } from '../../user/objects/user.object';
import { Type } from 'class-transformer';

@ObjectType()
export class CurriculumObject {
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
   title!: string;

   @IsString()
   @IsOptional()
   @Field(() => String, { nullable: true })
   jobDescription!: string | null;

   @IsBoolean()
   @IsOptional()
   @Field(() => Boolean, { nullable: false, defaultValue: true })
   isPublic!: boolean;

   @IsUrl()
   @IsOptional()
   @Field(() => String, { nullable: true })
   cvUrl!: string | null;

   @ValidateNested()
   @Type(() => UserObject)
   @Field(() => UserObject, { nullable: false })
   User?: UserObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   userId!: string;
}
