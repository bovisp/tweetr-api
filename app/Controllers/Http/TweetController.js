'use strict'

const Tweet = use('App/Models/Tweet')

class TweetController {
  async store ({ request, auth, response }) {
    const user = auth.current.user
    
    const tweet = await Tweet.create({
      user_id: user.id,
      tweet: request.input('tweet')
    })

    await tweet.loadMany([
      'user', 'favorites', 'replies'
    ])

    return response.json({
      status: 'success',
      message: 'Tweet posted!',
      data: tweet
    })
  }

  async show ({ params, response }) {
    try {
      const tweet = await Tweet.query()
        .where('id', params.id)
        .with('user')
        .with('replies')
        .with('replies.user')
        .with('favorites')
        .firstOrFail()

      return response.json({
        status: 'success',
        data: tweet
      })
    } catch (error) {
      return response.status(404).json({
        status: 'error',
        message: 'Tweet not found'
      })
    }
  }

  async destroy ({ auth, params, response }) {
    const user = auth.current.user

    const tweet = await Tweet.query()
      .where('user_id', user.id)
      .where('id', params.id)
      .firstOrFail()

    await tweet.delete()

    return response.json({
      status: 'success',
      message: 'Tweet deleted.',
      data: null
    })
  }
}

module.exports = TweetController
