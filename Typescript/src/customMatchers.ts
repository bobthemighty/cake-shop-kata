import { PlainDate, PlainDateTime } from "temporal-polyfill";

expect.extend({
  toBeDeliveredOn(received: PlainDateTime, expected: PlainDate) {
    const pass = expected.equals(received);
    const message = `expected ${received.toLocaleString()} to equal ${expected.toLocaleString()}`;

    return {
      message: () => message,
      pass,
    };
  },
});
