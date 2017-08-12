module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  rules: {
    // allow variable not used, but gives a warning 
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1
  }
}