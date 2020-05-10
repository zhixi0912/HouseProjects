import React from 'react'

import {
    Layout, Menu,Row, Col,Dropdown, Icon
} from 'antd';
import './index.less'
import axios from "../../axios";
import {switchMenu} from '../../redux/action'
import Store from '../../redux/store'

const { Header } = Layout;

export default class Headers extends React.Component{
    state = {
        data:[],
        currentKey:[],
        collapsed:this.props.collapsed
    }
    componentWillMount(){
        this.fetch()
    }
    fetch=()=>{
        axios.get("menu/all",null,
            result=> {
                // console.log("顶部导航--------->",result)
                let currentKey = []
                currentKey[0] = result.result.data[0].id || '';
                this.setState({
                    data:result.result.data ||[],
                    currentKey:currentKey
                })
            },
            result=> {

            }
        );
    }
    
    handleClick=({item,key})=>{
        console.log('click ', key);
        // console.log("-------------",this.state.currentKey)
        // let keys = []
        // keys[0] = key;
        // this.setState({
        //     currentKey: keys
        // });
        // if(key==this.state.currentKey[0]){
        //     console.log("key",key)
        //     return false
        // }

        // const {dispatch} = this.props
        Store.dispatch(switchMenu(key))
        // switchMenu(key)
        // console.log("this.props----",switchMenu)
    }
    signOut=()=>{
        let token = '';
        localStorage.setItem('token', JSON.stringify(token));
        window.location.href = '#/';
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <span  rel="noopener noreferrer" onClick={this.signOut}>退出</span>
                </Menu.Item>
            </Menu>
        );
        // const defaultSelectedKeys = this.state.currentKey
        return (
            <Header className="header header-box" >
                <Row>
                    <Col span={1}>
                        <Icon
                            className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={()=>{this.props.toggle(this.state.collapsed)}}
                        />
                    </Col>
                    <Col span={13}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            onClick={this.handleClick}
                            defaultSelectedKeys={["1"]}
                            style={{ lineHeight: '62px',border:'none' }}
                        >
                            {
                                this.state.data && this.state.data.map(item=>{
                                    return(<Menu.Item key={item.id}><span><Icon type={item.icon} /><span>{item.title}</span></span></Menu.Item>)
                                })
                            }
                        </Menu>

                    </Col>
                    <Col span={10}>
                        <div className="user-info">
                            <Dropdown overlay={menu}>
                                <span className="ant-dropdown-link">
                                    HoverMe <Icon type="down" />
                                </span>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>

            </Header>
        )
    }
}