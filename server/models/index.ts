import { Sequelize } from 'sequelize-typescript';

import { dbConfig } from '../config';
import { Comment } from './comment';
import { Topic } from './topic';
import { User } from './user';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  models: [Comment, Topic, User],
});

export { sequelize };
