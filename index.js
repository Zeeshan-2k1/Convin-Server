const jsonServer = require('json-server');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const fileupload = require('express-fileupload');

const server = jsonServer.create();
const router = jsonServer.router('/tmp/db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);
server.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp',
  })
);

const PORT = 3004;

fs.writeFile(
  '/tmp/db.json',
  JSON.stringify({ buckets: [], history: [] }),
  (err) => {}
);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
