const mix = require('laravel-mix');
const config = require('./webpack.config');

mix.setResourceRoot('');
mix.js('src/js/app.js', 'public/js/')
  .sass('src/style/app.scss', 'public/css/')
  .extract()
  .browserSync({
    files: './public/**/*',
    server: './public/',
    proxy: false
  });

mix.webpackConfig(config);
