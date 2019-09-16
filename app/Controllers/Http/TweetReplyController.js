'use strict'

const Reply = use('App/Models/Reply')
const Tweet = use('App/Models/Tweet')

class TweetReplyController {
  async store({ request, auth, params, response }) {
    const user = auth.current.user

    const tweet = await Tweet.find(params.id)

    const reply = await Reply.create({
      user_id: user.id,
      tweet_id: tweet.id,
      reply: request.input('reply')
    })

    await reply.load('user')

    return response.json({
      status: 'success',
      message: 'Reply posted!',
      data: reply
    })
  }
}

module.exports = TweetReplyController
