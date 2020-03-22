/*详情页
解析MrakDown 运用 react-markdown markdown-navbar marked highlight.js
*/
import Head from 'next/head'
import React from 'react';
import axios from 'axios';
import Header from '../components/Header'
import { Row, Col, Breadcrumb, Affix } from 'antd';
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from "../components/Footer";
import '../public/style/pages/detailed.css';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

import marked from 'marked';//解析markdown
import hljs from 'highlight.js';//markdown代码高亮
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx';//尚未开源
import servicePath from '../config/apiUrl';

const Detailed = (props) => {

  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function (txt, level, raw) {//txt文本，level等级 marked不带a标签锚链接需自定义a标签
    const anchor = tocify.add(txt, level)
    return `<a id=${anchor} href="${anchor}" class="anchor-fix"><h${level}>${txt}</h${level}>></a>\n`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content)

  // let markdown = '# P01:课程介绍和环境搭建\n' +
  //   '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  //   '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  //   '**这是加粗的文字**\n\n' +
  //   '*这是倾斜的文字*`\n\n' +
  //   '***这是斜体加粗的文字***\n\n' +
  //   '~~这是加删除线的文字~~ \n\n' +
  //   '\`console.log(111)\` \n\n' +
  //   '# p02:来个Hello World 初始Vue3.0\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n' +
  //   '***\n\n\n' +
  //   '# p03:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' +
  //   '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' +
  //   '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' + '# p04:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' +
  //   '#5 p05:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' +
  //   '# p06:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' +
  //   '# p07:Vue3.0基础知识讲解\n' +
  //   '> aaaaaaaaa\n' +
  //   '>> bbbbbbbbb\n' +
  //   '>>> cccccccccc\n\n' +
  //   '``` var a=11; ```'
  return (
    <div className="container">
      <Head>
        {/* 解决浏览器缓存问题 */}
        {/* <script type="text/javascript" src="/js/common.js?v=1" ></script> */}
        <title>Detailed</title>
      </Head>
      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/">视频教程</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/">xxxxx</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
              React实战视频教程-程序峰Blog开发
       </div>
            <div className="list-icon center">
              <span>
                <CalendarOutlined />2020-03-02
                                </span>
              <span>
                <FolderOutlined />视频教程
                           </span>
              <span>
                <FireOutlined />10000人
                            </span>
            </div>
            <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>
              {/* <ReactMarkdown
                source={markdown}
                escapeHtml={false}
              /> */}

            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />

          {/* 文章目录 */}
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
              {/* <MarkNav
                className="article-menu"
                source={html}
                ordered={false}
              /> */}
            </div>
          </Affix>

        </Col>
      </Row>
      <Footer />

    </div>
  )
}
Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)
  const id = context.query.id
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleById + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })

  return await promise;
}


export default Detailed
