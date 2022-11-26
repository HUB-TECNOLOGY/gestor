import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Deposit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public amount: number

  @column()
  public status: 'APROVADO' | 'PENDENTE' | 'NEGADO'

  @column()
  public transactionCode: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateTRXCode(deposit: Deposit) {
    if (deposit) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var charactersLength = characters.length
      for (var i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      deposit.transactionCode = result
    }
  }
}
