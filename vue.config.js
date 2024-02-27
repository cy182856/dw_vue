module.exports = {
  devServer: {
    port: 9528,
    proxy: {
      '/api': {
         target: 'http://localhost:8081',
        // target: 'http://192.168.22.242',
        // target: 'https://demo-bsind.huge-vision.com',
        // target: 'http://192.168.52.193:8081',
        // target: 'http://192.168.52.198:8081',
        // target: 'https://demo-bsind.huge-vision.com',

        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '/api': ''
        // }
      }
    },
    disableHostCheck: true
  },
  publicPath: process.env.VUE_APP_CONTEXT_PATH,
  productionSourceMap: false
}
