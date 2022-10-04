import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Transaction from 'App/Models/Transaction'
import Account from 'App/Models/Account'
import Withdrawals from 'App/Models/Withdraw'
import Bonus from 'App/Models/Bonus'
import { DateTime } from 'luxon'

export default class WIthDrawalsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({ params }: HttpContextContract) {
    const withdraw = await Withdrawals.find(params.id)

    // @ts-ignore
    const payBonus = await Bonus.query()
      .where('investment_id', withdraw?.investId)
      .where('payment_date', '>', DateTime.now().toString())
    console.log('pay', payBonus)
    if (payBonus) {
      if (withdraw?.status === 'APROVADO') {
        throw new BadRequestException('Saque já aprovado!', 409)
      }
      if (withdraw?.type === 'bonus_invest') {
        withdraw?.merge({
          status: 'APROVADO',
        })
        const updateBonus = await Bonus.query()
          .where('investment_id', withdraw.investId)
          .where('payment_date', '>=', DateTime.now().toString())
        console.log(updateBonus)
        await withdraw?.save()
        const account = await Account.find(withdraw?.userId)
        const prevAmount = Number(account?.balance) + Number(withdraw?.amount)
        account?.merge({
          balance: prevAmount,
          postBalance: account?.balance,
        })
        await account?.save()
        // @ts-ignore
        const amount: number | undefined = withdraw.amount
        await Transaction.create({
          userId: withdraw?.userId,
          amount: withdraw?.amount,
          transactionType: '-',
          details: `Saque de ${Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}`,
          remark: 'withdrawal_bonus_invest',
          postBalance: 0,
          charge: 0,
        })
        const nextAmount = Number(account?.balance) - Number(withdraw?.amount)
        account?.merge({
          balance: nextAmount,
          postBalance: account?.balance,
        })
        await account?.save()
      }
      throw new BadRequestException('Não pode sacar!', 409)
    }
  }

  public async destroy({}: HttpContextContract) {}
}
