/**
 * Application Entry point
 * @type {createApplication}
 */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
import graphqlHTTP from "express-graphql";
import { createServer } from "http";
import compression from "compression";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import expressPlayground from "graphql-playground-middleware-express";
import cors from "cors";
import "./config/cron";
const schema = require("./graphql");
const path = require("path");
const { mongoDBUrl } = require("../config");
/**
 * Create Express server.
 */
const app = express();

const server = createServer(app);
var corsOptionsDelegate = function(req, callback) {
  const corsOptions = {
    credentials: true,
    maxAge: 600
  };

  callback(null, corsOptions); // callback expects two parameters: error and options
};
/**
 * Connect to MongoDB.
 */
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.connection.on("error", function() {
  console.log("MongoDB error connection to: " + mongoDBUrl);
  process.exit(1);
});
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected on: " + mongoDBUrl);
});

/**
 * Express configuration.
 */
app.use(compression());
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 5000
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
//CORS
app.use(cors(corsOptionsDelegate));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
/**
 * GraphQL server
 */
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split("\n") : [],
      path: error.path
    })
  })
);

app.get(
  "/playground",
  expressPlayground({
    endpoint: "/graphql",
    subscriptionsEndpoint: "/subscriptions"
  })
);

app.use(express.static(path.resolve(__dirname, "build")));
/**
 * Start Express server.
 */
server.listen(process.env.PORT || 4444, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
  console.log(`Process Node: ${process.env.NODE_ENV}`);
  console.log(
    `GraphQL Server is now running on localhost:${process.env.PORT}/graphql`
  );
  console.log(
    `Subscriptions are running on localhost:${process.env.PORT}/subscriptions`
  );
});

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// shut down server
function shutdown() {
  server.close(function onServerClosed(e) {
    if (e) {
      console.error(e);
      process.exitCode = 1;
    }
    process.exit();
  });
}

module.exports = app;
