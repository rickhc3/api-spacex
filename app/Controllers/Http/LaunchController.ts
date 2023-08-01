import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Launch from 'App/Models/Launch'

export default class LaunchController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, search } = request.qs()

    const query = Launch.query()

    if (search) {
      query.where('name', 'like', `%${search}%`)
        .orWhere('rocket', 'like', `%${search}%`)
        .orWhere('flight_number', 'like', `%${search}%`)
        .orWhere('success', 'like', `%${search}%`)
    }

    const { total: totalDocs, lastPage: totalPages } = await query.paginate(page || 1, perPage || 10)
    const hasNext = totalPages > (page || 1)
    const hasPrev = page && page > 1

    const launches = await query.paginate(page || 1, perPage || 10)

    return {
      results: launches.toJSON().data,
      /* ...launches.toJSON().meta, */
      totalDocs,
      page: page || 1,
      totalPages,
      hasNext,
      hasPrev,
    }
  }
}
