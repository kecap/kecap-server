const Bundle = require('bono');
const jwt = require('jsonwebtoken');

class Api extends Bundle {
  constructor () {
    super();
    this.get('/', ctx => 'hello');
    this.get('/history', this.history.bind(this));
    this.post('/billing', this.billing.bind(this));
  }

  history (ctx) {
    throw new Error('Unimplemented');
  }

  async billing (ctx) {
    const manager = ctx.norm;
    let data = await ctx.parse();
    try {
      let result = JSON.parse(data);
      return manager.runSession(async (session) => {
        // await session.factory('billing').insert(result).save();
        // return { success: true, message: 'data has been saved' }
      });
    } catch (error) {
      
    }
  }

}

module.exports = Api;
