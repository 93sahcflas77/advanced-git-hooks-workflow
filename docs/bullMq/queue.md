const { Queue, QUEUE_EVENT_SUFFIX } = require("bullmq");
const { queueConnection, queueEventConnection } = require("./redis");

const queue = new Queue("emailQueue",
{
connection: {
host: "127.0.0.1",
port: 6379
},
connection: queueConnection,
}
)

// Queue Properties
const queueName = queue.name; // Queue name.
const queueOptions = queue.opts; // Queue options.
const queueKeys = queue.keys // Redis keys.
const queueJobsOpts = queue.jobsOpts // Default job options.
const queueToken = queue.token // Queue token.
const queueClient = queue.client // Returns Redis client.
const queueDefaultJobOptions = queue.defaultJobOptions // Default job options.
const queueRedisVersion = queue.redisVersion // redisVersion
const queueMetaVakues = queue.metaValues // meta value

// Queue Methids
await queue.setGlobalConcurrency(4); // set global limit only 4 job working
await queue.removeGlobalConcurrency(); // Removing Global concurrceny
await queue.setGlobalRateLimit(5, 6000); // Global Rate limit controls jobs PER TIME Not simultameous jobs
await queue.removeGlobalRateLimit(); // remove a rate limit
const ttl = await queue.getRateLimitTtl(); // add a Rate limiting Geting current TTL
await queue.add("queueName", // add a job
{
email: "chandan thakur",
type: "normal"
},
{
repeat: {
every: 5000, // Run repeatedly in milliseconds. 5s
pattern: "_/5 _ \* \* _", // Cron schedule. minute hour day month weekday  
 limit: 10, // Stop after N executions.
startDate: new Date("2026-12-01"), // Start scheduling later. [every + statrDate ]
endDate: new Date("2026-12-31"), // Stop scheduling after a date. [every + endDate]
tz: "Asia/Kolkata", // Timezone
offset: 10000, // Delay schedule start.
immediately: true, // Run once immediately, then repeat.
count: 2, // Current execution count. Usually do not set manually.
key: "daily-task" // Custom repeat identifier.
},
removeOnComplete: { // Complete job remove automatically this condition true [value: true, 2]:- true - complete and revove, 2 - two job complete then remove
age: 3600,
count: 1000
},
removeOnFail: {
age: 24 _ 3600 // Fail job remove automatically this condition true [value: true, 2]:- true - fail and revove, 2 - two job fail then remove
},
delay: 0, // bullmq supports delayed execution
priority: 3, // job important
attempts: 5, // retry count
backoff: { // retry stratgy
type: "exponential",
delay: 1000
},
jobId: `queue-${Date.now()}`, // unique jobs
}
)
await queue.addBulk([ // add a job bulk
{
name: "queueName", // queue name
data: { // queue data
email: "urgent@gmail.com",
type: "urgent"
},
opts: { // queue options other same a add all options
priority: 5
}
},
{
name: "queueName", // queue name
data: { // queue data
email: "urgent@gmail.com",
type: "urgent"
},
opts: { // queue options other same a add all options
priority: 2
}
}
])
await queue.pause(); // Pauses the processing of this queue globally.
await queue.isPaused(); // Returns true if the queue is currently paused.
await queue.resume(); // Resumes the processing of this queue globally.
await queue.remove(); // Removes the given job from the queue as well as all its dependencies
await queue.drain(); // Drains the queue, i.e., removes all jobs that are waiting or delayed, but not active, completed or failed.
await queue.clean(10000,100,"completed"); // Cleans jobs from a queue. Similar to drain but keeps jobs within a certain grace period.
await queue.obliterate(); // Destroy everything.
await queue.retryJobs({count: 3}); // Retry all the failed or completed jobs.
await queue.removeRepeatable("queueName","_/5 _ \* \* \*"); // Deletes scheduled configuration.
await queue.removeRepeatableByKey(job[0].key); // Removes a repeatable job by its key. Note that the key is the one used to store the repeatable job metadata and not one of the job iterations themselves. You can use "getRepeatableJobs" in order to get the keys.
await queue.count(); // Total waiting jobs.
await queue.getJob("jobId"); // Fetch one job getJob(jod_id)
await queue.getJobs(["completed", "failed"]); // Get many jobs.
await queue.getJobState("jobId"); // job status
await queue.getJobCounts("completed", "failed"); // counts for job
await queue.getJobCountByTypes("completed"); // count by types job
await queue.getWaiting(); // return a waiting job
await queue.getWaitingCount(); // Returns the number of jobs in waiting or paused statuses.
await queue.getActive(); // Returns the jobs that are in the "active" status.
await queue.getActiveCount(); // Returns the number of jobs in active status.
await queue.getCompleted(); // Returns the jobs that are in the "completed" status.
await queue.getCompletedCount(); // Returns the number of jobs in completed status.
await queue.getFailed(); // Returns the jobs that are in the "failed" status.
await queue.getFailedCount(); // Returns the number of jobs in failed status.
await queue.getDelayed(); // Returns the jobs that are in the "delayed" status.
await queue.getDelayedCount(); // Returns the number of jobs in delayed status.
await queue.getWaitingChildren(); // Returns the jobs that are in the "waiting-children" status. I.E. parent jobs that have at least one child that has not completed yet.
await queue.getWaitingChildrenCount(); // Returns the number of jobs in waiting-children status.
await queue.getRepeatableJobs(); // Get all repeatable meta jobs.
await queue.getQueueEvents(); // Get queue events list related to the queue. Note: GCP does not support SETNAME, so this call will not work
await queue.getWorkers(); // Get the worker list related to the queue. i.e. all the known workers that are available to process jobs for this queue. Note: GCP does not support SETNAME, so this call will not work
await queue.getMetrics(); // Get queue metrics related to the queue.
await queue.addJobLog("jobId", 10); // Logs one row of job's log data.
await queue.getJobLogs("jobId"); // Returns the logs for a given Job.
await queue.trimEvents(100); // Trim the event stream to an approximately maxLength.
await queue.waitUntilReady(); // none
await queue.getMeta(); // Get global queue configuration.
await queue.close(); // Close the queue instance.
await queue.disconnect(); // Force disconnects a connection.
await queue.repeat // Access repeat manager. Repeatable jobs are managed through this accessor.

// Event Methods
queue.on("error", (e) => { // Listen continuously.
console.log(e);
})
queue.once("progress", () => {}) // Listen only one time.
queue.off( "completed", handler); // Remove listener.
queue.emit( event, data ); //Manually trigger event.

module.exports = emailQueue;
