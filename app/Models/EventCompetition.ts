import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Event)
  public eventId: HasOne<typeof Event>

  @column()
  public categorie: string

  @column()
  public genre: string

  @column.dateTime()
  public heurePesee: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
