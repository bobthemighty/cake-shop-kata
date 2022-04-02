import { PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";

export function orderCake(size: Size, orderTime: PlainDateTime) {
  let leadTime = 2;
  if (size === "big") leadTime++;
  if (orderTime.hour < 12) leadTime--;
  return orderTime.add({ days: leadTime }).toPlainDate();
}
