import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// $depositsMonth = Deposit::whereYear('created_at', '>=', Carbon::now()->subYear())
// ->selectRaw("SUM( CASE WHEN status = 1 THEN amount END) as depositAmount")
// ->selectRaw("DATE_FORMAT(created_at,'%M') as months")
// ->orderBy('created_at')
// ->groupBy(DB::Raw("MONTH(created_at)"))->get();

export default class DashboardController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
