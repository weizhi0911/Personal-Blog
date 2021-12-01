/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    mysql: {
      // database configuration
      client: {
        // host
        host: 'localhost',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: 'root',
        // database
        database: 'react_blog'
      },
      // load into app, default is open
      app: true, // 是否加载到app上默认true
      // load into agent, default is close/
      agent: false
    },
    security: {
      //
      csrf: {
        enable: false // 安全措施
      },
      domainWhiteList: ['*']
    },
    cors: {
      origin: 'http://localhost:3000', // 限制某些域名访问
      credentials: true, // 允许cookit可以跨域
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  })

  // add your middleware config here
  config.middleawre = ['adminauth']
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583158050037_9034'

  // config.gzip.threshold = 1024 // 小于 1k 的响应体不压缩

  /**
   * 配置session
   * session的配置和cookie基本是一样的,可以使用cookie里面的配置
   */
  config.session = {
    key: 'SESSION_ID', // 设置session cookie里面的key
    maxAge: 1000 * 60 * 30, // 设置过期时间
    httpOnly: true,
    encrypt: true,
    renew: true // renew等于true 那么每次刷新页面的时候 session都会被延期
  }
  // github 登录配置
  config.passportGithub = {
    key: '475d5903e217f53488cc',
    secret: '4153e1dc7537442cb3ea6e97429ce191f026d20c',
    // callbackURL: 'http://localhost:3000/index/add',
    proxy: false
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  return {
    ...config,
    ...userConfig
  }
}
