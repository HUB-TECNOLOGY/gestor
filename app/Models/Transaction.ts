import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public amount: number

  @column()
  public charge: number

  @column()
  public postBalance: number

  @column()
  public transactionType: string

  @column()
  public transactionCode: string

  @column()
  public details: string

  @column()
  public remark: string

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
