// import del from "del";
// import fs from "fs";
const del = require("del");
const fs = require("fs");
const defaults = [
    ".env.test.local",
    ".env.test",
    ".env.local",
    ".env"
];
var window;

function loadEnv() {
    process.argv = ["", "", "--dest", "."];
    const basePath = fs.realpathSync(process.cwd());
    window = require(`${basePath}/lib/cli`);
}

function mockEnvFiles(files = defaults) {
    const path = fs.realpathSync(process.cwd());
    files.forEach(file => {
        const env = `
    FOO='${file}'
    BAR='foo'      
    ` + 'EXPAND=${NODE_ENV}';
        fs.writeFileSync(`${path}/${file}`, env);
    });
}

function resetMocks() {
    del.sync([".env*"]);
    jest.resetModules();
    delete window._env;
    delete process.env.FOO;
    delete process.env.BAR;
    delete process.env.EXPAND;
}


exports.loadEnv = loadEnv
exports.mockEnvFiles = mockEnvFiles
exports.resetMocks = resetMocks