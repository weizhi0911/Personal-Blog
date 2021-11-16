'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    this.ctx.body = '21312';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const passWord = this.ctx.request.body.passWord;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" +
      userName + "' AND passWord = '" +
      passWord + "'";
    const res = await this.app.mysql.query(sql);
    console.log('getTypeInfo');
    if (res.length > 0) { // 查询返回的长度大于0，登录成功
      const openId = new Date().getTime();
      this.ctx.session = { openId };
      this.ctx.body = { data: '登录成功', openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() { // 获取文章类别信息
    const resType = await this.app.mysql.select('type');// 类型
    this.ctx.body = { data: resType };
  }

  async addArticle() { // 添加文章
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const inserSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: inserSuccess,
      insertId,
    };
  }

  async updateArticle() { // 修改文章
    const temArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', temArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getArticleList() { // 获取文章列表
    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      "DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };

  }

  async delArticle() { // 删除单个文章
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = {
      data: res,
    };
  }
  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
  'article.title as title,' +
  'article.introduce as introduce,' +
  'article.article_content as article_content,' +
  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
  'article.view_count as view_count ,' +
  'type.typeName as typeName ,' +
  'type.id as typeId ' +
  'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
  'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

}

module.exports = HomeController;

