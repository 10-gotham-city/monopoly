import { AllowNull, BelongsTo, Column, DataType, Index, Model, Table } from 'sequelize-typescript';
import { Topic } from './topic';
import { User } from './user';

export type TComment = {
  id: string;
  topicId: string;
  parentId: string | null;
  user: string;
  timestampISO: string;
};

// eslint-disable-next-line prettier/prettier
@Table({
  tableName: 'comment',
})
export class Comment extends Model<TComment> {
  @Index
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  timestampISO!: string;

  @Column(DataType.STRING)
  parentId!: string | null;

  @BelongsTo(() => Topic, {
    foreignKey: 'id',
  })
  topicId!: string;

  @BelongsTo(() => User, {
    foreignKey: 'login',
  })
  user!: string;
}
