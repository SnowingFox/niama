import { struct } from 'superstruct';

import * as T from '../types';

export function maybe<V>(value: V): T.Struct {
  return struct.union([value, 'null']);
}
