const Bundle = require('bono');
let jwtStrategy = require('bono-auth/strategies/jwt')({ secret: 'rahasia' });

class AuthBundle extends Bundle {
  constructor ({ auth, secret }) {
    super(auth);
    auth.use(jwtStrategy);
    this.get('/', ctx => 'test');
    this.post('/register', this.register.bind(this));
    this.post('/login', this.login.bind(this));
  }

  async register (ctx) {
    const manager = ctx.norm;
    let { email, username, fullname, password } = await ctx.parse();
    return manager.runSession(async (session) => {
      let user = { email, username, fullname, password };
      await session.factory('myuser').insert(user).save();
      return { success: true, message: 'data has been saved' }
    });
  }

  async login (ctx) {
    const manager = ctx.norm;
    let { username, password } = await ctx.parse();
    return manager.runSession(async (session) => {
      let data = await session.factory('myuser', { username }).single();
      if (!data) {
        throw new Error('Data Not Found');
      }
      if (username === data.username && password === data.password) {
        let token = jwtStrategy.createToken({ username });
        return token;
      }
      throw new Error('Username or password wrong');
    });
  }
}

module.exports = AuthBundle;
