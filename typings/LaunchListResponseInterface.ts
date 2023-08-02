import { LaunchItem } from "./LaunchItemInterface";

export interface LaunchListResponse {
  results: LaunchItem[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
