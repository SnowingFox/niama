import * as T from './types';

function processWhere<Dto>(where: T.Dict<any>, item: Dto): boolean {
  return Object.keys(where).every((condition) => {
    const [prop, keyword] = condition.split('_');
    if (!keyword) return item[prop] === where[condition];
    if (keyword === 'in') return where[condition].includes(item[prop]);
    return true;
  });
}

export function getRS<C extends T.Config>({ rp }: { rp: T.RP<C> }) {
  return {
    Mutation: {
      [rp.labels.UPDATE]: (_, { data, where: { id } }, { cache }: { cache: T.Api.InMemoryCache }) =>
        cache.writeData({ data, id: `${rp.labels.TYPE}:${id}` }),
    },
    Query: {
      [rp.labels.READ_ONE]: async (_: any, { where: { id } }: any, { cache }: { cache: T.Api.InMemoryCache }) => {
        const data: T.Api.QData<C['Dto'][]> = cache.readQuery({ query: rp.ops.readAll() });
        await new Promise((r) => setTimeout(r, 3000));
        return data ? data[rp.labels.READ_MANY].find((resource) => resource.id === id) || null : null;
      },
      [rp.labels.READ_MANY]: async (_: any, { first, orderBy, skip, where }: any, { cache }: { cache: T.Api.InMemoryCache }) => {
        const data: T.Api.QData<C['Dto'][]> = cache.readQuery({ query: rp.ops.readAll() });
        if (!data || !data[rp.labels.READ_MANY]) return [];
        let result = data[rp.labels.READ_MANY];
        if (where) result = result.filter((item) => processWhere(where, item));
        if (first || skip) result = result.slice(skip, skip + first);
        await new Promise((r) => setTimeout(r, 2000));
        return result;
      },
      [rp.labels.COUNT]: (_: any, { where }: any, { cache }: { cache: T.Api.InMemoryCache }): number => {
        const data: T.Api.QData<C['Dto'][]> = cache.readQuery({ query: rp.ops.readAll() });
        if (!data || !data[rp.labels.READ_MANY]) return 0;
        let result = data[rp.labels.READ_MANY];
        if (where) result = result.filter((item) => processWhere(where, item));
        return result.length;
      },
    },
  };
}
