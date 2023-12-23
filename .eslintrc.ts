module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['@typescript - eslintt', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vuee / typescript',
    'plugin:prettier/recommended'
  ]
};
