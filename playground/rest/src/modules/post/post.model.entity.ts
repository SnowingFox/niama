import { OrmE } from '@niama/orm';

export class Post extends OrmE<any> {
  constructor(dto: any) {
    super(dto);
  }
}
