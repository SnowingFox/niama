import { useMutation } from '@niama/api';
import { useLoadable, useSourcable } from '@niama/core';

import * as T from './typings';

export const useDeleteOne = <C extends T.Cfg, D = string, F = null>(p: T.DeleteOneC<C, D, F>['UseP']): T.DeleteOneC<C, D, F>['R'] => {
  const { rp, ...rest } = p;
  return useMutation({ mutation: rp.O.deleteOne, notifyId: `${rp.L.singular}.op.deleteOne.Done`, ...rest });
};

export const useDeleteOneL$ = <C extends T.Cfg, D = string, F = null>(p: T.DeleteOneC<C, D, F>['L$P']): T.DeleteOneC<C, D, F>['L$R'] => {
  const { src$, ...rest } = p;
  return useLoadable({ src$, switcher: useDeleteOne<C, D, F>(rest) });
};

export const useDeleteOneS$ = <C extends T.Cfg, D = string, F = null>(p: T.DeleteOneC<C, D, F>['UseP']): T.DeleteOneC<C, D, F>['S$R'] =>
  useSourcable({ switcher: useDeleteOne<C, D, F>(p) });
