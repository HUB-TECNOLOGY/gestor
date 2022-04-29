import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return await User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)
    switch (data.role) {
      case 'ADMIN':
        return response.created(await User.create(data))
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
        return response.created(await User.create(data))
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
