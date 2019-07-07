import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiS<Prisma> {
  // LIFECYCLE =============================================================================================================================

  constructor(public prisma: Prisma) {}
}
