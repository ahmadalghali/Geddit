import * as day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
day.extend(relativeTime);

// export function since(date?: string | number | day.Dayjs | Date | null | undefined) {
//   return day(date).fromNow();
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function since(date?: string) {
  date;
  return "test";
}
