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
  const { separatorE = '-', separatorM = '--' } = opts;

  const reg: Record<T.ClassType, RegExp> = {
    BEM: /\.@-(\w+)--(\w+)/g,
    BE: /\.@-(\w+)/g,
    BM: /\.@(\w+)--(\w+)/g,
    B: /\.@(\w+)/g,
    EM: /\.-(\w+)--(\w+)/g,
    E: /\.-(\w+)/g,
  };

  const repl: Record<T.ClassType, string> = {
    BEM: `.BE${separatorE}$1.BE${separatorE}$1${separatorM}$2`,
    BE: `.BE${separatorE}$1`,
    BM: `.B${separatorE}$1.B${separatorE}$1${separatorM}$2`,
    B: `.B${separatorE}$1`,
    EM: `.E${separatorE}$1.E${separatorE}$1${separatorM}$2`,
    E: `.E${separatorE}$1`,
  };

  return Object.keys(reg).reduce((r, k) => r.replace(reg[k], repl[k]), content);
};

// POSTLEX PLUGIN ==========================================================================================================================

const postLex = (tokens: T.Token[], opts: T.LoaderO): T.Token[] => {
  // OPTS ==================================================================================================================================

  const { casingB = 'pascal', casingE = 'camel', casingM = 'camel', separatorE = '-', separatorM = '--' } = opts;

  const format = ({ casing, val }: T.FormatP): string =>
    casing === 'camel' ? camelCase(val) : casing === 'kebab' ? kebabCase(val) : upperFirst(camelCase(val));

  const modifier = ({ casing, vals }): { main: string; val: string } => {
    const main = format({ casing, val: vals[0] });
    return { main, val: main + (vals.length > 1 ? ` ${main}${separatorM}${format({ casing: casingM, val: vals[1] })}` : '') };
  };

  // DEPTHS ================================================================================================================================

  let depths: T.Depths = { component: 0, line: 0 };
  const depth = (): number => depths.line + depths.component;

  const updateDepths = (token: T.Token) => {
    if (token.type === 'indent') depths = { line: depths.line + 1, component: 0 };
    if (token.type === ':') depths.component++;
    if (token.type === 'outdent') depths = { line: depths.line - 1, component: 0 };
    if (token.type === 'newline') depths.component = 0;
  };

  // BLOCKS ================================================================================================================================

  const blocks: string[] = [];

  const block = (): string =>
    blocks
      .slice(0, depth())
      .filter((v) => v !== null)
      .pop() || '';

  const updateBlocks = (value: string) => (blocks[depth()] = value);

  // BLOCK TOKENS ==========================================================================================================================

  const isTokenB = (token: T.Token): token is T.ClassToken => token.type === 'class' && token.val.startsWith('B_');
  const tokenB = (token: T.ClassToken) => {
    const { main, val } = modifier({ casing: casingB, vals: token.val.replace('B_', '').split(separatorM) });
    updateBlocks(main);
    return { ...token, val };
  };

  // BLOCK ELEMENT TOKENS ==================================================================================================================

  const isTokenBE = (token: T.Token): token is T.ClassToken => token.type === 'class' && token.val.startsWith('BE_');
  const tokenBE = (token: T.ClassToken) => {
    const { main, val } = modifier({ casing: casingB, vals: token.val.replace('BE_', '').split(separatorM) });
    updateBlocks(main);
    const valE = format({ casing: casingE, val: main });
    return { ...token, val: `${block()}${separatorE}${valE} ${val}` };
  };

  // ELEMENT TOKENS ========================================================================================================================

  const isTokenE = (token: T.Token): token is T.ClassToken => token.type === 'class' && token.val.startsWith('E_');
  const tokenE = (token: T.ClassToken) => {
    const { val } = modifier({ casing: casingE, vals: (block() + separatorE + token.val.replace('E_', '')).split(separatorM) });
    return { ...token, val };
  };

  return tokens.map((token) => {
    updateDepths(token);
    return isTokenB(token) ? tokenB(token) : isTokenBE(token) ? tokenBE(token) : isTokenE(token) ? tokenE(token) : token;
  });
};
