import { PlainDate, PlainDateTime } from "temporal-polyfill";

import { orderCake } from ".";

const morning = (d: PlainDate) => d.toPlainDateTime({ hour: 9 });
const afternoon = (d: PlainDate) => d.toPlainDateTime({ hour: 14 });
const following = (d: PlainDate) => d.add({ weeks: 1 });

const Monday = PlainDate.from("2022-04-04");
const Tuesday = Monday.add({ days: 1 });
const Wednesday = Monday.add({ days: 2 });
const Thursday = Monday.add({ days: 3 });
const Friday = Monday.add({ days: 4 });

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

test("A cake with frosting takes an extra two days", () => {
  const result = orderCake(
    { size: "small", with: ["frosting"] },
    morning(Monday)
  );
  expect(result).toBeDeliveredOn(Thursday);
});

test("A small cake, ordered on Friday, is delivered on Monday", () => {
  const result = orderCake({ size: "small" }, morning(Friday));
  expect(result).toBeDeliveredOn(following(Monday));
});

test("A small cake, ordered on Friday, is delivered on Monday", () => {
  const result = orderCake({ size: "small" }, morning(Friday));
  expect(result).toBeDeliveredOn(following(Monday));
});

test("A small cake with frosting, ordered on Friday morning, is delivered on Wednesday", () => {
  const result = orderCake(
    { size: "small", with: ["frosting"] },
    morning(Friday)
  );
  expect(result).toBeDeliveredOn(following(Wednesday));
});

test("A big cake, ordered on Thursday afternoon, is delivered on Tuesday", () => {
  const result = orderCake({ size: "big" }, afternoon(Thursday));
  expect(result).toBeDeliveredOn(following(Tuesday));
});

test("A big cake, ordered on Thursday morning, is delivered on Monday", () => {
  const result = orderCake({ size: "big" }, morning(Thursday));
  expect(result).toBeDeliveredOn(following(Monday));
});

test("A big cake with custom frosting, ordered on Tuesday afternoon, is delivered next Tuesday", () => {
  expect(
    orderCake({ size: "big", with: ["frosting"] }, afternoon(Tuesday))
  ).toBeDeliveredOn(following(Tuesday));
});

test("a small cake with nuts, ordered on Monday morning, is delivered on Wednesday", () => {
  expect(
    orderCake({ size: "small", with: ["nuts"] }, morning(Monday))
  ).toBeDeliveredOn(Wednesday);
});

test("a small cake with nuts and frosting, ordered on Monday morning, is delivered on Wednesday", () => {
  expect(
    orderCake({ size: "small", with: ["nuts", "frosting"] }, morning(Monday))
  ).toBeDeliveredOn(Friday);
});

test("An order for a small cake with frosting, in a fancy box, placed on Tuesday morning, has a delivery date of Monday", () => {
  expect(
    orderCake(
      { size: "small", with: ["box", "nuts", "frosting"] },
      morning(Tuesday)
    )
  ).toBeDeliveredOn(following(Monday));
});
