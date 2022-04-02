import { PlainDate, PlainDateTime } from "temporal-polyfill";

import { orderCake } from ".";

const Monday = PlainDateTime.from("2022-04-04");
const Wednesday = Monday.add({ days: 2 });

test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
  const result = orderCake("small", Monday);
  expect(result).toBeDeliveredOn(Wednesday);
});
