import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Investment from 'App/Models/Investment'
import StoreInvestmentValidator from 'App/Validators/StoreInvestmentValidator'
import { DateTime } from 'luxon'
import Bonus from 'App/Models/Bonus'
import Database from '@ioc:Adonis/Lucid/Database'
import { createTransaction, formatCurrency, referralCommission } from 'App/Handlers'
import User from 'App/Models/User'

export default class InvestmentController {
  public async index({ auth }: HttpContextContract) {
    return Investment.query().where('user_id', auth.user?.id).preload('bonuses')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const trx = await Database.transaction()

    try {
      const investment = await Investment.query()
        .where('user_id', auth?.user?.id)
        .where('status', true)
        .first()
      if (investment) {
        return response.status(409).json({
          message: 'Você não pode aplicar com um investimento ativo!',
        })
      }

      const data = await request.validate(StoreInvestmentValidator)
      data.userId = auth.user?.id
      data.status = true
      const user = await User.find(auth?.user?.id)
      if (user?.balance <= 0) {
        return response.status(409).json({
          message: 'Você não saldo suficiente para investir!',
        })
      }
      //Cria Solicitaçào de investiment
      const invest = await Investment.create(data)
      await createTransaction(
        auth?.user?.id,
        data.invest,
        '+',
        `Investimento de ${formatCurrency(data.invest)}`,
        'invest'
      )

      user?.merge({
        balance: (user.balance -= Number(data.invest)),
      })
      await user?.save()
      for (let i = 0; i < 3; i++) {
        await Bonus.create({
          investmentId: invest.id,
          userId: auth.user?.id,
          amount: data.invest * 0.33,
          paymentDate: DateTime.local().plus({ month: i }).toString(),
          type: 'bonus_invest',
        })
      }
      await referralCommission(auth?.user?.id, data.invest)
      return response.created(invest)
    } catch (error) {
      console.log('[ERROR:]', error)
      await trx.rollback()
    }
  }

  public async show({ params }: HttpContextContract) {
    return await Bonus.query().where('investment_id', params.id).orderBy('payment_date', 'asc')
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
