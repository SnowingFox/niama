import * as T from './types';

const processWhere = <Dto>(where: T.Dict, item: Dto): boolean =>
  Object.keys(where).every((condition) => {
    const [prop, keyword] = condition.split('_');
    if (!keyword) return item[prop] === where[condition];
    if (keyword === 'in') return where[condition].includes(item[prop]);
    return true;
  });

export const getRS = <C extends T.Cfg>({ rp }: { rp: T.Rp<C> }) => {
  const { L, O } = rp;
  return {
    Mutation: {
      [L.update]: (_, { data, where: { id } }, { cache }: { cache: T.Api.InMemoryCache }) =>
        cache.writeData({ data, id: `${L.type}:${id}` }),
    },
    Query: {
      [L.readOne]: async (_: any, { where: { id } }: any, { cache }: { cache: T.Api.InMemoryCache }) => {
        const data: T.Api.QData<C['ObC']['Po'][]> = cache.readQuery({ query: O.readAll() });
        await new Promise((r) => setTimeout(r, 3000));
        return data ? data[L.readMany].find((resource) => resource.id === id) || null : null;
      },
      [L.readMany]: async (_: any, { first, orderBy, skip, where }: any, { cache }: { cache: T.Api.InMemoryCache }) => {
        const data: T.Api.QData<C['ObC']['Po'][]> = cache.readQuery({ query: O.readAll() });
        if (!data || !data[L.readMany]) return [];
        let result = data[L.readMany];
        if (where) result = result.filter((item) => processWhere(where, item));
        if (first || skip) result = result.slice(skip, skip + first);
        await new Promise((r) => setTimeout(r, 2000));
        return result;
      },
      [L.count]: (_: any, { where }: any, { cache }: { cache: T.Api.InMemoryCache }): number => {
        const data: T.Api.QData<C['ObC']['Po'][]> = cache.readQuery({ query: O.readAll() });
        if (!data || !data[L.readMany]) return 0;
        let result = data[L.readMany];
        if (where) result = result.filter((item) => processWhere(where, item));
        return result.length;
      },
    },
  };
};
