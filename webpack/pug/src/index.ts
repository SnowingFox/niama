import loaderUtils from 'loader-utils';
import { camelCase, kebabCase, upperFirst } from 'lodash';
import pug from 'pug';
import * as webpack from 'webpack';

import * as T from './types';

export default function(this: webpack.loader.LoaderContext, source: string) {
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
    BEM: `.BE_$1.B_$1${separatorM}$2`,
    BE: `.BE_$1`,
    BM: `.B_$1.B_$1${separatorM}$2`,
    B: `.B_$1`,
    EM: `.E_$1.E_$1${separatorM}$2`,
    E: `.E_$1`,
  };

  return Object.keys(reg).reduce((r, k) => r.replace(reg[k], repl[k]), content);
};

// POSTLEX PLUGIN ==========================================================================================================================

const postLex = (tokens: T.Token[], opts: T.LoaderO): T.Token[] => {
  // OPTS ==================================================================================================================================

  const { casingB = 'raw', casingE = 'camel', casingM = 'camel', separatorE = '-', separatorM = '--' } = opts;

  const format = ({ casing, val }: T.FormatP): string =>
    casing === 'camel' ? camelCase(val) : casing === 'kebab' ? kebabCase(val) : casing === 'pascal' ? upperFirst(camelCase(val)) : val;

  const modifier = ({ casing, prefix = '', val }: T.ModifierP): T.ModifierR => {
    const vals = val.split(separatorM);
    const main = prefix + format({ casing, val: vals[0] });
    return { main, val: main + (vals.length > 1 ? `${separatorM}${format({ casing: casingM, val: vals[1] })}` : '') };
  };

  // DEPTHS ================================================================================================================================

  let depths: T.Depths = { extras: [0], tab: 0 };
  const depth = (): number => depths.extras.reduce((r, e) => r + e, 0) + depths.tab;

  const updateDepths = (token: T.Token) => {
    if (token.type === 'indent') depths = { extras: [...depths.extras, 0], tab: depths.tab + 1 };
    if (token.type === ':') depths.extras[depths.tab]++;
    if (token.type === 'outdent') depths = { extras: [...depths.extras.slice(0, -2), 0], tab: depths.tab - 1 };
    if (token.type === 'newline') depths.extras[depths.tab] = 0;
  };

  // BLOCKS ================================================================================================================================

  const blocks: (string | null)[] = [];

  const block = (): string =>
    blocks
      .slice(0, depth())
      .filter((v) => v !== null)
      .pop() || '';

  const updateBlocks = (value: string) => (blocks[depth()] = value);

  // BLOCK TOKENS ==========================================================================================================================

  const isTokenB = (token: T.Token): token is T.ClassToken => token.type === 'class' && token.val.startsWith('B_');
  const tokenB = (token: T.ClassToken) => {
    const { main, val } = modifier({ casing: casingB, val: token.val.replace('B_', '') });
    updateBlocks(main);
    return { ...token, val };
  };

  // BLOCK ELEMENT TOKENS ==================================================================================================================

  const isTokenBE = (token: T.Token): token is T.ClassToken => token.type === 'class' && token.val.startsWith('BE_');
  const tokenBE = (token: T.ClassToken) => {
    const { main, val } = modifier({ casing: casingB, val: token.val.replace('BE_', '') });
    updateBlocks(main);
    const valE = format({ casing: casingE, val: main });
    return { ...token, val: `${block()}${separatorE}${valE} ${val}` };
  };

  // ELEMENT TOKENS ========================================================================================================================

  const isTokenE = (token: T.Token): token is T.ClassToken => token.type === 'class' && token.val.startsWith('E_');
  const tokenE = (token: T.ClassToken) => {
    const { val } = modifier({ casing: casingE, prefix: block() + separatorE, val: token.val.replace('E_', '') });
    return { ...token, val };
  };

  return tokens.map((token) => {
    updateDepths(token);
    if (['outdent', 'newline'].includes(token.type)) blocks.fill(null, depth());
    return isTokenB(token) ? tokenB(token) : isTokenBE(token) ? tokenBE(token) : isTokenE(token) ? tokenE(token) : token;
  });
};
