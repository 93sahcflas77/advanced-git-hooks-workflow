const { Worker, MetricsTime} = require("bullmq");
const { workerConnection } = require("./redisConnection");
const queue = require("./queue");

const worker = new Worker(
"emailQueue", // queue name
async job => { // dtat processing

        // Job Properties
        const jobId = job.id;                                       // Unique job identifier.
        const jobName = job.name;                                   // Job type.
        const joData = job.data                                     // Job all data
        job.data.email = "a@gmail.com"                              // Update:data
        const jobOption = job.opts;                                 // Job options.
        const jobQueueName = job.queueName;                         // Queue owner.
        const jobTimestam = job.timestamp;                          // Creation time.
        const jobProcessedOn = job.processedOn;                     // Start time.
        const jobfinishedOn = job.finishedOn;                       // Finish time.
        const jobProgress = job.progress;                           // Progress value.
        const jobAttemptsMade = job.attemptsMade;                   // Retry count.
        const jobDelay = job.delay;                                 // Delay job
        const jobFailedReason = job.failedReason;                   // Failure cause.
        const jobReturnvalue = job.returnvalue;                     // Worker result.

        // Job Method
        await job.updateData({                                      // Change payload.
            ...job.data,
            email: "chandan7073251686@gmail.com"
        })
        await job.updateProgress({                                  // Update progress.
            processed: 5,
            total: 100
        });
        await job.updateProgress("100");                            // again update progress
        await job.log("started");                                   // Add logs
        await job.remove();                                         // remove a job
        await job.retry("failed")                                   // Retry failed job.
        await job.discard()                                         // Disable retries.
        await job.promote()                                         // Move delayed → waiting.
        await job.changeDelay(3000);                                // Update delay.
        await job.moveToCompleted("done", job.token)                // Force move to complete.
        await job.moveToFailed(new Error(). job.token);             // Force move to fail.
        await job.moveToDelayed(Date.now()+5000, job.token);        // Move to extra delayed.
        await job.extendLock(job.token, 30000);                     // Extend processing lock.
        await job.getState();                                       // Read status. [waiting]
        await job.isCompleted();                                    // true if the job has completed.
        await job.isFailed();                                       // true if the job has failed.
        await job.isDelayed();                                      // true if the job is delayed.
        await job.isWaiting();                                      // true if the job is waiting.
        await job.isActive();                                       // true of the job is active.
        await job.waitUntilFinished();                              // Wait for result.
        await job.getParent();                                      // Parent Job Access
        await job.getChildrenValues();                              // Get this jobs children result values if any.
        await job.getDependencies();                                // Get children job keys if this job is a parent and has children.
        await job.removeChildDependency();                          // Removes child dependency from parent when child is not yet finished
        await job.moveToWaitingChildren();                          // Token to check job is locked by current worker

        await new Promise(resolve => {
            setTimeout(resolve, 5000)
        })

        console.log("Processing", joData)

        return {
            sucess: true
        }

    },
    {
        connection:{                                                // Connect Worker → Redis.
            host: "127.0.0.1",
            port: 6379
        },
        connection: workerConnection,                               // Connect Worker → Redis.
        metrics: {
            maxDataPoints: 1000,                                    // Store last 1000 metric records
            maxDataPoints: {
                // MetricsTime.ONE_HOUR,                               // Keep ~1 hour metrics
                // MetricsTime.ONE_DAY,                                // Store one day history
                // MetricsTime.ONE_WEEK*2                              // Store 14 days metrics
            }
        },
        concurrency: 5,                                             // Number of jobs processed simultaneously.
        autorun: true,                                              // Auto start processing. Default true, ex: autorun: false then await worker.run()  user thrn worker run
        lockDuration: 120000 ,                                      // 2 min  How long Worker owns a job.  start -> lock -> work -> unlock
        stalledInterval:  5000 ,                                    // Check interval for stuck jobs.  every 30 sec -> check dead workers
        maxStalledCount: 2,                                         // Retry stalled jobs.  attempt1 → crash | attempt2 → fail
        drainDelay: 10,                                             // Wait before polling empty queue. Queue empty -> sleep 5 sec -> check again  default value -> 5 [1-> lower and 10-> higher]
        skipLockRenewal:  false,                                    // Disable lock extension. default true job running ->  extend lock  ->  extend lock    value true then long job  -> lock expires  ->duplicate execution
        skipStalledCheck: false,                                    // Disable stalled detection.  default value false detect crashes  -> recover jobs  value true crashed job -> lost forever
        metrics: {                                                  // Collect Worker metrics.
        maxDataPoints: 500
        }

    }

)

// Worker Properties
const workerNaame = (worker.name); // Worker name.
const workerPotions = worker.opts; // Worker options.
const workerId = worker.id; // Worker identifier.
const waorkerConcurrency = worker.concurrency; // Number of parallel jobs.
const workeRrunning = worker.running; // Current state.

// Worker Methods
await worker.pause(); // Stop taking jobs.
await worker.resume(); // Resume processing.
await worker.close(); // Graceful shutdown. finish current job -> close
await worker.disconnect(); // Immediate disconnect. stop now
await worker.run(); // Start worker.
await worker.waitUntilReady(); // Wait Redis connection.
await worker.isRunning(); // Check state.
await worker.isPaused(); // Check pause.
await worker.getNextJob(); // Fetch next manually.
await worker.rateLimit(5000); // Pause temporarily.
await worker.delay(3000); // Delay worker.
await worker.emit("hello"); // Emits an event. Normally used by subclasses to emit events.
await worker.removeAllListeners(); // Removes all listeners, or those of the specified eventName.

// Worker Events
worker.on("completed", (job) => {} ) // Listen event.
worker.once("completed", () => {} ) // Listen once.
worker.off("completed", fn); // Remove listener.

// Event method
worker.on("completed", (job) => {} ) // complet
worker.on("failed", (job, error) => {} ) // failed
worker.on("active", (job) => {} ) // active
worker.on("progress", (job, p) => {} ) // progress
worker.on("paused", () => {} ) // paused
worker.on("resumed", () => {} ) // resumed
worker.on("error", (err) => {} ) // error
worker.on("drained", () => {} ) // drained Queue empty.
worker.on("closing", () => {} ) // closing
worker.on("closed", () => {} ) // closed
