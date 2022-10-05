import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Transaction from 'App/Models/Transaction'
import Account from 'App/Models/Account'
import Withdrawals from 'App/Models/Withdraw'
import Database from '@ioc:Adonis/Lucid/Database'
import Bonus from 'App/Models/Bonus'

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
        const account = await Account.find(withdraw?.userId)
        account?.merge({
          balance: Number(account?.balance) + Number(withdraw?.amount),
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

        account?.merge({
          balance: Number(account?.balance) - Number(withdraw?.amount),
          postBalance: account?.balance,
        })
        await account?.save()

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
