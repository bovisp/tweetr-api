'use strict'

const User = use('App/Models/User')

class SigninController {
  async signin ({ request, auth, response }) {
    try {
      const token = await auth.attempt(
        request.input('email'),
        request.input('password')
      )

      return response.json({
        status: 'success',
        data: token
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
  }
}

module.exports = SigninController
