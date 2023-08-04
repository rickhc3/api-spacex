import { DateTime } from "luxon";
import { IRocket } from "@/typings/RocketDataInterface";
export interface ILaunch {
  id: number;
  flight_number: number;
  name: string;
  date_utc: DateTime | null;
  success: boolean | null;
  reused: boolean | null;
  youtube_link: string | null;
  rocket_id: number;
  links_patch_small: string | null;
  links_patch_large: string | null;
  presskit: string | null;
  wikipedia: string | null;
  created_at: DateTime;
  updated_at: DateTime;
  rocket: IRocket;
}
