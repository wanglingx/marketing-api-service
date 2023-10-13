const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const routes = require('./src/routes/router');
const server = express();

// Load config
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Middleware for parsing requests
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS and security headers
server.use(cors());
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      imgSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Logging (only in development)
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}

server.use(routes);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`[INFO] Server started on port ${port}`);
  console.log(`[HOST] http://localhost:${port}/`);
});
