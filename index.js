// Inicializa o Ghost CMS programaticamente
const ghost = require("ghost");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 2368;

const config = {
  url: process.env.url || `http://localhost:${PORT}`,
  database: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "/content/data/ghost.db")
    }
  },
  server: {
    port: PORT,
    host: "0.0.0.0"
  },
  paths: {
    contentPath: path.join(__dirname, "/content/")
  }
};

ghost(config)
  .then(ghostServer => {
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start();
  });