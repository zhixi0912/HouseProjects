import React from 'react'
import {Row, Col, Button } from 'antd';
import {Link} from 'react-router-dom'
import logo404 from './images/404.svg'
import './index.less'

export default class NoFind extends React.Component{
    render() {
        return(
            <Row type="flex" justify="space-around" align="middle">
                <Col span={12} className="img-box">
                    <img src={logo404} />
                </Col>
                <Col span={12}  className="text-box">
                    <p className="h1">404</p>
                    <p className="h3">抱歉，你访问的页面不存在</p>
                    <p className="h4">
                        <Button type="primary" htmlType="submit" >
                            <Link to="/home">返回首页</Link>
                        </Button>
                    </p>
                </Col>
            </Row>
        )
    }
}