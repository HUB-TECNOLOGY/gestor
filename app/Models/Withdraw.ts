import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Transaction from 'App/Models/Transaction'

export default class Withdrawals extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public investId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public amount: number

  @column()
  public detail: string

  @column()
  public status: 'APROVADO' | 'PENDENTE' | 'NEGADO'

  @column()
  public type: string

  @column()
  public transactionCode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(transaction: Transaction) {
    if (transaction) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var charactersLength = characters.length
      for (var i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      transaction.transactionCode = result
    }
  }
}
