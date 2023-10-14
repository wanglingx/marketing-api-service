const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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

//Sessions with MongoDB store
server.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

const connectDB = require('./config/connector'); 
connectDB(); 


server.use(routes);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`[INFO] Server started on port ${port}`);
  console.log(`[HOST] http://localhost:${port}/`);
});
