import { Configuration as WebpackConfig } from 'webpack';
import ChainConfig from 'webpack-chain';

export class ExtensionJson {
  constructor();
  get(extId: string): { __internal: Dict };
  getInternal(extId: string): Dict;
  getList(): Record<string, Dict>;
  getPrompts(extId: string): Dict<string>;
  has(extId: string): boolean;
  list(): void;
  set(extId: string, opts: Dict): void;
  setInternal(extId: string, opts: Dict): void;
  remove(extId: string): void;
}

export class BasisApi {
  appDir: string;
  extId: string;
  prompts: Dict<string>;
  resolve: Resolve;
  getPersistentConf(): Dict;
  hasExtension(extId: string): boolean;
}

export class ConstructApi extends BasisApi {
  compatibleWith(packageName: string, semverCondition: string): void;
  getPackageVersion(packageName: string): string | undefined;
  hasPackage(packageName: string, semverCondition?: string): boolean;
  mergePersistentConf(cfg?: Dict): void;
  setPersistentConf(cfg: Dict): void;
}

export class IndexAPI extends ConstructApi {
  ctx: Ctx;
  constructor({ extId, prompts, ctx }: { ctx: Ctx; extId: string; prompts: Dict<string> });
  afterBuild(fn: CommandHandler): void;
  afterDev(fn: CommandHandler): void;
  beforeBuild(fn: CommandHandler): void;
  beforeDev(fn: CommandHandler): void;
  chainWebpack(fn: Extender<ChainConfig>): void;
  chainWebpackMainElectronProcess(fn: Extender<ChainConfig>): void;
  chainWebpackWebserver(fn: Extender<ChainConfig>): void;
  extendQuasarConf(fn: (cfg: QuasarConfig, api?: IndexAPI) => void): void;
  extendWebpack(fn: Extender<WebpackConfig>): void;
  extendWebpackMainElectronProcess(fn: Extender<WebpackConfig>): void;
  extendWebpackWebserver(fn: Extender<WebpackConfig>): void;
  onPublish(fn: (api: IndexAPI, opts: Dict) => void | Promise<void>): void;
  registerCommand(commandName: string, fn: ({ args, params }) => void | Promise<void>): void;
  registerDescribeApi(name: string, relativePath: string): void;
}

export class InstallAPI extends ConstructApi {
  constructor({ extId, prompts }: { extId: string; prompts: Dict<string> });
  extendJsonFile(file: string, newData: Dict): void;
  extendPackageJson(extPkg: Dict | string): void;
  onExitLog(msg: string): void;
  render(templatePath: string, scope?: Dict): void;
}

export class UninstallAPI extends BasisApi {
  constructor({ extId, prompts }: { extId: string; prompts: Dict<string> });
  onExitLog(msg: string): void;
  removePath(path: string): void;
}

export type CommandHandler = (api: IndexAPI, { quasarConf }) => void | Promise<void>;
export type Extender<Cfg> = (cfg: Cfg, opts?: { isClient: boolean; isServer: boolean }, api?: IndexAPI) => undefined;
export type QuasarConfig = Dict;
export type Ctx = Dict;
export type Dict<T = any> = Record<string, T>;
export type DirResolver = (dir: string) => string;
export type DirResolveK = 'app' | 'capacitor' | 'cordova' | 'cli' | 'electron' | 'pwa' | 'src' | 'ssr';
export type Resolve = Record<DirResolveK, DirResolver>;
