import { registerEnumType } from '@nestjs/graphql';
import { CompanyExperienceTypeEnum, RoleEnum } from '@prisma/client';

export enum SortOrder {
   asc = 'asc',
   desc = 'desc',
}

export enum ActionGetServiceEnum {
   throw = 'throw',
   return = 'return',
   none = 'none',
}

registerEnumType(SortOrder, { name: 'SortOrder' });
registerEnumType(ActionGetServiceEnum, { name: 'ActionGetServiceEnum' });
registerEnumType(RoleEnum, { name: 'RoleEnum' });
registerEnumType(CompanyExperienceTypeEnum, {
   name: 'CompanyExperienceTypeEnum',
});
