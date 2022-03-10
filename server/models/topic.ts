import { AllowNull, BelongsTo, Column, DataType, Index, Model, Table } from 'sequelize-typescript';
import { User } from './user';

export type TTopic = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
};

// eslint-disable-next-line prettier/prettier
@Table({
  tableName: 'topic',
})
export class Topic extends Model<TTopic> {
  @Index
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  description!: string | null;

  @BelongsTo(() => User, {
    foreignKey: 'login',
  })
  user!: string;
}
