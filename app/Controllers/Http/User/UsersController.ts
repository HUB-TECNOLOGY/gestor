import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Event from '@ioc:Adonis/Core/Event'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return await User.query().preload('my_network')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreUserValidator)
    switch (data.profileId) {
      case 1:
        const user1 = await User.create(data)
        Event.emit('new:user', user1)
        return response.created(user1)
      default:
        const sponsor = await User.findBy('my_code', data.sponsorCode)
        const { points } = await User.findByOrFail('my_code', data.sponsorCode)
        if (!sponsor)
          throw new BadRequestException('Não existe patrocinador com este código informado!', 409)
        if (points < 2)
          throw new BadRequestException(
            'O patrocinador deve ter uma pontuação maior que 1 para poder indicar',
            409
          )
        const user = await User.create(data)
        Event.emit('new:user', user)
        return response.created(user)
    }
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

  public async destroy({}: HttpContextContract) {}
}
