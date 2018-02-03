// test/runner.js
const spawn = require('@537/spawn');
const assert = require('assert');

(async () => {
  // spawn carries process.env to its child process
  process.env.NODE_ENV = 'production';
  let prod = await spawn('node', ['-r', './config.js', 'test/report.js']);
  assert.ok(prod === 'production\n');

  process.env.NODE_ENV = 'staging';
  let stage = await spawn('node', ['-r', './config.js', 'test/report.js']);
  assert.ok(stage === 'staging\n');

  process.env.NODE_ENV = 'development';
  let dev = await spawn('node', ['-r', './config.js', 'test/report.js']);
  assert.ok(dev === 'development\n');

  process.env.NODE_ENV = 'development';
  process.env.UP_STAGE = 'foo';
  let ignore_up = await spawn('node', ['-r', './config.js', 'test/report.js']);
  assert.ok(ignore_up === 'development\n');

  delete process.env.NODE_ENV;
  process.env.UP_STAGE = 'foo';
  let no_node_env = await spawn('node', ['-r', './config.js', 'test/report.js']);
  assert.ok(no_node_env === 'production\n');

  delete process.env.NODE_ENV;
  delete process.env.UP_STAGE;
  let no_env = await spawn('node', ['-r', './config.js', 'test/report.js']);
  assert.ok(no_env === 'development\n');

  process.exit(0);
})();
