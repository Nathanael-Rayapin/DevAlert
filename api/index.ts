import { startHealthcheckScheduler, stopHealthcheckScheduler } from "./cron/scheduler";

// Start Cron Job
const cronJob = startHealthcheckScheduler();

const server = Bun.serve({
  port: 3000,
  fetch(_req) {
    return new Response('Healthcheck scheduler is running 🚀');
  },
});

console.log(`Listening on ${server.url}`);

// Stop Cron Job
function shutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}, shutting down...`);

  stopHealthcheckScheduler(cronJob);

  server.stop?.();
  process.exit(0);
}

process.on("SIGINT", shutdown);