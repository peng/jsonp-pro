import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const format = ['amd', 'cjs', 'iife', 'esm', 'umd', 'system'];

const configs = [];
format.forEach(item => {
  const config = {
    input: './src/index.js',
    output: {
      name: 'jsonp',
      file: `./dist/jsonp.${item}.js`,
      format: item
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  };
  const proConfig = {
    input: './src/index.js',
    output: {
      name: 'jsonp',
      file: `./dist/jsonp.${item}.min.js`,
      format: item
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  };
  configs.push(config);
  configs.push(proConfig);
});

export default configs;
