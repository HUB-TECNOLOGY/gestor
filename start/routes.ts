import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.store')
    Route.post('/logout', 'AuthController.destroy')
  }).prefix('/auth')
  Route.post('/users', 'UsersController.store')

  Route.group(() => {
    Route.get('/users', 'UsersController.index')
    Route.patch('/users/activate/:id', 'UsersController.update')

    Route.resource('network/my-network', 'NetworksController').apiOnly()
    Route.get('network/my-network/managers', 'NetworksController.show')
  }).middleware('auth')
}).prefix('/api/v1')
