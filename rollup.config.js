import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
// import external from 'rollup-plugin-peer-deps-external'
import styles from "rollup-plugin-styles";
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace';
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve';

// Define externals for each version
const createExternals = (version) => {
  const common = [
    'react',
    'react-dom',
  ];

  // Version-specific externals
  const v4Externals = [
    '@material-ui/core',
    '@material-ui/lab',
    '@material-ui/icons',
    '@material-ui/core/styles',
  ];

  const v5Externals = [
    '@mui/material',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled',
  ];

  if (version === 'v4') {
    return [...common, ...v4Externals, ...v5Externals];
  } else if (version === 'v5') {
    return [...common, ...v5Externals, ...v4Externals];
  } else {
    return [...common, ...Object.keys(pkg.peerDependencies || {})];
  }
};

const getBabelOptions = () => ({
  babelHelpers: 'bundled',
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  extensions: ['.js', '.jsx'],
  exclude: 'node_modules/**'
});

const createPlugins = () => [
  resolve({ extensions: ['.js', '.jsx'] }),
  babel(getBabelOptions()),
  replace({
    values: { 'import.meta.env': false, 'process.env.NODE_ENV': JSON.stringify('production') },
    preventAssignment: true
  }),
  json(),
  nodeResolve({
    browser: true,
    extensions: [".js", ".jsx"],
  }),
  commonjs({ 
    include: 'node_modules/**',
    transformMixedEsModules: true,
    requireReturnsDefault: "auto",
  }),
  styles(),
  terser()
];

export default [
  // v5 (default) bundle
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
    external: createExternals('v5'),
    plugins: createPlugins()
  },
  // v4 specific bundle
  {
    input: 'src/v4/index.js',
    output: {
      file: 'dist/v4.js',
      format: 'esm',
    },
    external: createExternals('v4'),
    plugins: createPlugins()
  },
  // v5 specific bundle (for explicit imports)
  {
    input: 'src/v5/index.js',
    output: {
      file: 'dist/v5.js',
      format: 'esm',
    },
    external: createExternals('v5'),
    plugins: createPlugins()
  }
];