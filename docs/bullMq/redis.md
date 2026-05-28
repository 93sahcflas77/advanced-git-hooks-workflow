// install package require redis client
// npm i ioredis

const Redis = require("ioredis");

const redisConfig = {
host: "127.0.0.1",
port: 6379,
retryStrategy(times) {
return Math.min(times \* 100, 3000)
},
reconnectOnError(){
return true
}
}

const queueConnection = new Redis({
...redisConfig,
maxRetriesPerRequest: 1
})

const workerConnection = new Redis({
...redisConfig,
maxRetriesPerRequest: null
})

const queueEventConnection = new Redis({
...redisConfig,
maxRetriesPerRequest: null
})

const flowproducerConnection = new Redis({
...redisConfig,
maxRetriesPerRequest: null
})

const jobschedulerConection = new Redis({
...redisConfig,
maxRetriesPerRequest: null
})

module.exports = {
queueConnection,
workerConnection,
queueEventConnection,
flowproducerConnection,
jobschedulerConection
}
