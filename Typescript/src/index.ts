import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";
type Extra = "frosting" | "nuts" | "box";

const SATURDAY = 6;
const SUNDAY = 7;
const MONDAY = 1;

export interface CakeRequirements {
  size: Size;
  with?: Array<Extra>;
}

const nextDay = (d: PlainDate) => d.add({ days: 1 });

const isMorning = (d: PlainDateTime) => d.hour < 12;

const isFrostingDay = (d: PlainDate) => ![SUNDAY, MONDAY].includes(d.dayOfWeek);

const isBakingDay = (d: PlainDate) => ![SATURDAY, SUNDAY].includes(d.dayOfWeek);

const everyDay = () => true;

function doIt(
  leadTime: (c: CakeRequirements) => number,
  isWorkingDay: (d: PlainDate) => boolean
): (cake: CakeRequirements, start: PlainDate) => PlainDate {
  return (cake, start) => {
    let day = start;
    let remaining = leadTime(cake);
    while (remaining) {
      day = nextDay(day);
      if (isWorkingDay(day)) remaining--;
    }
    return day;
  };
}

const boxIt = doIt((c) => (c.with?.includes("box") ? 2 : 0), everyDay);

const bakeIt = doIt((c) => (c.size === "small" ? 1 : 2), isBakingDay);

const frostIt = doIt(
  (c) => (c.with?.includes("frosting") ? 2 : 0),
  isFrostingDay
);

const addNuts = doIt((c) => (c.with?.includes("nuts") ? 1 : 0), isBakingDay);

const latest = (...args: Array<PlainDate>) =>
  args.sort(PlainDate.compare).pop();

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  const orderDay = orderTime.toPlainDate();
  const startDay = isMorning(orderTime) ? orderDay : nextDay(orderDay);
  const bakedDate = addNuts(order, frostIt(order, bakeIt(order, startDay)));
  const boxArrival = boxIt(order, orderDay);

  return latest(bakedDate, boxArrival);
}
