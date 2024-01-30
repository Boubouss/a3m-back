import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {
  public async me({ auth }: HttpContextContract) {
    return auth.user
  }

  public async check({ auth, response }: HttpContextContract) {
    return response.ok({ authenticated: auth.isAuthenticated })
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)
    const user = await User.create(payload)
    await auth.login(user)
    return response.created()
  }
}
