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
const Saturday = Monday.add({ days: 5 });

test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
  const result = orderCake({ size: "small" }, afternoon(Monday));
  expect(result).toBeDeliveredOn(Wednesday);
});

test("A big cake, ordered on Monday, is delivered on Thursday", () => {
  const result = orderCake({ size: "big" }, afternoon(Monday));
  expect(result).toBeDeliveredOn(Thursday);
});

test("A small cake ordered on Saturday is delivered on Tuesday", () => {
  const result = orderCake({ size: "small" }, morning(Saturday));
  expect(result).toBeDeliveredOn(following(Tuesday));
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

test("An order for a small cake with a fancy box, placed on Monday morning, has a delivery date of Wednesday", () => {
  expect(
    orderCake({ size: "small", with: ["box"] }, morning(Monday))
  ).toBeDeliveredOn(Wednesday);
});

test("A small cake ordered on the 22nd of December has a delivery date of 3rd Jan", () => {
  const orderDate = PlainDateTime.from("2022-12-22");
  const deliveryDate = PlainDate.from("2023-01-03");

  expect(orderCake({ size: "small" }, orderDate)).toBeDeliveredOn(deliveryDate);
});

test("A small cake with a fancy box, ordered on the 22nd of December has a delivery date of 3rd Jan", () => {
  const orderDate = PlainDateTime.from("2022-12-22");
  const deliveryDate = PlainDate.from("2023-01-03");

  expect(
    orderCake({ size: "small", with: ["box"] }, orderDate)
  ).toBeDeliveredOn(deliveryDate);
});

test("A small cake ordered on the morning of the 21st of December has a delivery date of 22nd December (2 days lead time, from the 21st December)", () => {
  const orderDate = PlainDate.from("2022-12-21");
  const deliveryDate = PlainDate.from("2022-12-22");

  expect(orderCake({ size: "small" }, morning(orderDate))).toBeDeliveredOn(
    deliveryDate
  );
});

test("A small cake ordered on 22nd December 2021 has a delivery date of 4th Jan (2nd Jan is a Sunday)", () => {
  const orderDate = PlainDate.from("2021-12-22");
  const deliveryDate = PlainDate.from("2022-01-04");

  expect(orderCake({ size: "small" }, morning(orderDate))).toBeDeliveredOn(
    deliveryDate
  );
});
