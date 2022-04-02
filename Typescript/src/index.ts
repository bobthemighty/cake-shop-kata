import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";

export interface CakeRequirements {
  size: Size;
}

const isMorning = (d: PlainDateTime) => d.hour < 12;

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  const leadTime = order.size === "small" ? 1 : 2;
  const startDay = isMorning(orderTime)
    ? orderTime
    : orderTime.add({ days: 1 });
  return startDay.add({ days: leadTime }).toPlainDate();
}
