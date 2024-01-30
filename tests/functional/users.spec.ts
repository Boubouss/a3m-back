import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories/UserFactory'

test.group('User | Register', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure user can register', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(201)
  })

  test('ensure user cannot register with existing email', async ({ assert, client }) => {
    await UserFactory.merge({ email: 'redwanbsm@example.com' }).create()

    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'Email is already taken', field: 'email', rule: 'unique' }],
    })
  })

  test('ensure user cannot register with invalid email', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm',
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'Email is invalid', field: 'email', rule: 'email' }],
    })
  })

  test('ensure user cannot register with short password', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
      password: 'secret',
      password_confirmation: 'secret',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'Password must be at least 8 characters long',
          field: 'password',
          rule: 'minLength',
        },
      ],
    })
  })

  test('ensure user cannot register with unconfirmed password', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
      password: 'secret1234',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'Password confirmation does not match',
          field: 'password_confirmation',
          rule: 'confirmed',
        },
      ],
    })
  })

  test('ensure user cannot register with missing password', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'Password is required to create a user',
          field: 'password',
          rule: 'required',
        },
      ],
    })
  })

  test('ensure user cannot register with a password does not match', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
      password: 'secret1234',
      password_confirmation: 'secret12345',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'Password confirmation does not match',
          field: 'password_confirmation',
          rule: 'confirmed',
        },
      ],
    })
  })

  test('ensure user cannot register with missing email', async ({ assert, client }) => {  
    const response = await client.post('/auth/register').json({
      password: 'secret1234',
      password_confirmation: 'secret1234',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'Email is required to create a user',
          field: 'email',
          rule: 'required',
        },
      ],
    })
  })

  test('ensure user cannot register with a password too long', async ({ assert, client }) => {
    const response = await client.post('/auth/register').json({
      email: 'redwanbsm@example.com',
      password: 'loremipsumdolorsitametconsecteturadipiscingelitvivamusegetsemper',
      password_confirmation: 'loremipsumdolorsitametconsecteturadipiscingelitvivamusegetsemper',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'Password is too long (maximum is 25 characters)',
          field: 'password',
          rule: 'maxLength',
        },
      ],
    })
  })
})