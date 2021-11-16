module.exports = app => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth() // 路由守卫(中间件)需要登录才能请求接口
  router.get('/admin/index', adminauth, controller.admin.main.index)
  router.post('/admin/checkLogin', controller.admin.main.checkLogin)
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
  router.post(
    '/admin/updateArticle',
    adminauth,
    controller.admin.main.updateArticle
  )
  router.get(
    '/admin/getArticleList',
    adminauth,
    controller.admin.main.getArticleList
  )
  router.get(
    '/admin/delArticle/:id',
    adminauth,
    controller.admin.main.delArticle
  )
  router.get(
    '/admin/getArticleById/:id',
    adminauth,
    controller.admin.main.getArticleById
  )

  // github登录接口
  router.get('/github', controller.github.loginView)
  router.get('/github/callback', controller.github.getAccessToken)
  router.get('/github/info', controller.github.getGithubUserInfo)

  // 挂载鉴权路由
  // app.passport.mount('github')

  // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);
}
