import { Config } from 'bili';

const config: Config = {
  externals: [/niama\/packages\/\w+\/dist/],
  input: 'src/index.ts',
  output: { format: ['cjs', 'esm'] },
  plugins: { typescript2: { tsconfig: 'tsconfig.build.json' } },
};

export default config;
