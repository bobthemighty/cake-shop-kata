import { PlainDate } from "temporal-polyfill";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDeliveredOn(expected: PlainDate): CustomMatcherResult;
    }
  }
}
