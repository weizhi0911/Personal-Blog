import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios';
import servicePath from '../config/apiUrl'
import githubPath from '../config/githubUrl'

import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input


function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState('')   //发布日期
    // const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('文章类型') //选择的文章类别
    const renderer = new marked.Renderer();

    useEffect(() => {
      
        getTypeInfo()
        //获取文章id
        let tmpId = props.match.params.id
        if (tmpId) {
            setSelectType('articleInfo.typeName')
            setArticleId(tmpId)
          getArticleById(tmpId)
        }

    }, [])


    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const selectTypeHandler = (v) => {
        setSelectType(v)
    }

    const saveArticle = () => {
        if (selectedType === '文章类型') {
            message.error('必须选择文章类型')
            return false
        } else if (!articleTitle) {
            message.error('博客标题不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('文章简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        // let dateText = showDate.replace('-', '/')
        // dataProps.addTime = (new Date(dateText).getTime() / 1000)
        dataProps.addTime = showDate

        if (articleId === 0) {//新增文章
            dataProps.view_count = 0//文章访问认数
            axios({
                method: "post",
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                setArticleId(res.data.insertId)//文章id
                if (res.data.isSuccess) {//插入成功
                    message.success("文章保存成功")
                } else {
                    message.error("文章保存失败")

                }
            })
        } else {//修改文章
            dataProps.id = articleId//文章id
            axios({
                method: "post",
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                if (res.data.isSuccess) {//修改成功
                    message.success("文章修改成功")
                } else {
                    message.error("文章修改失败")

                }
            })
        }
    }




    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true//跨域检验cookit
        }).then(res => {
            if (res.data.data === '没有登录') {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }

    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true
        }).then(res => {
            const articleInfo = res.data.data[0]
            // console.log(articleInfo)

            setArticleTitle(articleInfo.title)
            setArticleContent(articleInfo.article_content)

            const html = marked(articleInfo.article_content)
            setMarkdownContent(html)
            setIntroducemd(articleInfo.introduce)
            const temInt = marked(articleInfo.introduce)
            setIntroducehtml(temInt)
            setSelectType(articleInfo.typeId)
            setShowDate(articleInfo.addTime)


            setTimeout(() => {
            // console.log(showDate)
                
            }, 3000);
            // setSelectType(articleInfo.typeName)
        })
  }
  
  const githubInfo = () => {
    axios({
      method: 'get',
      url: githubPath.githubInfo,
      data: {},
      withCredentials: true
    })
      .then(res => {
        console.log('github')
        console.log(res.data.message)

        // if (res.data.message) {
        //   localStorage.setItem('openId', res.data.message)
        //   props.history.push('/index')
        // }
      })
      .catch(res => {
        // console.log(res.response)
        // message.error(res.data.data)
        // handle error
        // message.error(error);
      })
  }
  // githubInfo()


    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                onChange={e => setArticleTitle(e.target.value)}
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select
                             defaultValue={selectedType} 
                             size="large" 
                             onChange={selectTypeHandler}
                             >
                                {/* <Option value="Sign Up">视频教程</Option> */}

                                {typeInfo.map((item, index) => {
                                    return (<Option value={item.Id} key={index}>{item.typeName}</Option>)
                                })}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                value={articleContent}
                                placeholder="文章内容"
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }} >

                            </div>

                        </Col>
                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    defaultValue={showDate?moment(showDate, 'YYYY-MM-DD'):''}
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>

                        {/* <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
                                />
                            </div>
                        </Col> */}
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
export default AddArticle