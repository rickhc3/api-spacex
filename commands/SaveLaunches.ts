import { BaseCommand } from '@adonisjs/core/build/standalone';
import Axios from 'axios';
import Launch from 'App/Models/Launch';
import Rocket from 'App/Models/Rocket';
import { DateTime } from 'luxon';
import { RocketData } from '@/typings/RocketDataInterface';

export default class SaveLaunches extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'save:launches';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Fetches SpaceX launches data and saves it to the database';

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  };

  public async run() {
    try {
      const response = await Axios.get('https://api.spacexdata.com/v5/launches');
      const data = response.data;

      for (const launchData of data) {
        const flightNumber = launchData.flight_number;
        const rocketId = launchData.rocket;
        const name = launchData.name;

        let rocket = await Rocket.findBy('rocket_id', rocketId);

        if (!rocket) {
          let rocketData = await this.getRocketName(rocketId);
          rocket = await Rocket.create({ name: rocketData.name, rocket_id: rocketData.id  });
        }

        await Launch.updateOrCreate(
          { flight_number: flightNumber, rocket_id: rocket.id.toString(), name: name },
          {
            flight_number: flightNumber,
            name: name,
            date_utc: launchData.date_utc ? DateTime.fromISO(launchData.date_utc) : undefined,
            success: launchData.success ?? null,
            reused: launchData.cores[0].reused ?? null,
            youtube_link: launchData.links.youtube_id ?? null,
            rocket_id: rocket.id.toString(),
            links_patch_small: launchData.links.patch.small ?? null,
            links_patch_large: launchData.links.patch.large ?? null,
            presskit: launchData.links.presskit ?? null,
            wikipedia: launchData.links.wikipedia ?? null,
          }
        );
      }
      this.logger.info('Launches data saved to the database');
      process.exit(0);
    } catch (error) {
      this.logger.error('Error fetching or saving launches data: ' + error.message);
      process.exit(1);
    }
  }

  private async getRocketName(rocketId: string): Promise<RocketData> {
    const response = await Axios.get(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
    const data = response.data;
    return data;
  }
}
