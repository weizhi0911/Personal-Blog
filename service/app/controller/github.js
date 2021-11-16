// import { Controller } from 'egg'
'use strict'
const Controller = require('egg').Controller
const queryString = require('querystring')

class GithubController extends Controller {
  async loginView() {
    // 1.获取第三方登录界面
    // 发送get请求到https://github.com/login/oauth/authorize带上一些参数即可
    // client_id: Github可以根据这个client_id判断你有没有申请接入
    //            Github会根据这个client_id查询出对应的应用程序名称, 告诉用户正在给哪个程序授权
    // scope    : 授权范围
    const baseURL = 'https://github.com/login/oauth/authorize'
    const option = {
      client_id: '475d5903e217f53488cc',
      scope: '4153e1dc7537442cb3ea6e97429ce191f026d20c'
    }
    const url = baseURL + '?' + queryString.stringify(option)
    const { ctx } = this
    console.log('oooloo')
    console.log(ctx)
    //这个页面是用户进行授权的页面
    ctx.redirect(url)
  }
  //上一步用户授权登陆完成后,会返回code,请求的是我们之前在github上设定好的回调地址
  async getAccessToken() {
    const { ctx } = this
    // 1.拿到用户同意授权之后的code
    const { code } = ctx.query
    // 2.利用code换取令牌(access_token)
    // 发送POST请求到https://github.com/login/oauth/access_token带上必要的参数
    const baseURL = 'https://github.com/login/oauth/access_token'
    const option = {
      client_id: '475d5903e217f53488cc',
      client_secret: '4153e1dc7537442cb3ea6e97429ce191f026d20c',
      code: code
    }
    const result = await ctx.curl(baseURL, {
      method: 'POST',
      data: option,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const accessToken = result.data.access_token

    console.log('accessToken', accessToken)
    // 3.拿着令牌去资源服务器获取数据
    await this.getGithubUserInfo(accessToken)
  }
  //获取用户数据
  async getGithubUserInfo(accessToken) {
    const { ctx } = this
    const baseURL = 'https://api.github.com/user'
    const url = `${baseURL}?access_token=${accessToken}`
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        Authorization: 'token ' + accessToken
      }
    })
    console.log('here', JSON.parse(result.data))
    ctx.body = JSON.parse(result.data)
    //坑:我们希望用户界面跳转github回调地址的时候,不要显示404 not found,而是显示hello,那么首先因为这个是异步的方法,所以调用this.getGithubUserInfo()的前面要加上await,另外,在执行所有路由对应的方法前,都要先执行中间件方法,那么中间件next()的时候前面也要await,不然就没等异步方法走完,就结束了,就相当于没有处理
  }
}
module.exports = GithubController
