import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deposit from 'App/Models/Deposit'
import Transaction from 'App/Models/Transaction'
import Account from 'App/Models/Account'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class DepositController {
  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({ params }: HttpContextContract) {
    const deposit = await Deposit.find(params.id)
    if (deposit?.status === 'APROVADO') throw new BadRequestException('Depósito já aprovado!', 409)
    deposit?.merge({
      status: 'APROVADO',
    })
    await deposit?.save()
    // @ts-ignore
    const amount: number | undefined = deposit.amount
    await Transaction.create({
      userId: deposit?.userId,
      amount: deposit?.amount,
      transactionType: '+',
      details: `Depósito de ${Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)}`,
      remark: 'deposit',
      postBalance: 0,
      charge: 0,
    })
    const account = await Account.find(deposit?.userId)
    const prevAmount = Number(account?.balance) + Number(deposit?.amount)
    console.log(prevAmount)
    account?.merge({
      balance: prevAmount,
      postBalance: account?.balance,
    })
    await account?.save()
  }

  public async destroy({}: HttpContextContract) {}
}
