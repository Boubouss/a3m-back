import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column.dateTime()
  public dateDebut: DateTime

  @column.dateTime()
  public dateFin: DateTime

  @column()
  public numeroRue: number

  @column()
  public rue: string

  @column()
  public ville: string

  @column()
  public codePostal: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get adresse() {
    return `${this.numeroRue} ${this.rue}, ${this.ville} (${this.codePostal})`
  }
}
