import { BaseTask } from 'adonis5-scheduler/build'
import execa from 'execa'

export default class SaveLaunchesTask extends BaseTask {
  logger: any;
  public static get schedule() {
    return '0 9 * * *'
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    try {
      const { stdout } = await execa('node', ['ace', 'save:launches']);
      this.logger.info(`Comando "save:launches" executado: ${stdout}`);
    } catch (error) {
      this.logger.error(`Erro ao executar "save:launches": ${error.message}`);
    }
  }
}
