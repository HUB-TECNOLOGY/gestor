import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deposit from 'App/Models/Deposit'
import StoreDepositValidator from 'App/Validators/StoreDepositValidator'

export default class DepositController {
  public async index({ auth }: HttpContextContract) {
    return await Deposit.findBy('user_id', auth.user?.id)
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreDepositValidator)
    return await Deposit.create({
      userId: auth.user?.id,
      amount: data.amount,
    })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
