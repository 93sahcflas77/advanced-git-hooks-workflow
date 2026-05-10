const client = require('../config/redis');
const welcomeTemplates = require('../templates/welcome.templates');
const sendEmail = require('../utils/sendEmail');
const logger = require('../utils/logger/logger');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = async () => {
  logger.info('Worker Started...');

  while (true) {
    try {
      const job = await client.lPop('emailQueue');

      if (!job) {
        console.log('Queue Empty');

        await sleep(3000);

        continue;
      }

      const parsedJob = JSON.parse(job);

      const html = welcomeTemplates({
        username: parsedJob.email,
        ctaLink: parsedJob.ctaLink,
      });

      await sendEmail({
        to: parsedJob.email,
        subject: parsedJob.subject,
        text: 'Hello from Node.js',
        html,
      });

      logger.info(`Email sent to ${parsedJob.email}`);
    } catch (error) {
      logger.error(`Email worker err: ${error.message}`);

      await sleep(3000);
    }
  }
};
