'use strict'

const Favorite = use('App/Models/Favorite')

class FavoriteController {
  async store ({ request, auth, response }) {
    const user = auth.current.user

    const tweetId = request.input('tweet_id')

    const favorite = await Favorite.create(
      { user_id: user.id, tweet_id: tweetId },
      { user_id: user.id, tweet_id: tweetId }
    )

    return response.json({
      status: 'success',
      data: favorite
    })
  }

  async destroy ({ auth, response, params }) {
    const user = auth.current.user

    await Favorite.query()
      .where('user_id', user.id)
      .where('tweet_id', params.id)
      .delete()

    return response.json({
      status: 'success',
      data: null
    })
  }
}

module.exports = FavoriteController
