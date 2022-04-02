import { PlainDate, PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";

const isMorning = (d: PlainDateTime) => d.hour < 12;

export function orderCake(size: Size, orderTime: PlainDateTime): PlainDate {
  const leadTime = size === "small" ? 1 : 2;
  const startDay = isMorning(orderTime)
    ? orderTime
    : orderTime.add({ days: 1 });
  return startDay.add({ days: leadTime }).toPlainDate();
}
