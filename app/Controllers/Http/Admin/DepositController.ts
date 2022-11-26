import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deposit from 'App/Models/Deposit'
import Logger from '@ioc:Adonis/Core/Logger'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import { createTransaction, formatCurrency } from 'App/Handlers'

export default class DepositController {
  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({ params }: HttpContextContract) {
    const deposit = await Deposit.find(params.id)
    const user = await User.find(deposit?.userId)
    if (deposit?.status === 'APROVADO') throw new BadRequestException('Depósito já aprovado!', 409)
    deposit?.merge({
      status: 'APROVADO',
    })
    user?.merge({
      balance: (user.balance += Number(deposit?.amount)),
    })
    user?.save()
    await deposit?.save()
    console.log()
    await createTransaction(
      deposit?.userId,
      deposit?.amount,
      '+',
      `Depósito de ${formatCurrency(deposit?.amount)}`,
      'deposit'
    )
    Logger.info('[DEPOSIT SUCCESS]')
  }

  public async destroy({}: HttpContextContract) {}
}
