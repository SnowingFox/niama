import * as T from './typings';
import { fragments } from './utils';

export const fragmentsFromString = (str: string): T.Fragments => {
  const strFragments = str.split('|').reduce((r, v) => {
    const [fragment, short, long] = v.split(':');
    return { ...r, [fragment]: long, [`${fragment}SV`]: short };
  }, {});
  return fragments.reduce((r, f) => ({ ...r, [f]: strFragments[f] || null }), {}) as T.Fragments;
};

export const stringifiedFragments = (po: T.Po, frags = fragments): string =>
  frags.reduce((r, f) => (po[f] ? `${r !== '' ? `${r}|` : ''}${f}:${po[`${f}SV`]}:${po[f]}` : r), '');
