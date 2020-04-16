import { Provider } from './src/types/boot';

export * from './src/types';

declare module '@niama/core/types' {
  interface Niama {
    api: Provider;
  }
}
