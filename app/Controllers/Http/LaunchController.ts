import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Launch from 'App/Models/Launch';
import { LaunchListResponse } from '@/typings/LaunchListResponseInterface';

export default class LaunchController {
  /**
   * @swagger
   * tags:
   *   name: Launches
   *   description: Endpoints para gerenciar lançamentos de foguetes da SpaceX.
   */

  /**
   * @swagger
   * /launches:
   *   get:
   *     tags:
   *       - Launches
   *     summary: Listar lançamentos
   *     description: Retorna uma lista paginada de lançamentos.
   *     parameters:
   *       - name: page
   *         in: query
   *         description: Número da página a ser retornada.
   *         required: false
   *         type: integer
   *       - name: perPage
   *         in: query
   *         description: Quantidade de itens por página.
   *         required: false
   *         type: integer
   *       - name: search
   *         in: query
   *         description: Termo de busca para filtrar os lançamentos.
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LaunchListResponse'
   *       204:
   *         description: No Content
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             example:
   *               message: Invalid input parameters.
   *
   */
  public async index({ request, response }: HttpContextContract) {
    const { page, perPage, search } = request.qs();

    if (page && isNaN(parseInt(page))) {
      return response.status(400).json({
        message: 'Invalid input parameters. The "page" parameter must be a valid integer.',
      });
    }

    if (perPage && isNaN(parseInt(perPage))) {
      return response.status(400).json({
        message: 'Invalid input parameters. The "perPage" parameter must be a valid integer.',
      });
    }

    const query = Launch.query().preload('rocket');

    if (search) {
      query.where('name', 'like', `%${search}%`)
        .orWhereHas('rocket', (builder) => {
          builder.where('name', 'like', `%${search}%`);
        })
        .orWhere('flight_number', 'like', `%${search}%`)
        .orWhere('success', 'like', `%${search}%`);
    }

    const { total: totalDocs, lastPage: totalPages } = await query.paginate(page || 1, perPage || 10);
    const hasNext = totalPages > (page || 1);
    const hasPrev = page && page > 1;

    const launches = await query.paginate(page || 1, perPage || 10);

    if (launches.length === 0) {
      return response.status(204);
    }

    return response.status(200).json({
      results: launches.toJSON().data,
      totalDocs,
      page: page || 1,
      totalPages,
      hasNext,
      hasPrev,
    } as LaunchListResponse);
  }

  /**
   * @swagger
   * /launches/stats:
   *   get:
   *     tags:
   *       - Launches
   *     summary: Estatísticas de lançamentos
   *     description: Retorna estatísticas sobre os lançamentos.
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 launchesByRocket:
   *                   type: array
   *                   description: Lista de lançamentos por foguete.
   *                   items:
   *                     type: object
   *                     properties:
   *                       rocketName:
   *                         type: string
   *                         description: Nome do foguete.
   *                       condition:
   *                         type: string
   *                         description: Indica se o foguete foi reutilizado (reused) ou novo (new).
   *                       count:
   *                         type: integer
   *                         description: Número de lançamentos com essa condição.
   *                 launchesByYear:
   *                   type: array         # Modificado para array
   *                   description: Número de lançamentos por ano.
   *                   items:             # Define o tipo de objeto dentro do array
   *                     type: object
   *                     properties:
   *                       year:          # Propriedade para o ano
   *                         type: integer
   *                         description: Ano dos lançamentos.
   *                       count:         # Propriedade para a quantidade
   *                         type: integer
   *                         description: Número de lançamentos no ano.
   *                 reusedCount:
   *                   type: integer
   *                   description: Número total de lançamentos reutilizados.
   *                 newCount:
   *                   type: integer
   *                   description: Número total de lançamentos novos.
   *                 conditionUnknownCount:
   *                   type: integer
   *                   description: Número de lançamentos com condição desconhecida.
   *                 successCount:
   *                   type: integer
   *                   description: Número total de lançamentos bem-sucedidos.
   *                 failureCount:
   *                   type: integer
   *                   description: Número total de lançamentos com falha.
   *                 statusUnknownCount:
   *                   type: integer
   *                   description: Número de lançamentos com status desconhecido.
   */


  public async stats({ response }: HttpContextContract) {
    const launches = await Launch.query()
      .select('rocket_id', 'reused', 'success', 'date_utc')
      .preload('rocket');

    const launchData = await launches;

    const launchesByRocket: { rocketName: string; condition: string; count: number }[] = [];
    const launchesByYear: { year: number; count: number }[] = [];

    launchData.forEach((launch) => {
      const condition = launch.reused ? 'reused' : 'new';

      const index = launchesByRocket.findIndex(
        (item) => item.rocketName === launch.rocket.name && item.condition === condition
      );

      if (index !== -1) {
        launchesByRocket[index].count++;
      } else {
        launchesByRocket.push({ rocketName: launch.rocket.name, condition, count: 1 });
      }

      const launchYear = new Date(launch.date_utc).getFullYear();
      const indexYear = launchesByYear.findIndex((item) => item.year === launchYear);

      if (indexYear !== -1) {
        launchesByYear[indexYear].count++;
      } else {
        launchesByYear.push({ year: launchYear, count: 1 });
      }
    });

    let reusedCount = 0;
    let newCount = 0;
    let conditionUnknownCount = 0;
    let successCount = 0;
    let failureCount = 0;
    let statusUnknownCount = 0;

    launchData.forEach((launch) => {
      if (launch.reused === null) {
        conditionUnknownCount++;
      } else if (!!launch.reused) {
        reusedCount++;
      } else {
        newCount++;
      }

      if (launch.success === null) {
        statusUnknownCount++;
      } else if (!!launch.success) {
        successCount++;
      } else {
        failureCount++;
      }
    });

    return response.status(200).json({
      launchesByRocket,
      launchesByYear,
      reusedCount,
      newCount,
      conditionUnknownCount,
      successCount,
      failureCount,
      statusUnknownCount,
    });
  }

}
