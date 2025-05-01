import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import external from 'rollup-plugin-peer-deps-external'
import styles from "rollup-plugin-styles";
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace';
import pkg from './package.json'
export default {
    external: ['react', 'react-dom', '@mui/material', '@mui/icons-material',  "@material-ui/core", "@material-ui/icons", "@material-ui/lab"],
    input: './src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            plugins: [
                terser()
            ]
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            plugins: [
                terser()
            ]
        }
    ],
    // external: ['react', 'react-dom'],
    plugins: [
        external(),
        terser(),
        // postcss({
        //     modules: true
        // }),
        // url(),
        replace({
            values: { 'import.meta.env': false, 'process.env.NODE_ENV': JSON.stringify('production') },
            preventAssignment: true
        }),
        json(),
        nodeResolve({
            browser: true,
            extensions: [".js"],
        }),
        commonjs({ exclude: './src/**' }),
        babel({
            babelHelpers: 'bundled',
            presets: ["@babel/preset-react", "@babel/preset-env"],
        }),
        styles(),
    ]
}











