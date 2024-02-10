import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum(['COMPETITION', 'ENTRAINEMENT', 'STAGE', 'GRADE'] as const, [
      rules.required(),
    ]),
    dateDebut: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
      rules.after('today'),
    ]),
    dateFin: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required(),
      rules.afterField('dateDebut'),
    ]),
    numeroRue: schema.number(),
    rue: schema.string([
      rules.trim(),
      rules.maxLength(255),
      rules.alpha({ allow: ['space', 'dash'] }),
    ]),
    ville: schema.string([
      rules.trim(),
      rules.maxLength(255),
      rules.alpha({ allow: ['space', 'dash'] }),
    ]),
    codePostal: schema.string([rules.trim(), rules.maxLength(5), rules.alphaNum()]),
  })

  public messages: CustomMessages = {}
}
