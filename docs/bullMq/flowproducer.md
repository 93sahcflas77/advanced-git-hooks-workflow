const { FlowProducer } = require("bullmq");
const { flowproducerConnection } = require("./redisConnection");

// Constructor
const flow = new FlowProducer({ // connect to redis server
flowproducerConnection
})

// Properties
const dlowOptions = flow.opts; // Configuration
const flowClosing = flow.closing; // Closing state.
const flowClient = flow.client; // Redis connection.

// Methods
await flow.add({ // Single dependency tree
name: "parent",
queueName: "emailQueue", // root queue name
data: {
year: 2025
},
children: [ // Defines dependency jobs.
{
name: "users",
queueName: "emailQueue", // Target queue. Which queue stores the job
data: {}, // Job payload.
opts: { // Job options. Aleardy know in queue

            }
        },
        {
            name: "order",
            queueName: "emailQueue",
            data: {},
            opts: {
                failParentOnFailure: true,                               // If child fails parent also fails
                continueParentOnFailure: true,                           // Parent runs even if child fails
                removeDependencyOnFailure: true,                         // Failed child removed from dependency list, Parent can continue.
                ignoreDependencyOnFailure: true                          // Ignore failed dependency completely
            }
        }
    ]

})
await flow.addBulk([ // Multiple dependency trees
{
name: "A",
queueName: "p",
data: {

        },
        children: [
            {
                name: "",
                queueName: "",
                data: {}
            },
            {
                name: "",
                queueName: "",
                data: {}
            }
        ]
    },
     {
        name: "B",
        queueName: "p",
        data: {

        },
        children: [
            {
                name: "",
                queueName: "",
                data: {}
            },
            {
                name: "",
                queueName: "",
                data: {}
            }
        ]
    }

])

await flow.close(); // Close connection.
await flow.disconnect(); // Force disconnect.
await flow.waitUntilReady(); // Wait Redis.

await flow.getFlow({ // Flow: users, orders ---> parent..
id: "root-job-id",
queueName: "root queue",
depth: "limit recovery",
maxChildren: "limit childern count"
});
