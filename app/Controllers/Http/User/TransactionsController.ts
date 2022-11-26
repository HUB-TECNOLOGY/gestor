import Withdrawals from 'App/Models/Withdraw'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import Bonus from 'App/Models/Bonus'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TransactionsController {
  public async index({ auth }: HttpContextContract) {
    // const invest = Database.rawQuery(`SELECT SUM(amount) FROM transactions WHERE remark = 'invest' and user_id = ${auth?.user?.id}`)

    //Capital Investido
    const invest = await Transaction.query()
      .sum('amount')
      .where('user_id', auth?.user?.id)
      .where('remark', 'invest')
      .first()

    //Total Bonus Capital Investido
    const withdrawalBonus = await await Bonus.query()
      .sum('amount')
      .where('user_id', auth?.user?.id)
      .where('paid_out', true)
      .first()

    //Total Bonus Indicados
    const referralBonus = await Transaction.query()
      .sum('amount')
      .where('user_id', auth?.user?.id)
      .where('remark', 'referral_bonus')
      .first()

    const refferrals = await Transaction.query()
      .select('*')
      .where('user_id', auth?.user?.id)
      .where('remark', 'referral_bonus')

    //Total Sacado
    const withdrawals = await Withdrawals.query()
      .sum('amount')
      .where('status', 'APROVADO')
      .where('user_id', auth?.user?.id)
      .first()

    const investPerMonth = await Database.rawQuery(`
      select to_char(created_at,'Mon') as mon,
        extract(year from created_at) as yyyy,
        sum("invest") as "total"
      from investments
      group by 1,2
    `)

    return {
      perMonth: investPerMonth.rows,
      invest: invest.sum,
      withdrawalBonus: withdrawalBonus?.sum,
      withdrawals: withdrawals.sum,
      referralBonus: referralBonus.sum,
      refferrals: refferrals,
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
