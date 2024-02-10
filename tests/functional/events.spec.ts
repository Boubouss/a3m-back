import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { EventFactory } from 'Database/factories/EventFactory'
import { UserFactory } from 'Database/factories/UserFactory'

test.group('Events', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure we can list all events', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/events').loginAs(user)
    response.assertStatus(200)
  })

  test('ensure we can create a new event', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.post('/events').loginAs(user).json({
      type: 'COMPETITION',
      dateDebut: '2025-01-01 00:00:00',
      dateFin: '2025-01-01 23:59:59',
      numeroRue: 123,
      rue: 'Main St',
      ville: 'Springfield',
      codePostal: '12345',
    })

    console.log(response.body())
    response.assertStatus(201)
  })

  test('ensure we can show a specific event', async ({ client }) => {
    const user = await UserFactory.create()
    const event = await EventFactory.create()
    const response = await client.get('/events/' + event.id).loginAs(user)
    response.assertStatus(200)
  })

  test('ensure we can update an event', async ({ client }) => {
    const user = await UserFactory.create()
    const event = await EventFactory.create()
    const response = await client
      .put('/events/' + event.id)
      .loginAs(user)
      .json({
        type: 'COMPETITION',
        dateDebut: '2025-01-01 00:00:00',
        dateFin: '2025-01-01 23:59:59',
        numeroRue: 123,
        rue: 'Main St',
        ville: 'Springfield',
        codePostal: '12345',
      })
    response.assertStatus(200)
  })

  test('ensure we can delete an event', async ({ client }) => {
    const user = await UserFactory.create()
    const event = await EventFactory.create()
    const response = await client.delete('/events/' + event.id).loginAs(user)
    response.assertStatus(204)
  })
})

test.group('Event | Validation', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction('pg')
  })

  test('ensure we cannot create an event with invalid data', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.post('/events').loginAs(user).json({
      type: 'COMPETITION',
      dateDebut: 'invalid',
      dateFin: 'invalid',
      numeroRue: 'invalid',
      rue: 'Main St',
      ville: 'Springfield',
      codePostal: '12345',
    })
    response.assertStatus(422)
  })

  test('ensure we cannot update an event with invalid data', async ({ client }) => {
    const user = await UserFactory.create()
    const event = await EventFactory.create()
    const response = await client
      .put('/events/' + event.id)
      .loginAs(user)
      .json({
        type: 'COMPETITION',
        dateDebut: 'invalid',
        dateFin: 'invalid',
        numeroRue: 'invalid',
        rue: 'Main St',
        ville: 'Springfield',
        codePostal: '12345',
      })
    response.assertStatus(422)
  })
})
