/*接口文件*/
let ipUrl = process.env.REACT_APP_API_URL + '/toys/' //ip地址

let toysPath = {
  //后台接口
  upload: ipUrl + 'upload' // 上传
}

export default toysPath
