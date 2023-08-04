import Launch from 'App/Models/Launch';
import { ILaunchListResponse } from '~/typings/LaunchListResponseInterface';
import { ILaunchStatsResponse } from '~/typings/StatsInterface';

export default class LaunchRepository {
  public async list(page: number, perPage: number, search: string): Promise<ILaunchListResponse> {
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

    return {
      results: launches.toJSON().data,
      totalDocs,
      page: page || 1,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  public async stats(): Promise<ILaunchStatsResponse> {
    const launchData = await Launch.query()
      .select('rocket_id', 'reused', 'success', 'date_utc')
      .preload('rocket');

    const launchesByRocket: { rocketName: string; condition: string; count: number }[] = [];
    const launchesByYear: { year: number; count: number; rockets: { name: string; count: number; reused: boolean }[] }[] = [];

    const countLaunchByRocket = (launch: Launch) => {
      const condition = launch.reused ? 'reused' : 'new';
      const index = launchesByRocket.findIndex((item) => item.rocketName === launch.rocket.name && item.condition === condition);

      if (index !== -1) {
        launchesByRocket[index].count++;
      } else {
        launchesByRocket.push({ rocketName: launch.rocket.name, condition, count: 1 });
      }
    };

    const countLaunchByYear = (launch: Launch) => {
      const launchYear = new Date(launch.date_utc).getFullYear();
      const indexYear = launchesByYear.findIndex((item) => item.year === launchYear);

      if (indexYear !== -1) {
        launchesByYear[indexYear].count++;
        const rocketIndex = launchesByYear[indexYear].rockets.findIndex((item) => item.name === launch.rocket.name && item.reused === !!launch.reused);

        if (rocketIndex !== -1) {
          launchesByYear[indexYear].rockets[rocketIndex].count++;
        } else {
          launchesByYear[indexYear].rockets.push({ name: launch.rocket.name, count: 1, reused: !!launch.reused });
        }
      } else {
        launchesByYear.push({
          year: launchYear,
          count: 1,
          rockets: [{ name: launch.rocket.name, count: 1, reused: !!launch.reused }],
        });
      }
    };

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

      countLaunchByRocket(launch);
      countLaunchByYear(launch);
    });

    return {
      launchesByRocket,
      launchesByYear,
      reusedCount,
      newCount,
      conditionUnknownCount,
      successCount,
      failureCount,
      statusUnknownCount,
    };
  }
}
