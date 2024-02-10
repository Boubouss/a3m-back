import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateEventValidator from 'App/Validators/CreateEventValidator'
import Event from 'App/Models/Event'

export default class EventsController {
  // list all events
  public async index({ response }: HttpContextContract) {
    const events = await Event.all()
    return response.ok(events)
  }
  // create a new event
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateEventValidator)
    const event = await Event.create(payload)
    return response.created(event)
  }

  // show a specific event
  public async show({ params, response }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    return response.ok(event)
  }

  // update an event
  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateEventValidator)
    const event = await Event.findOrFail(params.id)
    event.merge(payload)
    await event.save()
    return response.ok(event)
  }

  // delete an event
  public async destroy({ params, response }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    await event.delete()
    return response.noContent()
  }
}
