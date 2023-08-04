import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ILaunchListResponse } from '@/typings/LaunchListResponseInterface';
import LaunchRepository from 'App/Repositories/LaunchRepository';

export default class LaunchController {
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
   *               $ref: '#/components/schemas/LaunchsResponse'
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

    const launchRepo = new LaunchRepository();
    const launches = await launchRepo.list(page || 1, perPage || 10, search);

    if (launches.results.length === 0) {
      return response.status(204);
    }

    return response.status(200).json({
      ...launches,
    } as ILaunchListResponse);
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
   *                   type: array
   *                   description: Número de lançamentos por ano.
   *                   items:
   *                     type: object
   *                     properties:
   *                       year:
   *                         type: integer
   *                         description: Ano dos lançamentos.
   *                       count:
   *                         type: integer
   *                         description: Número de lançamentos no ano.
   *                       rockets:
   *                         type: array
   *                         description: Lista de foguetes com seus respectivos lançamentos.
   *                         items:
   *                           type: object
   *                           properties:
   *                             name:
   *                               type: string
   *                               description: Nome do foguete.
   *                             quantity:
   *                               type: integer
   *                               description: Número de lançamentos do foguete no ano.
   *                             reused:
   *                               type: boolean
   *                               description: Indica se o lançamento do foguete é reutilizado ou não.
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
  const launchRepo = new LaunchRepository();
  const statsData = await launchRepo.stats();

  return response.status(200).json(statsData);
}

}
