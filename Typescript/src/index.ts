import { PlainDateTime } from "temporal-polyfill";

type Size = "small" | "big";

export function orderCake(size: Size, orderTime: PlainDateTime) {
  return orderTime.add({ days: 2 }).toPlainDate();
}
