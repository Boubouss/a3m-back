import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, hasOne, HasOne, computed, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column.dateTime()
  public birthdate: DateTime

  @column()
  public active: boolean

  @column()
  public role: string

  @column()
  public genre: string

  @column()
  public avatar: string

  @hasOne(() => User)
  public parrent_id: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get fullName() {
    return `${this.firstname} ${this.lastname}`
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
