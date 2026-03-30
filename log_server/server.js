const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const logsDir = path.join(__dirname, 'logs.json');
if (!fs.existsSync(logsDir)) {
  fs.writeFileSync(logsDir, '[]');
}

app.post('/logs', (req, res) => {
  const log = req.body;
  console.log('Received log:', log);

  const logs = JSON.parse(fs.readFileSync(logsDir, 'utf-8'));
  logs.push(log);

  fs.writeFileSync(logsDir, JSON.stringify(logs, null, 2));

  res.status(200).send('Log received');
});

app.listen(port, () => {
  console.log(`Log server is running on http://localhost:${port}`);
});
