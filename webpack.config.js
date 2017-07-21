const path = require('path');


module.exports = {
  context: __dirname,
  entry: './src/loader.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
};
