/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
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
        database: 'react_blog',
      },
      // load into app, default is open
      app: true, // 是否加载到app上默认true
      // load into agent, default is close/
      agent: false,
    },
    security: {//
      csrf: {
        enable: false, // 安全措施
      },
      domainWhiteList: [ '*' ],
    },
    cors: {
      origin: 'http://localhost:3000', // 限制某些域名访问
      credentials: true, // 允许cookit可以跨域
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583158050037_9034';

  // add your middleware config here
  config.middleware = [ 'adminauth' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
