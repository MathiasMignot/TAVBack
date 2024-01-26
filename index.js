require('dotenv').config();
const debug = require('debug')('tmm:httpserver');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT ?? 3000;;

const server = http.createServer(app);

server.listen(PORT, () => {
  debug(`Server ready on http://localhost:${PORT}`);
});