declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_AUDIENCE?: string;
    AUTH_COOKIE_ACCESS?: string;
    AUTH_COOKIE_ID?: string;
    AUTH_ISSUER?: string;
    AUTH_SECRET?: string;
    MYSQL_PASSWORD?: string;
    MYSQL_PORT?: string;
    NIAMA_API_HOST?: string;
    NIAMA_API_PATH?: string;
    NIAMA_API_PORT?: string;
    NODE_ENV?: 'development' | 'production';
    PRISMA_HOST?: string;
    PRISMA_MANAGEMENT_API_SECRET?: string;
    PRISMA_PORT?: string;
    PRISMA_SECRET?: string;
    QUASAR_HOST?: string;
    QUASAR_PORT?: string;
    VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract';
    VUE_ROUTER_BASE?: string;
  }
}
