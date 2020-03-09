import { struct } from 'superstruct';

import * as T from '../types';

export const maybe = <V>(value: V): T.Struct => struct.union([value, 'null']);
