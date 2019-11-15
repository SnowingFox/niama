import Chance from 'chance';

import * as T from '../types';

const chance = new Chance();

chance.mixin({
  image: (opts: T.ChanceImageO = {}) => {
    const defaultO = { height: 400, id: chance.natural({ min: 0, max: 1084 }), width: 600 };
    const { blur, grayscale, height, id, width, withExtension }: T.ChanceImageO = { ...defaultO, ...opts };
    const params: string[] = [];
    if (blur) params.push(`blur=${Math.max(Math.min(blur, 10), 1)}`);
    if (grayscale) params.push('grayscale');
    return `https://picsum.photos/id/${id}/${width}/${height}${params.length > 0 ? '?' + params.join('&') : ''}${
      withExtension ? '.jpg' : ''
    }`;
  },
});

export { chance };
