export const environment = {
  production: false,
  host: '127.0.0.1',
  port: 9000,
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/api?schema=public',
};
