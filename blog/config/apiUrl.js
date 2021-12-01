/*接口文件*/
let ipUrl = 'http://127.0.0.1:7002/default/';//ip地址

let servicePath = {//后台接口
    getArticleList: ipUrl + 'getArticleList', // 主页查询
    getArticleById: ipUrl + 'getArticleById/',// 详情页查询
    getTypeInfo: ipUrl + 'getTypeInfo',// 文章类别查询
    getListById: ipUrl + 'getListById/',// 根据类别id获取文章列表


}

export default servicePath;