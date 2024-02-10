import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {
  public me({ auth }: HttpContextContract) {
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

  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      await auth.attempt(email, password)
    } catch (error) {
      // Fake hash verification to prevent user enumeration
      if (error.code === 'E_INVALID_AUTH_UID') {
        await Hash.verify(
          '$scrypt$n=16384,r=8,p=1$X2ztIdMIb68yyt8u9D/39w$KnxShF8UhgqMxv94nL4NTBMVhUqkE/O7w+f47cwnRQnc+T8ME0EsYtZ/m99splF9W1cyG0nOXcX8ria07lW3sQ',
          'secret1234'
        )
      }
      throw error
    }
    return response.noContent()
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.noContent()
  }
}
