import { ChanceImageO } from '@niama/core';

declare namespace Chance {
  interface Chance {
    image(options?: ChanceImageO): string;
  }
}
