module.exports = {
  root: true,
  extends: 'standard',
  rules: {
    // allow variable not used, but gives a warning 
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1,
  }
}