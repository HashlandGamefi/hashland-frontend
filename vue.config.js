module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch'),
      config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader').loader('worker-loader')
      .options({
        inline: true,
        fallback: false
      }).end();
  },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //   }
  // },
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true
}
