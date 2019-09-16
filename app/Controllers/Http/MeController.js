'use strict'

const User = use('App/Models/User')

class MeController {
  async me ({ auth, response }) {
    const user = await User.query()
      .where('id', auth.current.user.id)
      .with('tweets', builder => {
        builder.with('user')
        builder.with('favorites')
        builder.with('replies')
      })
      .with('following')
      .with('followers')
      .with('favorites')
      .with('favorites.tweet', builder => {
        builder.with('user')
        builder.with('favorites')
        builder.with('replies')
      })
      .firstOrFail()

    return response.json({
      status: 'success',
      data: user
    })
  }
}

module.exports = MeController
