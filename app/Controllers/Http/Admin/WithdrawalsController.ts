import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Transaction from 'App/Models/Transaction'
import Account from 'App/Models/Account'
import Withdrawals from 'App/Models/Withdraw'
import Database from '@ioc:Adonis/Lucid/Database'
import Bonus from 'App/Models/Bonus'
import User from 'App/Models/User'
import { createTransaction, formatCurrency } from 'App/Handlers'

export default class WithdrawalsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({ params }: HttpContextContract) {
    const withdraw = await Withdrawals.findBy('id', params.id)
    if (!withdraw?.investId)
      throw new BadRequestException('Solicitação de saque não encontrada!', 409)

    const payBonus = await Database.rawQuery(
      `SELECT *
       FROM bonuses
       WHERE investment_id = ${withdraw?.investId}
         AND NOW() >= payment_date`
    )

    if (payBonus) {
      if (withdraw?.status === 'APROVADO') {
        throw new BadRequestException('Saque já aprovado!', 409)
      }

      if (withdraw?.type === 'bonus_invest') {
        // muda status na tabela de saque para aprovado
        withdraw?.merge({
          status: 'APROVADO',
        })
        await withdraw?.save()

        // busca conta para alterar o valor e criar a transacao
        const user = await User.find(withdraw?.userId)
        user?.merge({
          balance: (user.balance -= Number(withdraw.amount)),
        })
        await user?.save()
        await createTransaction(
          withdraw?.userId,
          withdraw.amount,
          '-',
          `Saque de ${formatCurrency(withdraw.amount)}`,
          'bonus_invest_withdraw'
        )

        const bonus = await Bonus.findBy('investment_id', withdraw?.investId)
        bonus?.merge({
          paidOut: true,
        })
        await bonus?.save()
      } else {
        throw new BadRequestException('Não pode sacar!', 409)
      }
    }
  }

  public async destroy({}: HttpContextContract) {}
}
