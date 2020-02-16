# 报单小程序

  * 本项目基于Taro 多端统一开发方面的实践验证
  * 旨在使用 Taro 构建多端（小程序 + H5 + React Native）统一的实践项目。
  * 参照：https://juejin.im/post/5c6a151f518825625e4ac830

## 安装环境
  1. 安装 @tarojs/cli 指定版本
   npm install -g @tarojs/cli@1.3.20  或 yarn global add @tarojs/cli@1.3.20

  2. 清除依赖
  * npm cache clean --force
  * rm -rf node_modules

  3. 安装依赖
   npm install 或 yarn install
  
  4. 升级更新
  * taro --version   查看本地安装的taro版本
  * taro update self  更新本地版本
  * taro update project 更新工程依赖的taro版本
  
## 运行程序
* 小程序运行（微信:weapp，支付宝:alipay）
  npm run dev:weapp

* H5运行 
  npm run dev:h5

* React Native 运行 
  npm run dev:rn
  
## 打包程序
   npm run build:h5
   npm run build:weapp

## 模拟器
  * 下载:
    http://expo.io/--/api/v2/versions/download-ios-simulator-build
  * 安装说明:
  https://www.jianshu.com/p/dfad5d1f4072
  xcrun simctl install booted /Users/wangyong/devsoftware/Exponent-2.10.0.app
  * 备注：
    1. 基于 Expo，运行说明：https://nervjs.github.io/taro/docs/react-native.html
    2. 首次运行可能会报错，参见 issue：https://github.com/NervJS/taro/issues/2121
    3. 当前只适配了 375px 屏幕，若用 iOS 模拟器打开的不是 iPhone 6/7/8，可点击顶部菜单 Hardware -> iOS xx 切换设备


## 访问链接
管理端：http://127.0.0.1:18001/#/pages/report/manager/manager
用户报单：http://127.0.0.1:18001/#/pages/report/order/fill

# license 
[MIT](www.fengtuwei.com) Copyright (c) 2019-present 
