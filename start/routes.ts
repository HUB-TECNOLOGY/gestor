import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'Auth/AuthController.store')
    Route.post('/logout', 'Auth/AuthController.destroy')
  }).prefix('/auth')
  Route.post('/users', 'User/UsersController.store')

  Route.group(() => {
    Route.get('/users', 'User/UsersController.index')
    Route.patch('/users/activate/:id', 'User/UsersController.update')

    Route.resource('network/my-network', 'NetworksController').apiOnly()
    Route.get('network/my-network/managers', 'NetworksController.show')
  }).middleware('auth')
}).prefix('/api/v1')
