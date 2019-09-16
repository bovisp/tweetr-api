'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/signup', 'SignupController.signup')

Route.post('/signin', 'SigninController.signin')

Route.group(() => {
  Route.get('/me', 'MeController.me')
  Route.put('/update', 'UserController.update')
  Route.put('/update_password', 'UserController.updatePassword')
})
  .prefix('account')
  .middleware(['auth:jwt'])

Route.get(':username', 'UserController.show')

Route.group(() => {
  Route.get('/follow', 'FollowController.index')
  Route.post('/follow', 'FollowController.store')
  Route.delete('/follow/:id', 'FollowController.destroy')
  Route.get('/timeline', 'TimelineController.index')
})
  .prefix('users')
  .middleware(['auth:jwt'])

Route.group(() => {
  Route.post('/', 'TweetController.store').middleware(['auth:jwt'])
  Route.get(':id', 'TweetController.show')
  Route.post('/reply/:id', 'TweetReplyController.store').middleware(['auth:jwt'])
  Route.delete(':id', 'TweetController.destroy').middleware(['auth:jwt'])
}).prefix('tweets')

Route.group(() => {
  Route.post('/', 'FavoriteController.store')
  Route.delete(':id', 'FavoriteController.destroy')
})
  .prefix('favorites')
  .middleware(['auth:jwt'])