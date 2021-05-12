'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crossSpawn = _interopDefault(require('cross-spawn'));
var fs = _interopDefault(require('fs'));
var minimist = _interopDefault(require('minimist'));
var dotenv = _interopDefault(require('dotenv'));

const argv = minimist(process.argv.slice(2));

const NODE_ENV = process.env.NODE_ENV || "development";

function writeBrowserEnvironment(env) {
  const base = fs.realpathSync(process.cwd());
  const dest = argv.d || argv.dest || "public";
  const debug = argv.debug;
  const path = `${base}/${dest}/__ENV.js`;
  console.info("react-env: Writing runtime env", path);
  if(debug) {
    console.debug(`react-env: ${JSON.stringify(env, null, 2)}`);
  }
  const populate = `window.__ENV = ${JSON.stringify(env)};`;
  fs.writeFileSync(path, populate);
}

function getEnvironment() {
  return Object.keys(process.env)
    .filter(key => /^/i.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      { NODE_ENV: NODE_ENV }
    );
}

function resolveFile(file) {
  const path = fs.realpathSync(process.cwd());
  return `${path}/${file}`;
}

function getEnvFiles() {
  let appendFiles = [];
  if (argv.env) {
    if (typeof argv.env === "string") {
      appendFiles = [argv.env];
    } else {
      appendFiles = argv.env;
    }
  }
  return [
    ...appendFiles,
    resolveFile(`.env.${NODE_ENV}.local`),
    resolveFile(`.env.${NODE_ENV}`),
    NODE_ENV !== "test" && resolveFile(".env.local"),
    resolveFile(".env")
  ].filter(Boolean);
}

const dotenvFiles = getEnvFiles();

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile
    });
  }
});

const window= {};

window._env = getEnvironment();

writeBrowserEnvironment(window._env);

if (argv._[0]) {
  crossSpawn(argv._[0], argv._.slice(1), { stdio: "inherit" }).on("exit", function(
    exitCode
  ) {
    process.exit(exitCode);
  });
}

var cli = {

};

const NODE_ENV$1 = process.env.NODE_ENV || "development";

// const window = require(`${process.cwd()}/env.${NODE_ENV}.js`)



// if (!window) {
//   require("./cli")
// }

function isBrowser() {
  return !!(typeof cli !== "undefined" && cli._env)
}

function getFiltered() {
  return Object.keys(process.env)
    .filter(key => /^/i.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      { NODE_ENV: NODE_ENV$1 }
    );
}

function env(key = "") {
  const safeKey = `${key}`;
  if (isBrowser() && key === "NODE_ENV") {
    return cli._env.NODE_ENV;
  }
  if (isBrowser()) {
    return key.length ? cli._env[safeKey] : cli._env;
  }
  if (key === 'NODE_ENV') {
    return process.env.NODE_ENV;
  }
  return key.length ? process.env[safeKey] : getFiltered();
}

var lib = env;

module.exports = lib;
