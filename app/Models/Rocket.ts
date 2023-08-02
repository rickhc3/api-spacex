import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Launch from './Launch';
import { DateTime } from 'luxon';

export default class Rocket extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public rocket_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Launch, { foreignKey: 'rocket_id' })
  public launches: HasMany<typeof Launch>;
}
