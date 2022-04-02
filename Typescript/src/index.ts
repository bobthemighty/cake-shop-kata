import { PlainDate, PlainDateTime, PlainMonthDay } from "temporal-polyfill";

type Size = "small" | "big";
type Extra = "frosting" | "nuts" | "box";

const SATURDAY = 6;
const SUNDAY = 7;
const MONDAY = 1;

const NEW_YEAR_OPENING = new PlainMonthDay(1, 2);
const XMAS_CLOSING = new PlainMonthDay(12, 22);

function isFestivePeriod(d: PlainDate) {
  return (
    (XMAS_CLOSING.monthCode === d.monthCode && XMAS_CLOSING.day <= d.day) ||
    (NEW_YEAR_OPENING.monthCode === d.monthCode && NEW_YEAR_OPENING.day > d.day)
  );
}

export interface CakeRequirements {
  size: Size;
  with?: Array<Extra>;
}

type Process = (order: CakeRequirements, startDate: PlainDate) => PlainDate;

const nextDay = (d: PlainDate) => d.add({ days: 1 });

const isMorning = (d: PlainDateTime) => d.hour < 12;

const isFrostingDay = (d: PlainDate) => ![SUNDAY, MONDAY].includes(d.dayOfWeek);

const isBakingDay = (d: PlainDate) => ![SATURDAY, SUNDAY].includes(d.dayOfWeek);

const everyDay = () => true;

function doIt(
  leadTime: (c: CakeRequirements) => number,
  isWorkingDay: (d: PlainDate) => boolean
): (cake: CakeRequirements, start: PlainDate) => PlainDate {
  return (cake, start) => {
    let day = start;
    let remaining = leadTime(cake);
    while (remaining) {
      day = nextDay(day);
      if (isWorkingDay(day)) remaining--;
    }
    return day;
  };
}

const boxIt = doIt((c) => (c.with?.includes("box") ? 2 : 0), everyDay);

const bakeIt = doIt((c) => (c.size === "small" ? 1 : 2), isBakingDay);

const frostIt = doIt(
  (c) => (c.with?.includes("frosting") ? 2 : 0),
  isFrostingDay
);

const addNuts = doIt((c) => (c.with?.includes("nuts") ? 1 : 0), isBakingDay);

const latest = (...args: Array<PlainDate>) =>
  args.sort(PlainDate.compare).pop();

function combine(...args: Array<Process>): Process {
  return (c: CakeRequirements, start: PlainDate) =>
    args.reduce((acc, cur) => cur(c, acc), start);
}

function moveAfterXmas(process: Process): Process {
  return (order, orderTime) => {
    const plannedDate = process(order, orderTime);
    if (!isFestivePeriod(plannedDate)) return plannedDate;

    const startDate = NEW_YEAR_OPENING.toPlainDate({
      year: orderTime.year + 1,
    });
    return process(order, startDate);
  };
}

export function orderCake(
  order: CakeRequirements,
  orderTime: PlainDateTime
): PlainDate {
  const orderDay = orderTime.toPlainDate();
  const startDay = isMorning(orderTime) ? orderDay : nextDay(orderDay);
  const makeIt = moveAfterXmas(combine(bakeIt, frostIt, addNuts));

  return latest(makeIt(order, startDay), boxIt(order, orderDay));
}
