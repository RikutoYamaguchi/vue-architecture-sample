module.exports = {
  resolve: {
    alias: {
      '@infrastructures': path.resolve(__dirname, './src/js/domains/infrastructures'),
      '@models': path.resolve(__dirname, './src/js/domains/models'),
      '@repositories': path.resolve(__dirname, './src/js/domains/repositories'),
      '@useCases': path.resolve(__dirname, './src/js/domains/useCases'),
      '@viewModels': path.resolve(__dirname, './src/js/domains/viewModels'),
      '@domains': path.resolve(__dirname, './src/js/domains'),
      '@errors': path.resolve(__dirname, './src/js/errors'),
      '@helpers': path.resolve(__dirname, './src/js/helpers'),
      '@mixins': path.resolve(__dirname, './src/js/mixins'),
      '@providers': path.resolve(__dirname, './src/js/providers'),
      '@store': path.resolve(__dirname, './src/js/store'),
      '@': path.resolve(__dirname, './src/js'),
    }
  },
};

