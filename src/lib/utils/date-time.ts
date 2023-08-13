import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function since(date?: string | number | dayjs.Dayjs | Date | null | undefined) {
  return dayjs(date).fromNow();
}
