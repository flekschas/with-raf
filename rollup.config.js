import { terser } from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';

const config = (file, format, plugins) => ({
  input: 'src/index.js',
  output: {
    name: 'withRaf',
    format,
    file,
    globals: {
      'camera-2d': 'withRaf',
    },
  },
  plugins,
});

export default [
  config('dist/with-raf.js', 'umd', [buble()]),
  config('dist/with-raf.min.js', 'umd', [buble(), terser()]),
];
