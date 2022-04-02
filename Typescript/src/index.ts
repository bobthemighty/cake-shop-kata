import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";
type Extra = "frosting";

const SATURDAY = 6;
const SUNDAY = 7;

export interface CakeRequirements {
  size: Size;
  with?: Array<Extra>;
}

const isMorning = (d: PlainDateTime) => d.hour < 12;

const isWeekend = (d: PlainDateTime) =>
  [SATURDAY, SUNDAY].includes(d.dayOfWeek);

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  let leadTime = order.size === "small" ? 1 : 2;
  if (order.with?.includes("frosting")) leadTime += 2;
  const startDay = isMorning(orderTime)
    ? orderTime
    : orderTime.add({ days: 1 });

  let deliveryDay = startDay.add({ days: leadTime });
  while (isWeekend(deliveryDay)) deliveryDay = deliveryDay.add({ days: 1 });

  return deliveryDay.toPlainDate();
}
