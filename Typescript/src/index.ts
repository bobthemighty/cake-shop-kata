import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";
type Extra = "frosting";

const SATURDAY = 6;
const SUNDAY = 7;

export interface CakeRequirements {
  size: Size;
  with?: Array<Extra>;
}

const nextDay = (d: PlainDateTime) => d.add({ days: 1 });

const isMorning = (d: PlainDateTime) => d.hour < 12;

const isWeekend = (d: PlainDateTime) =>
  [SATURDAY, SUNDAY].includes(d.dayOfWeek);

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  const startDay = isMorning(orderTime) ? orderTime : nextDay(orderTime);

  let leadTime = order.size === "small" ? 1 : 2;
  if (order.with?.includes("frosting")) leadTime += 2;

  let deliveryDay = startDay;
  while (leadTime > 0) {
    deliveryDay = nextDay(deliveryDay);
    if (!isWeekend(deliveryDay)) leadTime--;
  }

  return deliveryDay.toPlainDate();
}
