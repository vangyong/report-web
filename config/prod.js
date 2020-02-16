// const isH5 = process.env.CLIENT_ENV === 'h5'
//const HOST = '"https://www.fengtuwei.com"'
const HOST = '"http://132.232.30.39:18001"'
const REPORT_HOST = '"http://132.232.30.39:18001"'

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST: HOST,
    REPORT_HOST: REPORT_HOST
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
  }
}
