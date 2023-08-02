import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Rocket from './Rocket'

export default class Launch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public flight_number: number

  @column()
  public name: string

  @column.dateTime()
  public date_utc: DateTime

  @column()
  public success: boolean

  @column()
  public reused: boolean

  @column()
  public youtube_link: string

  @column()
  public rocket_id: string

  @column()
  public links_patch_small: string | null

  @column()
  public links_patch_large: string | null

  @column()
  public presskit: string | null

  @column()
  public wikipedia: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Rocket, {
    foreignKey: 'rocket_id',
  })
  public rocket: BelongsTo<typeof Rocket>;
}
