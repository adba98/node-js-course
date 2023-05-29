const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users.routes.js'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
