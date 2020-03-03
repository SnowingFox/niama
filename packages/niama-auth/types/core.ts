import { Provider } from './main';

declare module '@niama/core/types' {
  interface Niama {
    auth: Provider;
  }
}
