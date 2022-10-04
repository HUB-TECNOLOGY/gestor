import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import User from 'App/Models/User'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class RegisterController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreUserValidator)
    const referral = await User.findBy('username', data.referral)
    // console.log('data', DateTime.local().plus({ days: 90 }).toString())
    if (!referral)
      throw new BadRequestException('Não existe patrocinador com este código informado!', 409)
    // if (points < 2)
    //   throw new BadRequestException(
    //     'O patrocinador deve ter uma pontuação maior que 1 para poder indicar',
    //     409
    //   )
    data.refId = referral?.id
    data.profileId = 1
    const user = await User.create(data)
    // Event.emit('new:user', user)
    return response.created(user)
  }

  public async show({}: HttpContextContract) {}

  public async update({ response, params }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    if (!user) throw new BadRequestException('Não existe usuário com este código informado!', 409)
    user.merge({
      status: 'ACTIVE',
    })
    return response.created(user)
  }
}
