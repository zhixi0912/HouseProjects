import React from 'react'
import './index.less'
import {Menu, Icon} from "antd";
import {NavLink} from 'react-router-dom'
import axios from "../../axios";
import {connect} from "react-redux";
const SubMenu = Menu.SubMenu;

class Menus extends React.Component{
    state = {
        defaultOpenKeys:['2'],//左侧菜单默认展开
        defaultSelectedKeys:['0'],//左侧菜单默认选中
        // curSelectedMenuKey:['3'],//左侧菜单默认选中
        data:[], //左侧菜单数据
        param:'1', //左侧菜单接口请求参数
        menuTreeNode:[],
        collapsed:this.props.collapsed,
    }
    componentDidMount(){

    }
    componentWillMount(){
        let {menuName} = this.props; //顶部菜单初始选中参数
        this.setState({
            param:menuName,
        },this.fetch)
        
    }
    componentWillReceiveProps=(nextProps)=>{
        this.setState({
            param:nextProps.menuName,
        },this.fetch)
    }
    fetch=(id)=>{
        axios.get("menu/"+(this.state.param || id),null,
            result=> {
                let menuData = result.result.data ||[];
                // let home = {}
                // home.id = '0';
                // home.title= "控制台";
                // home.request_child= "home";
                // home.request_method= "index";
                // home.request_parent= null;
                // menuData[0].leftChild.push(home)
                console.log("左侧菜单接口数据----",menuData)
                let menuList = this.readerMenu(menuData)
                this.setState({
                    data:result.result.data ||[],
                    menuTreeNode:menuList,
                    defaultOpenKeys:[menuData[0].id],
                    defaultSelectedKeys:[menuData[0].leftChild[0].id],
                // },this.urlSetMenu)
                })
            },
            result=> {

            }
        );
    }
    urlSetMenu = ()=>{
        var newHashUrl = this.getHashKeyByUrl(window.location.href);
        this.setState({defaultSelectedKeys:[newHashUrl]});
        window.onhashchange = (hash)=> {
            var newHash = this.getHashKeyByUrl(hash.newURL);
            if(newHash === this.getHashKeyByUrl(hash.oldURL)){
                return;
            }
        };

    }
    getHashKeyByUrl=(url)=>{
        var reg = new RegExp(/#\/(.*)?/);
        var matches =url.match(reg);
        if(matches && matches.length>=2 && matches[1]!=undefined){
            return matches[1];
        }else{
            return null;
        }
    }
    onMenuClick = (e) =>{
        let breadcrumb = []
        this.state.data.map(item=>{
            let obj ={}
            obj.key = item.id;
            obj.title = item.title;
            if(item.leftChild){
                item.leftChild.map(todu=>{
                    let obj2 = {}
                    if(e.key === todu.id){
                        obj2.key = todu.id;
                        obj2.title = todu.title;
                        breadcrumb.push(obj,obj2)
                    }
                })
            }else {
                if(e.key === item.id){
                    breadcrumb.push(obj)
                }
            }
        })
        this.props.onMenuChange(breadcrumb)

    }
    readerMenu = (data)=>{
        let iconList = ['bank','gold','container','filter','hourglass','folder','dashboard']
        return  data.map((item,index)=>{
            item.icon = iconList[index]
            if(item.leftChild){
                return (
                    <SubMenu key={item.id} data-id={item.title} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                        {this.readerMenu(item.leftChild)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.id} title={item.title}>
                    <NavLink to={item.request_child}>{ item.icon === 'home' ? <Icon type={item.icon} /> :'' }  <span>{item.title}</span> </NavLink>
                </Menu.Item>
            )

        })

    }

    render() {
        return (
            <Menu theme="light"
                  mode="inline"
                  className="menu-box"
                  defaultSelectedKeys={['0']}
                  defaultOpenKeys={['6']}
                  onClick={this.onMenuClick}
                //   inlineCollapsed={this.state.collapsed}
            >
                {this.state.menuTreeNode}
            </Menu>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        menuName:state.menuName,
        // list:state.list
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        changeInputValue(e){
            // const action=changeValue(e.target.value)
            // dispatch(action)
           
        },
        //新增数据
        handleAddClick(){
            // const action =additem()
            // dispatch(action)
            
        },
        //删除数据
        handleDelete(index){
            // const action=deleteItem(index)
            // dispatch(action)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Menus);