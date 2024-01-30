import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.required(),
      rules.trim(),
      rules.lowercase(),
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.minLength(8), rules.maxLength(25), rules.confirmed()]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required to create a user',
    'email.email': 'Email is invalid',
    'email.unique': 'Email is already taken',
    'email.maxLength': 'Email is too long (maximum is 255 characters)',
    'password.required': 'Password is required to create a user',
    'password.minLength': 'Password must be at least 8 characters long',
    'password.maxLength': 'Password is too long (maximum is 25 characters)',
    'password_confirmation.confirmed': 'Password confirmation does not match',
  }
}
