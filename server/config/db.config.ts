export const dbConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'newPassword',
  DB: 'monopoly-forum',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
} as const;
