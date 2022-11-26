import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreWithDrawlsValidator from 'App/Validators/StoreWithDrawlsValidator'
import Withdrawals from 'App/Models/Withdraw'

export default class WithdrawalsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreWithDrawlsValidator)
    data.userId = auth?.user?.id
    return await Withdrawals.create(data)
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
