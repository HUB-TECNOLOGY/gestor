import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import { CherryPick } from '@ioc:Adonis/Lucid/Model'

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

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @column()
  public refId: number

  @column()
  public parentId: number

  @hasOne(() => User, { foreignKey: 'id' })
  public referral: HasOne<typeof User>

  @column()
  public account: string

  @column()
  public status: string
  @column()
  public balance: number

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

  public serialize(cherryPick?: CherryPick) {
    return {
      ...this.serializeAttributes(cherryPick?.fields, false),
      ...this.serializeComputed(cherryPick?.fields),
      ...this.serializeRelations(
        {
          referral: {
            fields: ['id', 'name', 'username'],
          },

          profile: {
            fields: ['title'],
          },
        },
        false
      ),
    }
  }
}
