import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Bonus from 'App/Models/Bonus'
import { CherryPick } from '@ioc:Adonis/Lucid/Model'

export default class Investment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public invest: number

  @column()
  public percentage: number

  @column({ serializeAs: null })
  public userId?: number | undefined

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Bonus)
  public bonuses: HasMany<typeof Bonus>

  @column()
  public dueDate: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  public serialize(cherryPick?: CherryPick) {
    return {
      ...this.serializeAttributes(cherryPick?.fields, false),
      ...this.serializeComputed(cherryPick?.fields),
      ...this.serializeRelations(
        {
          bonuses: {
            fields: ['id', 'amount', 'payment_date', 'type'],
          },
        },
        false
      ),
    }
  }
}
