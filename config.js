module.exports = {
  mongodb: {
    connections: [{
      name: 'mongo',
      adapter: require('node-norm-mongo'),
      connectionString: 'mongodb://alfath:password@ds129926.mlab.com:29926/instagram',
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
