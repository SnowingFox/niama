const { config } = require('dotenv');

module.exports = ({ ctx, resolve }) => config({ path: resolve.app(`.env${ctx.dev ? '.dev' : ''}`) });
