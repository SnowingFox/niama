import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import stylus from 'stylus';
import zlib from 'zlib';

const quasar = path.dirname(require.resolve('quasar/package.json'));
const src = path.resolve('./src/index.styl');
const paths = [path.join(quasar, 'src', 'css')];

const buildCSS = async () => {
  const deps: string[] = (stylus(fs.readFileSync(src, 'utf-8')).set('paths', paths) as any).deps();
  console.log(deps);

  let code = [src, ...deps]
    .reduce((rs, s) => `${rs}${fs.readFileSync(s, 'utf-8')}\n`, '')
    .replace(/@import\s+'[^']+'[\s\r\n]+/g, '')
    .replace(/(\/\*[\w'-.,`\s\r\n*@]*\*\/)|(\/\/[^\r\n]*)/g, '')
    .replace(/[\r\n]+/g, '\r\n');

  code = processAutoprefixer(await processStylus(code));
  await writeFile(path.join(quasar, 'dist', 'quasar.css'), code);
  await writeFile(path.join(quasar, 'dist', 'quasar.min.css'), processNano(code));
};

const processAutoprefixer = (code: string): string => postcss([autoprefixer]).process(code, { from: void 0 }).css;

const processNano = (code: string): string =>
  postcss([
    cssnano({ preset: ['default', { cssDeclarationSorter: false, convertValues: false, mergeLonghand: false, reduceTransforms: false }] }),
  ]).process(code, { from: void 0 }).css;

const processStylus = (code: string): Promise<string> =>
  new Promise((res, rej) =>
    stylus(code)
      .set('paths', paths)
      .render((err, code) => (err ? rej(err) : res(code)))
  );

const writeFile = async (dest: string, code: string) => new Promise((_res, rej) => fs.writeFile(dest, code, handleWrite(code, rej)));
const handleWrite = (code: string, rej: (reason?: any) => void) => (err: Error | null) => (err ? rej(err) : gzipFile(code, rej));
const gzipFile = (code: string, rej: (reason?: any) => void) => zlib.gzip(code, (err) => (err ? rej(err) : undefined));

buildCSS();
