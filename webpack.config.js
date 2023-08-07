const path = require('path');

module.exports = {
  entry: {
    'ball-collision': './src/ball-collision.js',
    'block-collision': './src/block-collision.js',
    'jenga': './src/jenga.js',
  },
  mode: 'development', //change to production for later
  output: {
    filename: '[name].bundle.js', // Use [name] placeholder to generate multiple output files
    path: path.resolve(__dirname, 'dist'),
  },
};
