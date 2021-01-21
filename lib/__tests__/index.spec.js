const env =require('../index');
const window = require('../cli')

beforeEach(() => {
  // Reset mocks
  window._env = undefined;
  process.env.FOO = undefined;
  process.env.BAR = undefined;
  process.env.FOO = undefined;
  process.env.BAR = undefined;
});

test("returns a safe value from the browser", () => {
  window._env = {
    FOO: "bar"
  };
  expect(env("FOO")).toBe("bar");
});

test("returns a safe value from the server", () => {
  process.env.FOO = "bar";
  expect(env("FOO")).toBe("bar");
});

test("does not return a non-safe value from the browser", () => {
  window._env = {
    FOO: "bar"
  };
  expect(env("FOO")).toBeUndefined();
});

test("does not return a non-safe value from the server", () => {
  process.env.FOO = "bar";
  expect(env("FOO")).toBe("undefined");
});

test("returns NODE_ENV from the browser", () => {
  window._env = {
    NODE_ENV: "development"
  };
  expect(env("NODE_ENV")).toBe("development");
});

test("returns NODE_ENV from the server", () => {
  expect(env("NODE_ENV")).toBe("test");
});

test("returns entire safe environment from the browser", () => {
  window._env = {
    NODE_ENV: "test",
    FOO: "bar",
    BAR: "foo"
  };
  expect(env()).toEqual({
    NODE_ENV: "test",
    FOO: "bar",
    BAR: "foo"
  });
});

test("returns entire safe environment from the server", () => {
  process.env.FOO = "bar";
  process.env.BAR = "foo";
  expect(env()).toEqual({
    NODE_ENV: "test",
    FOO: "bar",
    BAR: "foo"
  });
});

test("returns undefined when variable does not exist in the browser", () => {
  expect(env("BAM_BAM")).toBe(undefined);
});

test("returns undefined when variable does not exist in the server", () => {
  expect(env("BAM_BAM_BAM")).toBe(undefined);
});
