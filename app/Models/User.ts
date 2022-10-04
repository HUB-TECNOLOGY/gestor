import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { afterSave, BaseModel, beforeSave, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import Account from 'App/Models/Account'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public birthdate: DateTime

  @column()
  public document: string

  @column()
  public documentType: string

  @column()
  public documentIssuer: string

  @column()
  public cpf: string

  @column()
  public motherName: string

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
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public username: string

  @column()
  public phone: string

  @column()
  public landline: string

  @column()
  public bank: string

  @column()
  public agency: string

  @column()
  public accountType: string

  @column()
  public pixKey: string

  @column()
  public pixKeyType: string

  @column()
  public profession: string

  @column()
  public maritalStatus: string

  @column()
  public profileId: number

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @column()
  public refId: number

  @column()
  public referral: string

  @hasOne(() => User)
  public referralName: HasOne<typeof User>

  @column()
  public account: string

  @column()
  public accountId: number

  @hasOne(() => Account)
  public accountInternal: HasOne<typeof Account>

  @column()
  public status: string

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

  @afterSave()
  public static async createAccount(user: User) {
    if (user) {
      await Account.create({
        userId: user.id,
      })
    }
  }
}
