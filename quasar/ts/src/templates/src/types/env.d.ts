declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT?: string;
    DB_HOST?: string;
    DB_NAME?: string;
    DB_PORT?: string;
    DB_PWD?: string;
    DB_USER?: string;
    DEV?: string;
    MODE?: string;
    NIAMA_API_ADMIN?: string;
    NIAMA_API_HOST?: string;
    NIAMA_API_JWT?: string;
    NIAMA_API_PATH?: string;
    NIAMA_API_PORT?: string;
    NIAMA_API_PROTOCOL?: string;
    NIAMA_API_PUBLIC_ROLE?: string;
    NIAMA_AUTH_HOST?: string;
    NIAMA_AUTH_PATH?: string;
    NIAMA_AUTH_PORT?: string;
    NIAMA_AUTH_PROTOCOL?: string;
    NODE_ENV: 'development' | 'production';
    PROD?: string;
    QUASAR_HOST?: string;
    QUASAR_PORT?: string;
    SERVER?: string;
    SESSION_SECRET?: string;
    VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract';
    VUE_ROUTER_BASE?: string;
  }
}
