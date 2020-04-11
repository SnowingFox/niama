import * as T from './types';

const processWhere = <Dto>(where: T.Dict, item: Dto): boolean =>
  Object.keys(where).every((condition) => {
    const [prop, keyword] = condition.split('_');
    if (!keyword) return item[prop] === where[condition];
    if (keyword === 'in') return where[condition].includes(item[prop]);
    return true;
  });

type Ctx = { cache: T.Api.InMemoryCache };

const readOne = <C extends T.Cfg>({ L, O }: T.Rp<C>) => async (_: any, { where: { id } }: any, { cache }: Ctx) => {
  const data: T.Api.QData<C['ObC']['Po'][]> = cache.readQuery({ query: O.readAll() });
  await new Promise((r) => setTimeout(r, 3000));
  return data ? data[L.readMany].find((resource) => resource.id === id) || null : null;
};

const readMany = <C extends T.Cfg>({ L, O }: T.Rp<C>) => async (_: any, { first, orderBy, skip, where }: any, { cache }: Ctx) => {
  const data: T.Api.QData<C['ObC']['Po'][]> = cache.readQuery({ query: O.readAll() });
  if (!data || !data[L.readMany]) return [];
  let result = data[L.readMany];
  if (where) result = result.filter((item) => processWhere(where, item));
  if (first || skip) result = result.slice(skip, skip + first);
  await new Promise((r) => setTimeout(r, 2000));
  return result;
};

const count = <C extends T.Cfg>({ L, O }: T.Rp<C>) => (_: any, { where }: any, { cache }: Ctx): number => {
  const data: T.Api.QData<C['ObC']['Po'][]> = cache.readQuery({ query: O.readAll() });
  if (!data || !data[L.readMany]) return 0;
  let result = data[L.readMany];
  if (where) result = result.filter((item) => processWhere(where, item));
  return result.length;
};

const update = <C extends T.Cfg>({ L }: T.Rp<C>) => (_, { data, where: { id } }, { cache }: Ctx) =>
  cache.writeData({ data, id: `${L.type}:${id}` });

export const getRS = <C extends T.Cfg>({ rp }: { rp: T.Rp<C> }) => ({
  Mutation: { [rp.L.update]: update(rp) },
  Query: { [rp.L.readOne]: readOne(rp), [rp.L.readMany]: readMany(rp), [rp.L.count]: count(rp) },
});
