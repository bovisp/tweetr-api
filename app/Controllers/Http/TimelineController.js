'use strict'

const User = use('App/Models/User')
const Tweet = use('App/Models/Tweet')

class TimelineController {
  async index ({ auth, response }) {
    const user = await User.find(auth.current.user.id)

    const followersIds = await user.following().ids()

    followersIds.push(user.id) 

    const tweets = await Tweet.query()
      .whereIn('user_id', followersIds)
      .with('user')
      .with('favorites')
      .with('replies')
      .fetch()

    return response.json({
      status: 'success',
      data: tweets
    })
  }
}

module.exports = TimelineController
