const { QueueEvents } = require("bullmq");
const { queueEventConnection } = require("./redisConnection")

const events = new QueueEvents("emailQueue", { // connect to redis server
connection: queueEventConnection
});

// QueueEvents Properties
const evenetName = events.name; // Queue name.
const eventOption = events.opts; // Configuration.
const eventRunning = events.running; // Current state.
const eventClient = events.client; // Redis connection.

// QueueEvents Methods
await events.waitUntilReady(); // Wait for Redis.
await events.close(); // Gracefully close. connected -> close
await events.disconnect() // Force disconnect.

events.on("completed", ({ jobId }) => {} );
events.once("completed", ({jobId}) => {} );
events.off("completed", () => {} );
events.emit("completed", "hello");
events.removeAllListeners();
events.on("completed", ({jobId, returnvalue}) => {} ) // completed Triggered after success.  
events.on("failed", ({jobId, failedReason}) => {} ) // failed Triggered after failure.
events.on("active", ({jobId, prev}) => {} ) // active Job started.
events.on("waiting", ({jobId, prev}) => {} ) // waiting Waiting queue.
events.on("delayed", ({jobId, delay}) => {} ) // delayed Delayed.
events.on("progress", ({jobId, data}) => {} ) // progress Progress updates.
events.on("paused", () => {} ) // paused
events.on("resumed", () => {} ) // resumed
events.on("removed", ({jobId, prev}) => {} ) // removed Job removed.
events.on("drained", ({}) => {} ) // drained Queue empty.
events.on("cleaned", ({count}) => {} ) // // cleaned Cleanup finished.
