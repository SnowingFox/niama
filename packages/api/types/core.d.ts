import { Provider } from './boot';

declare module '@niama/core/types' {
  interface Niama {
    api: Provider;
  }
}
