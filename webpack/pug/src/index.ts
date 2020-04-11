import loaderUtils from 'loader-utils';
import { camelCase, kebabCase, upperFirst } from 'lodash';
import pug from 'pug';
import * as webpack from 'webpack';

import * as T from './types';

export default function (this: webpack.loader.LoaderContext, source: string) {
  const loaderO: T.LoaderO = loaderUtils.getOptions(this);

  const compilerO: T.CompilerO = {
    filename: this.resourcePath,
    doctype: 'html',
    plugins: [{ preLex: (content: string) => preLex(content, loaderO), postLex: (tokens: T.Token[]) => postLex(tokens, loaderO) }],
    compileDebug: this.debug || false,
  };

  const template: T.Template = pug.compile(source, compilerO) as T.Template;
  template.dependencies.forEach((file) => this.addDependency(file));
  return template(loaderO.data || {});
}

// CONSTANTS ===============================================================================================================================

export const B = 'B_';
export const BE = 'BE_';
export const E = 'E_';

// PRELEX PLUGIN ===========================================================================================================================

const preLex = (content: string, opts: T.LoaderO): string => {
  const { separatorM = '--' } = opts;

  const reg: Record<T.ClassType, RegExp> = {
    BEM: /\.@-(\w+)--(\w+)/g,
    BE: /\.@-(\w+)/g,
    BM: /\.@(\w+)--(\w+)/g,
    B: /\.@(\w+)/g,
    EM: /\.-(\w+)--(\w+)/g,
    E: /\.-(\w+)/g,
  };

  const repl: Record<T.ClassType, string> = {
    BEM: `.${BE}$1.${B}$1${separatorM}$2`,
    BE: `.${BE}$1`,
    BM: `.${B}$1.${B}$1${separatorM}$2`,
    B: `.${B}$1`,
    EM: `.${E}$1.${E}$1${separatorM}$2`,
    E: `.${E}$1`,
  };

  return Object.keys(reg).reduce((r, k) => r.replace(reg[k], repl[k]), content);
};

// POSTLEX PLUGIN ==========================================================================================================================

const postLex = (tokens: T.Token[], loaderO: T.LoaderO): T.Token[] => {
  const defaultO: Required<T.LoaderO> = { casingB: 'raw', casingE: 'camel', casingM: 'camel', data: {}, separatorE: '_', separatorM: '--' };
  const opts: T.PostLexO = { ...defaultO, ...loaderO, blocks: [], depths: { extras: [0], tab: 0 } };

  return tokens.map((token) => {
    opts.depths = updateDepths({ opts, token });
    if (['outdent', 'newline'].includes(token.type)) opts.blocks.fill(null, depth(opts));
    if (isBEM(token, B)) return tokenB({ opts, token });
    if (isBEM(token, BE)) return tokenBE({ opts, token });
    if (isBEM(token, E)) return tokenE({ opts, token });
    return token;
  });
};

// OPTS ====================================================================================================================================

const format = ({ casing, val }: T.FormatP): string => {
  if (casing === 'camel') return camelCase(val);
  if (casing === 'kebab') return kebabCase(val);
  if (casing === 'pascal') return upperFirst(camelCase(val));
  return val;
};

const modifier = ({ casing, opts: { casingM = 'camel', separatorM = '--' }, prefix = '', val }: T.ModifierP): T.ModifierR => {
  const vals = val.split(separatorM);
  const main = prefix + format({ casing, val: vals[0] });
  return { main, val: main + (vals.length > 1 ? `${separatorM}${format({ casing: casingM, val: vals[1] })}` : '') };
};

// DEPTHS ==================================================================================================================================

const depth = ({ depths }: T.PostLexO): number => depths.extras.reduce((r, e) => r + e, 0) + depths.tab;

const updateDepths = ({ opts: { depths }, token }: T.TokenO) => {
  if (token.type === 'indent') depths = { extras: [...depths.extras, 0], tab: depths.tab + 1 };
  if (token.type === ':') depths.extras[depths.tab]++;
  if (token.type === 'outdent') depths = { extras: [...depths.extras.slice(0, -2), 0], tab: depths.tab - 1 };
  if (token.type === 'newline') depths.extras[depths.tab] = 0;
  return depths;
};

// BLOCKS ==================================================================================================================================

const block = (opts: T.PostLexO): string =>
  opts.blocks
    .slice(0, depth(opts))
    .filter((v) => v !== null)
    .pop() || '';

const updateBlocks = ({ opts, val }: T.ValO) => (opts.blocks[depth(opts)] = val);

// TOKENS =================================================================================================================================

const isBEM = (token: T.Token, prefix: string): token is T.ClassToken => token.type === 'class' && token.val.startsWith(prefix);

const tokenB = ({ opts, token }: T.ClassTokenO) => {
  const { main, val } = modifier({ opts, casing: opts.casingB, val: token.val.replace(B, '') });
  updateBlocks({ opts, val: main });
  return { ...token, val };
};

const tokenBE = ({ opts, token }: T.ClassTokenO) => {
  const { main, val } = modifier({ opts, casing: opts.casingB, val: token.val.replace(BE, '') });
  updateBlocks({ opts, val: main });
  const valE = format({ casing: opts.casingE, val: main });
  return { ...token, val: `${block(opts)}${opts.separatorE}${valE} ${val}` };
};

const tokenE = ({ opts, token }: T.ClassTokenO) => {
  const { val } = modifier({ opts, casing: opts.casingE, prefix: block(opts) + opts.separatorE, val: token.val.replace(E, '') });
  return { ...token, val };
};
