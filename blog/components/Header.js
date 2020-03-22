import React, { useEffect, useState } from 'react';
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import {
    HomeOutlined,
    DownCircleOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../config/apiUrl'

const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/index')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className="header">

            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">程序峰</span>
                    <span className="header-txt">程序小白</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            博客首页
                    </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <DownCircleOutlined />
                                        {item.typeName}
                                    </Menu.Item>)
                            })
                        }




                    </Menu>
                </Col>
            </Row>
        </div>
    )
}


export default Header