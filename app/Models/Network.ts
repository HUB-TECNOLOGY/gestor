import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Network extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sponsorCode: string

  @column()
  public status: boolean

  @column()
  public userId: number

  @hasMany(() => User)
  public affiliates: HasMany<typeof User>

  @belongsTo(() => User)
  public sponsor: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
