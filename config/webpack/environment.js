// setup from: https://medium.com/@jmaguire5588/typescript-reactonrails-d1c9d58f9884

const { environment } = require('@rails/webpacker')

environment.loaders.append('typescript', {
  test: /.(ts|tsx)$/,
  loader: 'ts-loader'
});

module.exports = environment
