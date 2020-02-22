const CronJob = require("cron").CronJob;
const { getDashboardMetrics } = require("../graphql/resolvers/Company");
import { pubsub } from "./pubsub";
const NEW_METRICS_ADDED = "NEW_METRICS_ADDED";

function getDate() {
  var d = new Date();
  return d.toString();
}
/**
 * Every minutes
 */
new CronJob(
  "* 1 * * *",
  async function() {
    console.log("Cron job: updating metrics @ " + getDate());
    const updatedMetrics = await getDashboardMetrics();
    await pubsub.publish(NEW_METRICS_ADDED, {
      updatedMetrics
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
