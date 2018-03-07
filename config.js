const {
  MONGO_CONNECTION_STRING,
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
};
