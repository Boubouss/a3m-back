import Event from 'App/Models/Event'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const EventFactory = Factory.define(Event, ({ faker }) => {
  return {
    type: 'COMPETITION',
    dateDebut: '2025-01-01 00:00:00',
    dateFin: '2025-01-01 23:59:59',
    numeroRue: faker.datatype.number(100),
    rue: faker.address.streetName(),
    ville: faker.address.city(),
    codePostal: faker.address.zipCode(),
  }
}).build()
