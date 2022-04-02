import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";
type Extra = "frosting";

export interface CakeRequirements {
  size: Size;
  with?: Array<Extra>;
}

const isMorning = (d: PlainDateTime) => d.hour < 12;

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  let leadTime = order.size === "small" ? 1 : 2;
  if (order.with?.includes("frosting")) leadTime += 2;
  const startDay = isMorning(orderTime)
    ? orderTime
    : orderTime.add({ days: 1 });
  return startDay.add({ days: leadTime }).toPlainDate();
}
