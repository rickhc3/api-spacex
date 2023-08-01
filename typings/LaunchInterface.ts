import { DateTime } from "luxon";

export interface ILaunch {
  flight_number: number;
  name: string;
  date_utc: DateTime | null;
  success: boolean | null;
  reused: boolean | null;
  youtube_link: string | null;
  rocket: string;
  links_patch_small: string | null;
  links_patch_large: string | null;
  presskit: string | null;
  wikipedia: string | null;
}
