import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'AuthController.store')
    Route.post('logout', 'AuthController.destroy')
  }).prefix('auth')

  Route.resource('users', 'UsersController')
  Route.group(() => {
    Route.resource('network', 'NetworksController').apiOnly()
    Route.get('network/my-network', 'NetworksController.show')
  }).middleware('auth')
}).prefix('/api/v1')
