import { Provider } from './src/types/boot';

export * from './src/types';

declare module '@niama/core/types' {
  interface Niama {
    address: Provider;
  }
}

declare module '@niama/address/types' {
  export interface BootO {}
  export interface Raw {}
}
