'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async update ({ request, auth, response }) {
    try {
      const user = auth.current.user

      user.name = request.input('name')
      user.username = request.input('username')
      user.email = request.input('email')
      user.location = request.input('location')
      user.bio = request.input('bio')
      user.website_url = request.input('website_url')

      await user.save()

      return response.json({
        status: 'success',
        message: 'Profile updated!',
        data: user
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem updating the profile. Please try again later.'
      })
    }
  }

  async updatePassword({ request, auth, response }) {
    const user = auth.current.user

    const verifyPassword = await Hash.verify(
      request.input('password'),
      user.password
    )

    if (!verifyPassword) {
      return response.status(400).json({
        status: 'error',
        message: 'Current password could not be verified! Please try again.'
      })
    }

    user.password = request.input('newPassword')

    await user.save()

    return response.json({
      status: 'success',
      message: 'Password updated!'
    })
  }

  async show ({ request, params, response }) {
    try {
      const user = await User.query()
        .where('username', params.username)
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
    } catch (error) {
      return response.status(404).json({
          status: 'error',
          message: 'User not found'
      })
    }
}
}

module.exports = UserController
