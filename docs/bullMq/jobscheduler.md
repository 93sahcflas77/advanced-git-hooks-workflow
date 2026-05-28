const { JobScheduler } = require("bullmq");
const { jobschedulerConection } = require("./redisConnection");

// Constructor
const scheduler = new JobScheduler({ // connect to redis server
jobschedulerConection
})

// Properties
const schedulerOptions = scheduler.opts; // Configuration.
const schedulerClient = scheduler.client; // Redis connection.
const schedulerClosing = scheduler.closing; // Closing state.

// Methods
await scheduler.upsertJobScheduler( // Create schedule or Update existing
"daily-email",
{
every: 5000, // this are same to queue repeat
pattern: "_ 8 _ \* \*",
limit: 10,
startDate: Date.now() + 5000,
endDate: "2026-12-31",
tz: "Asia/Kolkata",
immediately: true
},
{
name: "sendEmail", // this are same to queue data add
data: {
email: "chandan7073251686@gmail.com"
},
opts: { // this are same to queue ptions  
 attempts: 5
}
},
)
await scheduler.removeJobScheduler("daily-email"); // Remove Schedule Output: scheduler removed
await scheduler.getJobSchedulers(); // Read schedules.
await scheduler.getScheduler("daily-email"); // Read one.
await scheduler.pause(); // Pause scheduler.
await scheduler.resume(); // resume
await scheduler.waitUntilReady(); // Wait Redis.
await scheduler.close(); // Graceful shutdown.
await scheduler.disconnect() // Force disconnect.
