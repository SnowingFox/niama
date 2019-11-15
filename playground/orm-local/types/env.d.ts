declare namespace NodeJS {
  interface ProcessEnv {
    NIAMA_API_PORT?: string;
    NODE_ENV?: 'development' | 'production';
    QUASAR_HOST?: string;
    QUASAR_PORT?: string;
    VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract';
    VUE_ROUTER_BASE?: string;
  }
}
