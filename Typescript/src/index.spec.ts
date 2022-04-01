import * as Temporal from "temporal-polyfill";

import { order } from ".";

const Monday = Temporal.PlainDateTime.from("2022-04-04T14:00:00");
const Wednesday = Monday.add({ days: 2 });

describe("When a small cake is ordered on Monday afternoon", () => {
  const deliveryDate = order("small", Monday);

  it("should be delivered Wednesday", () => {
    expect(deliveryDate).toEqual(Wednesday);
  });
});
