import dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh";

dayjs.locale("zh");
dayjs.extend(Duration);
dayjs.extend(relativeTime);

export default dayjs;
