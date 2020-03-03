import { Provider } from './main';

declare module '@niama/core/types' {
  interface Niama {
    api: Provider;
  }
}
