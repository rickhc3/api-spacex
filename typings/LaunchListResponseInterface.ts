import { ModelObject } from "@ioc:Adonis/Lucid/Orm";
import { ILaunch } from "./LaunchInterface";

export interface ILaunchListResponse {
  results: ILaunch[] | ModelObject[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean | number;
}
