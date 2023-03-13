import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default {
    input: './src/index.js',
    output: {
        file: './dist/utils.min.js',
        format: 'cjs',
        name: 'bundle'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs(),
        uglify()
    ],
    external: ['axios', 'lodash.debounce', 'react']
}