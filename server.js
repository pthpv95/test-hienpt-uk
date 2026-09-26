const http = require('http');
const db = require('./db');

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const respond = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.url === '/health') {
    try {
      const { rows } = await db.query('SELECT now() AS db_time');
      respond(200, { status: 'ok2', db_time: rows[0].db_time, tm: 123 });
    } catch (err) {
      respond(500, { status: 'error', message: err.message });
    }
    return;
  }

  if (req.url === '/users') {
    try {
      const { rows } = await db.query('SELECT * FROM users ORDER BY id');
      respond(200, rows);
    } catch (err) {
      respond(500, { status: 'error', message: err.message });
    }
    return;
  }

  respond(404, { status: 'not_found' });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
