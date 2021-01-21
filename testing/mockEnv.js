import del from "del";
import fs from "fs";

const defaults = [
    ".env.test.local",
    ".env.test",
    ".env.local",
    ".env"
];
var window;

export function loadEnv() {
    process.argv = ["", "", "--dest", "."];
    const basePath = fs.realpathSync(process.cwd());
    window = require(`${basePath}/lib/cli`);
}

export function mockEnvFiles(files = defaults) {
    const path = fs.realpathSync(process.cwd());
    files.forEach(file => {
        const env = `
    FOO='${file}'
    BAR='foo'      
    ` + 'EXPAND=${NODE_ENV}';
        fs.writeFileSync(`${path}/${file}`, env);
    });
}

export function resetMocks() {
    del.sync([".env*"]);
    jest.resetModules();
    delete window._env;
    delete process.env.FOO;
    delete process.env.BAR;
    delete process.env.EXPAND;
}