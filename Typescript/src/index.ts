import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";
type Extra = "frosting";

const SATURDAY = 6;
const SUNDAY = 7;
const MONDAY = 1;

export interface CakeRequirements {
  size: Size;
  with?: Array<Extra>;
}

const nextDay = (d: PlainDateTime) => d.add({ days: 1 });

const isMorning = (d: PlainDateTime) => d.hour < 12;

const isFrostingDay = (d: PlainDateTime) =>
  ![SUNDAY, MONDAY].includes(d.dayOfWeek);
const isBakingDay = (d: PlainDateTime) =>
  ![SATURDAY, SUNDAY].includes(d.dayOfWeek);

function doIt(
  leadTime: (c: CakeRequirements) => number,
  isWorkingDay: (d: PlainDateTime) => boolean
): (cake: CakeRequirements, start: PlainDateTime) => PlainDateTime {
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

const bakeIt = doIt((c) => (c.size === "small" ? 1 : 2), isBakingDay);

const frostIt = doIt(
  (c) => (c.with?.includes("frosting") ? 2 : 0),
  isFrostingDay
);

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  const startDay = isMorning(orderTime) ? orderTime : nextDay(orderTime);

  return frostIt(order, bakeIt(order, startDay)).toPlainDate();
}
