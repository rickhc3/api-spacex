export interface ILaunchStatsResponse {
  launchesByRocket: {
    rocketName: string;
    condition: string;
    count: number;
  }[];
  launchesByYear: {
    year: number;
    count: number;
    rockets: {
      name: string;
      count: number;
      reused: boolean;
    }[];
  }[];
  reusedCount: number;
  newCount: number;
  conditionUnknownCount: number;
  successCount: number;
  failureCount: number;
  statusUnknownCount: number;
}
