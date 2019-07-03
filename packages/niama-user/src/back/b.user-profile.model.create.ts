import { omit } from '@niama/core';

export class UserProfileBC implements NPri.UserProfileCreateInput {
  city: N.Maybe<string> = null;
  country: N.Maybe<string> = null;
  department: N.Maybe<string> = null;
  email: N.Maybe<string> = null;
  firstNames: { set: string[] } = { set: [] };
  lastName!: string;
  phone: N.Maybe<string> = null;
  phoneAlt: N.Maybe<string> = null;
  street: N.Maybe<string> = null;
  streetExtra: N.Maybe<string> = null;
  zipcode: N.Maybe<string> = null;

  constructor(dto) {
    Object.assign(this, omit(dto, ['firstNames']));
    this.firstNames = { set: dto.firstNames };
  }
}
