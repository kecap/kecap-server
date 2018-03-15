const fs = require('fs');
const {
  MONGO_CONNECTION_STRING,
  SECRET
} = process.env;

module.exports = {
  mongodb: {
    connections: [{
      name: 'mongo',
      adapter: require('node-norm-mongo'),
      connectionString: MONGO_CONNECTION_STRING,
      schemas: [
        {
          name: 'userSession',
        },
      ],
    }],
  },
  diskdb: {
    connections: [{
      name: 'disk',
      adapter: require('node-norm/adapters/disk'),
      schemas: [
        {
          name: 'myuser',
        },
      ],
    }],
  },
  secret: SECRET || 'rahasia',
  ssl: {
    key: fs.readFileSync('./certificate/server.pem', 'utf8'),
    cert: fs.readFileSync('./certificate/server.crt', 'utf8'),
  }
};
