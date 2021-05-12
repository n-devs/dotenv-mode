
import commonjs from 'rollup-plugin-commonjs';
import hashbang from 'rollup-plugin-hashbang';
import dts from 'rollup-plugin-dts';

export default [
    {
      input: "lib/cli-index.js",
      output: {
        file: "dist/cli-index.js",
        format: "cjs"
      },
      external: ["shelljs", "yargs"]
    },
    {
      input: "lib/index.js",
      output: {
        file: "dist/index.js",
        format: "cjs"
      },
      plugins: [
        hashbang(),
        commonjs()
      ]
    },
    {
      input: "lib/cli.js",
      output: {
        file: "dist/cli.js",
        format: "cjs"
      },
      plugins: [
        hashbang()
      ]
    },
    {
      input: "lib/types.d.ts",
      output: [{ file: "dist/types.d.ts", format: "es" }],
      plugins: [dts()],
    },
  

  ];