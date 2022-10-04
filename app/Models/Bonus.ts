import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Investment from 'App/Models/Investment'

export default class Bonus extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @column({ serializeAs: null })
  public investmentId: number

  @column()
  public amount: number

  @column()
  public paymentDate: string

  @column()
  public type: string

  @belongsTo(() => Investment)
  public invest: BelongsTo<typeof Investment>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
