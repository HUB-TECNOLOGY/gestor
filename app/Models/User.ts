import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column()
  public birthdate: DateTime

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public address: string

  @column()
  public zipCode: string

  @column()
  public city: string

  @column()
  public province: string

  @column()
  public country: string

  @column()
  public myCode: string

  @column()
  public sponsorCode: string

  @column()
  public status: string

  @column()
  public points: number

  @column()
  public investiment: number

  @column()
  public role:
    | 'CLIENT'
    | 'SUPERVISOR_ASSISTANT'
    | 'SUPERVISOR'
    | 'MANAGER_ASSISTANT'
    | 'MANAGER'
    | 'ADMIN'

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async generateCode(user: User) {
    if (user) {
      user.myCode = `F${
        DateTime.local().second +
        user.cpf.substring(0, 3).toUpperCase() +
        DateTime.local().month +
        DateTime.local().day
      }`
    }
  }
}
