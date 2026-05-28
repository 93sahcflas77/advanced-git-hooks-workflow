// install package require a bull-bord
// npm i @@bull-board/api
// npm i @bull-board/express
// npm i bullmq

const { createBullBoard } = require("@bull-board/api"); // Core backend package
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter"); // BullMQ connector
const { ExpressAdapter } = require("@bull-board/express"); // Express integration
const emailQueue = require("./queue"); // queue import

const serverAdapter = new ExpressAdapter(); // create a express integration
serverAdapter.setBasePath("/admin/queues"); // show bull-bord this path

// this line use in server.js and app.js and entry point
// app.use("/admin/queues", serverAdapter.getRouter());

const board = createBullBoard({ // create bull-board
queues: [
new BullMQAdapter(emailQueue, { // connect bullmq to bull-board
readOnlyMode: false, // View only , no retry, no delay, no delete, no pause
allowRetries: true, // allow retry failed job
description: "Email sent", // Display queue description
allowCompletedRetries: false // Retry complete job
})
],
serverAdapter
})

board.addQueue(new BullMQAdapter(paymentQueue)); // add queues dynamically
board.removeQueue("paymentQueue"); // Remove queus
board.setQueues([new BullMQAdapter(smsQueue)]); // Replace all queue
board.replaceQueues([notificationQueue]); // update exiting queues

module.exports = serverAdapter
