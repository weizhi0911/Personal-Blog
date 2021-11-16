import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import '../static/css/Login.css'
import {
  UserOutlined,
  UnlockOutlined,
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import githubPath from '../config/githubUrl'

function Login(props) {
  const [userName, setUseName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = () => {
    setIsLoading(true)
    if (!userName) {
      message.error('用户名不能为空')
      setIsLoading(false)
      return false
    } else if (!passWord) {
      message.error('密码不能为空')
      setIsLoading(false)
      return false
    }
    let dataProps = {
      userName: userName,
      passWord: passWord
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    })
      .then(res => {
        setIsLoading(false)
        if (res.data.data === '登录成功') {
          localStorage.setItem('openId', res.data.openId)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      })
      .catch(res => {
        // console.log(res.response)
        setIsLoading(false)
        // message.error(res.data.data)
        // handle error
        // message.error(error);
      })
  }

  const githubInfo = () => {
    // alert(localStorage.getItem('openId'))
    if (localStorage.getItem('openId')) {
      // props.history.push('/index')
      return
    }
    axios({
      method: 'get',
      url: githubPath.githubInfo,
      data: {},
      withCredentials: true
    })
      .then(res => {
        setIsLoading(false)
        console.log('github')
        console.log(res.data.message)

        if (res.data.message) {
          localStorage.setItem('openId', res.data.message)
          props.history.push('/index')
        }
      })
      .catch(res => {
        // console.log(res.response)
        setIsLoading(false)
        // message.error(res.data.data)
        // handle error
        // message.error(error);
      })
  }
  githubInfo()
  const openGit = () => {
    window.open('http://127.0.0.1:7001/github')
  }
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="JSFeng blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="useName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {
              setUseName(e.target.value)
            }}
          />
          <br />
          <br />
          <Input.Password
            id="passWord"
            size="large"
            placeholder="Enter your passWord"
            prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {
              setPassWord(e.target.value)
            }}
          />
          <br />
          <br />
          <div class="other-login">
            <p>其他登录方式</p>
            <div class="login-icon">
              <GithubOutlined onClick={openGit} />
              <QqOutlined />
              <WechatOutlined />
            </div>
          </div>

          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login
