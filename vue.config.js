const production = process.env.NODE_ENV === "production";

module.exports = {
  productionSourceMap: production ? false : true, // 生产环境去掉后缀为.map的文件
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugins.delete("prefetch"),
      config.module
        .rule("worker")
        .test(/\.worker\.js$/)
        .use("worker-loader")
        .loader("worker-loader")
        .options({
          inline: true,
          fallback: false,
        })
        .end();
  },
  configureWebpack: (config) => {
    if (production)
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  },
  productionSourceMap: false,
};
