import React, { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, message, Button } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SmileTwoTone
} from '@ant-design/icons'
import '../static/css/Aminlndex.css'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import Toys from './Toys'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function Adminlndex(props) {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    goRouter()
  }, [])

  const goRouter = () => {
    // let history = useHistory();
    if (!localStorage.getItem('openId')) {
      message.error('请先登录')
      props.history.push('/login')
    } else {
    }
  }
  const loginout = () => {
    localStorage.removeItem('openId')
    props.history.push('/login')
  }
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  const handleClickArticle = e => {
    console.log(e)
    props.history.push(e.key)

    // if (e.key === 'addArticle') {
    //   props.history.push('/index/add')
    // } else {
    //   props.history.push('/index/list')
    // }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="/admin/add">添加文章</Menu.Item>
            <Menu.Item key="/admin/list">文章列表</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <TeamOutlined />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="5">Team 1</Menu.Item>
            <Menu.Item key="6">Team 2</Menu.Item>
          </SubMenu>

          <Menu.Item key="7">
            <FileOutlined />
            留言管理
          </Menu.Item>

          <Menu.Item key="/admin/toys" onClick={handleClickArticle}>
            <SmileTwoTone />
            我的玩具
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <div class="header-content">
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div class="loginout">
              <Button type="primary" onClick={loginout}>
                退出登录
              </Button>
            </div>
          </div>

          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Route path="/" exact component={AddArticle} />
              <Route path="/admin/add/" exact component={AddArticle} />
              <Route path="/admin/list/" exact component={ArticleList} />
              <Route path="/admin/add/:id" exact component={AddArticle} />
              <Route path="/admin/toys" exact component={Toys} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>JSFeng.com</Footer>
      </Layout>
    </Layout>
  )
}
export default Adminlndex
