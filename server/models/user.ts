import { AllowNull, Column, DataType, Index, Model, Table } from 'sequelize-typescript';

export type TUser = {
  login: string;
};

// eslint-disable-next-line prettier/prettier
@Table({
  tableName: 'user',
})
export class User extends Model<TUser> {
  @Index
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  login!: string;
}
