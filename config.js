const dotenv = require('dotenv');
const is_up = !!process.env.UP_STAGE;
const node_env = process.env.NODE_ENV;
// always follow NODE_ENV, force production if not set on UP, development if not set locally
const env = node_env || (is_up ? 'production' : null) || 'development';
const path = `.env.${env}`;
dotenv.config({ path, silent: env === 'production' });
