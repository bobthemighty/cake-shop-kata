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

const isWeekend = (d: PlainDateTime) =>
  [SATURDAY, SUNDAY].includes(d.dayOfWeek);

const isFrostingDay = (d: PlainDateTime) =>
  ![SUNDAY, MONDAY].includes(d.dayOfWeek);
const isBakingDay = (d: PlainDateTime) =>
  ![SATURDAY, SUNDAY].includes(d.dayOfWeek);

function bakeIt(size: Size, start: PlainDateTime) {
  let complete = start;
  let leadTime = size === "small" ? 1 : 2;
  while (leadTime > 0) {
    complete = nextDay(complete);
    if (isBakingDay(complete)) leadTime--;
  }
  return complete;
}

function frostIt(extras: Array<Extra> | undefined, start: PlainDateTime) {
  if (!extras?.includes("frosting")) return start;
  let leadTime = 2;

  let complete = start;
  while (leadTime > 0) {
    complete = nextDay(complete);
    if (isFrostingDay(complete)) leadTime--;
  }

  return complete;
}

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  const startDay = isMorning(orderTime) ? orderTime : nextDay(orderTime);

  return frostIt(order.with, bakeIt(order.size, startDay)).toPlainDate();
}
