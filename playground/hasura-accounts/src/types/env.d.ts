declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT?: string;
    DEV?: string;
    MODE?: string;
    NIAMA_API_HOST?: string;
    NIAMA_API_PATH?: string;
    NIAMA_API_PORT?: string;
    NODE_ENV: 'development' | 'production';
    PROD?: string;
    QUASAR_HOST?: string;
    QUASAR_PORT?: string;
    SERVER?: string;
    VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract';
    VUE_ROUTER_BASE?: string;
  }
}
