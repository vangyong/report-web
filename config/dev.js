// NOTE H5 端使用 devServer 实现跨域，需要修改 package.json 的运行命令，加入环境变量
// const isH5 = process.env.CLIENT_ENV === 'h5'
// const HOST = '"http://132.232.30.39:8000"'
const HOST = '"http://127.0.0.1:8000"'
const REPORT_HOST = '"http://127.0.0.1:18000"'

module.exports = {
    env: {
        NODE_ENV: '"development"'
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
        devServer: {
            host: '0.0.0.0',
            port: 18001,
            proxy: {
                '/v1': {
                    target: HOST,
                    pathRewrite: {
                        '^/v1/': '/v1'
                    },
                    changeOrigin: true
                },
                '/v2': {
                    target: REPORT_HOST,
                    pathRewrite: {
                        '^/v2/': '/v2'
                    },
                    changeOrigin: true
                }
            }
        }
    }
}
