import { PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";

export function orderCake(size: Size, orderTime: PlainDateTime) {
  const leadTime = size === "small" ? 1 : 2;
  const startDay = orderTime.hour < 12 ? orderTime : orderTime.add({ days: 1 });
  return startDay.add({ days: leadTime });
}
