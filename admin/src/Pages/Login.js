import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import '../static/css/Login.css';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {

    const [userName, setUseName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            'userName': userName,
            'passWord': passWord
        }
        axios(
            {
                method: 'post',
                url: servicePath.checkLogin,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setIsLoading(false)
                    if (res.data.data === '登录成功') {
                        localStorage.setItem('openId', res.data.openId)
                        props.history.push('/index')
                    } else {
                        message.error('用户名密码错误')
                    }
                }
            ).catch((res) => {
                // console.log(res.response)
                setIsLoading(false)
                // message.error(res.data.data)
                // handle error
                // message.error(error);
            })
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
                        onChange={(e) => {
                            setUseName(e.target.value)
                        }}
                    />
                    <br /><br />
                    <Input.Password
                        id="passWord"
                        size="large"
                        placeholder="Enter your passWord"
                        prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => {
                            setPassWord(e.target.value)
                        }}
                    />
                    <br /><br />

                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>

        </div>
    )
}

export default Login;