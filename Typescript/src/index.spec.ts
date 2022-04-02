import { PlainDate, PlainDateTime } from "temporal-polyfill";

import { orderCake } from ".";

const morning = (d: PlainDate) => d.toPlainDateTime({ hour: 9 });
const afternoon = (d: PlainDate) => d.toPlainDateTime({ hour: 14 });

const Monday = PlainDate.from("2022-04-04");
const Wednesday = Monday.add({ days: 2 });
const Thursday = Monday.add({ days: 3 });

test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
  const result = orderCake({ size: "small" }, afternoon(Monday));
  expect(result).toBeDeliveredOn(Wednesday);
});

test("A big cake, ordered on Monday, is delivered on Thursday", () => {
  const result = orderCake({ size: "big" }, afternoon(Monday));
  expect(result).toBeDeliveredOn(Thursday);
});

test("A cake order received in the morning starts baking the same day", () => {
  const result = orderCake({ size: "big" }, morning(Monday));
  expect(result).toBeDeliveredOn(Wednesday);
});
