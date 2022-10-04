import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Investment from 'App/Models/Investment'
import StoreInvestmentValidator from 'App/Validators/StoreInvestmentValidator'
import Transaction from 'App/Models/Transaction'
import { DateTime } from 'luxon'
import Bonus from 'App/Models/Bonus'
import Account from 'App/Models/Account'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class InvestmentController {
  public async index({ auth }: HttpContextContract) {
    // @ts-ignore
    return Investment.query().where('user_id', auth.user?.id).preload('bonuses')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const account = await Account.findBy('user_id', auth.user?.id)
    const balance = account?.balance
    console.log(balance)
    // @ts-ignore
    if (account.balance > 0) {
      const data = await request.validate(StoreInvestmentValidator)
      data.userId = auth.user?.id
      const invest = await Investment.create(data)
      await Transaction.create({
        userId: auth.user?.id,
        amount: data.invest,
        transactionType: '+',
        details: `Investimento de ${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(data.invest)}`,
        remark: 'invest',
        postBalance: 0,
        charge: 0,
      })
      const prevAmount = Number(account?.balance) - Number(invest?.invest)
      console.log(prevAmount)
      account?.merge({
        balance: prevAmount,
        postBalance: account?.balance,
      })
      await account?.save()
      for (let i = 0; i < 3; i++) {
        await Bonus.create({
          investmentId: invest.id,
          userId: auth.user?.id,
          amount: data.invest * 0.33,
          paymentDate: DateTime.local().plus({ month: i }).toString(),
          type: 'bonus_invest',
        })
      }
      return response.created(invest)
    } else {
      throw new BadRequestException('Você não tem saldo suficiente para investir!', 409)
    }
    // const investm = await Investment.findBy('user_id', auth.user?.id)
    // @ts-ignore
    // console.log(investm?.dueDate < DateTime.local().toString())
    // if (investm?.dueDate < DateTime.local().toString())
    //   throw new BadRequestException('Você não pode aplicar com um investimento ativo!', 409)
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
