// Super minimal server - no database
const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  console.log('Request received');
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});

// Keep alive
setInterval(() => {
  console.log('Server alive...');
}, 5000);
