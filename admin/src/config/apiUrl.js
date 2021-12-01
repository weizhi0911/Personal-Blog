/*接口文件*/
let ipUrl = process.env.REACT_APP_API_URL + '/admin/' //ip地址
let servicePath = {
  //后台接口
  checkLogin: ipUrl + 'checkLogin', // 检查用户名密码
  getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类别信息
  addArticle: ipUrl + 'addArticle', // 添加文章
  updateArticle: ipUrl + 'updateArticle', // 修改文章
  getArticleList: ipUrl + 'getArticleList', // 获取文章列表
  delArticle: ipUrl + 'delArticle/', // 删除单个文章
  getArticleById: ipUrl + 'getArticleById/' // 获取单个文章
}

export default servicePath
