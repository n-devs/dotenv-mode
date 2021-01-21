const { loadEnv, mockEnvFiles, resetMocks } = require("../../testing/mockEnv");
const window = require('../cli')
const env = require('../index');

// afterEach(() => {
//     resetMocks();
// });

test(".env.test.local has 1st priority", () => {
    mockEnvFiles([".env.test.local"]);
    loadEnv();
    expect(env("FOO")).toBe(".env.test.local");
    resetMocks();
});

test(".env.test has 2nd priority", () => {
    mockEnvFiles([".env.test"]);
    loadEnv();
    expect(env("FOO")).toBe(".env.test");
    resetMocks();
});

test(".env has 3rd priority", () => {
    mockEnvFiles([".env"]);
    loadEnv();
    expect(env("FOO")).toBe(".env");
    resetMocks();
});

test(".env.local has 3rd priority when not in test env", () => {
    process.env.NODE_ENV = 'development'
    mockEnvFiles([".env.local", ".env"]);
    loadEnv();
    expect(env("FOO")).toBe(".env.local");
    resetMocks();
});

// test("can expand env vars", () => {
//     mockEnvFiles();
//     loadEnv();
//     expect(window._env.EXPAND).toBe(process.env.NODE_ENV);
//     resetMocks();
// });