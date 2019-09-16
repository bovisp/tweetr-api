'use strict'

const User = use('App/Models/User')

class FollowController {
  async index ({ auth, response }) {
    const user = auth.current.user

    const currentlyFollowing = await user.following().ids()

    const canFollow = await User.query()
      .whereNot('id', user.id)
      .whereNotIn('id', currentlyFollowing)
      .pick(3)

    return response.json({
      status: 'success',
      data: canFollow
    })
  }

  async store ({ request, auth, response }) {
    const user = auth.current.user

    await user.following().attach(
      request.input('user_id')
    )

    return response.json({
      status: 'success',
      data: null
    })
  }

  async destroy ({ params, auth, response }) {
    const user = auth.current.user

    await user.following.detach(params.id)

    return response.json({
      status: 'success',
      data: null
    })
  }
}

module.exports = FollowController
