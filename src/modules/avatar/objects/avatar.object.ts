import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
   IsDate,
   IsMimeType,
   IsString,
   IsUUID,
   ValidateNested,
} from 'class-validator';
import { UserObject } from '../../user/objects/user.object';

@ObjectType()
export class AvatarObject {
   @IsUUID()
   @Field(() => ID, { nullable: false })
   id!: string;

   @IsDate()
   @Field(() => Date, { nullable: false })
   createdAt!: Date;

   @IsDate()
   @Field(() => Date, { nullable: false })
   updatedAt!: Date;

   @IsMimeType()
   @Field(() => String, { nullable: false })
   mimetype!: string;

   @IsString()
   @Field(() => String, { nullable: false })
   path!: string;

   @ValidateNested()
   @Type(() => UserObject)
   @Field(() => UserObject, { nullable: false })
   User?: UserObject;
   @IsUUID()
   @Field(() => String, { nullable: false })
   userId!: string;
}
