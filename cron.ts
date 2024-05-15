import cron from "node-cron";
const EVERY_DAY_AT_TEN = "0 4 * * *";
const EVERY_DAY_AT_ELEVEN = "0 5 * * *";
const EVERY_DAY_AT_TWELVE = "0 6 * * *";
const EVERY_TWO_MINS = "* * * * *";
import * as PolicyServices from "./src/controllers/policy/policy.service";
import * as TwilioService from "./src/controllers/twilio/twilio.service";
cron.schedule(
  EVERY_DAY_AT_TEN,
  () => {
    PolicyServices.sendMessageBeforeOneMonth();
  },
  {
    name: "REMIND_CUSTOMERS",
    scheduled: true,
    timezone: "Etc/UTC",
    runOnInit: true,
  }
);

cron.schedule(
  EVERY_DAY_AT_ELEVEN,
  () => {
    PolicyServices.sendMessageBeforeSevenDays();
  },
  {
    name: "REMIND_CUSTOMERS",
    scheduled: true,
    timezone: "Etc/UTC",
    runOnInit: false,
  }
);
cron.schedule(
  EVERY_DAY_AT_TWELVE,
  () => {
    PolicyServices.sendMessageBeforeTwoDays();
  },
  {
    name: "REMIND_CUSTOMERS",
    scheduled: true,
    timezone: "Etc/UTC",
    runOnInit: false,
  }
);

cron.schedule(
  EVERY_DAY_AT_TEN,
  () => {
    TwilioService.dummySendMessage();
  },
  {
    name: "REMIND_CUSTOMERS",
    scheduled: true,
    timezone: "Etc/UTC",
    runOnInit: false,
  }
);

const start = () => {
  cron.getTasks().forEach((task: any) => {
    task.start();
  });
};

export default { start };
