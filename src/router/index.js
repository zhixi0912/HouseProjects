import React from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import App from '../App.js'
import Index from '../page/index'
import Login from '../page/login'

import NoFind from '../page/modules/noFind'  //404

//*** 设置 ***//
import Home from '../page/modules/setUp/coreSetup/home' //控制台
import MenuSetup from '../page/modules/setUp/coreSetup/menuSetup'  //菜单设置
import NavSetup from '../page/modules/setUp/coreSetup/navSetup'  //导航设置
import WebsiteSetup from '../page/modules/setUp/coreSetup/websiteSetup'  //站点设置
import Administrators from '../page/modules/setUp/user/administrators'  //管理员设置
import Role from '../page/modules/setUp/user/role'  //角色设置
// import UserManage from '../page/modules/setUp/coreSetup/userManage'  //用户设置
// import PrivilegeManage from '../page/modules/coreSetup/privilegeManage'  //权限管理
// import MenuManageEditModal from '../page/modules/coreSetup/menuManage/editModal'


//*** 模块 ***//
import RegionalManag from '../page/modules/modular/regionalManag' //区域管理
import AdvertManag from '../page/modules/modular/advertManag' //广告位管理
import PosterSpaceList from '../page/modules/modular/advertManag/posterSpaceList' //广告管理
import Recommend from '../page/modules/modular/recommend' //推荐位管理
import LinkManag from '../page/modules/modular/friendshipLinks/linkManag' //友情链接管理
import LinkType from '../page/modules/modular/friendshipLinks/linkType' //链接分类管理
import Screen from '../page/modules/modular/extendedAttributes/screen' //筛选条件 
import Attribute from '../page/modules/modular/extendedAttributes/attribute' //属性管理 
 

//*** 楼盘 ***//
import EstateManag from '../page/modules/estate/estateManag' //楼盘管理
import Developers from '../page/modules/estate/developer' //开发管理
import AddHouselistModal from '../page/modules/estate/estateManag/addHouselistModal' //添加楼盘
import Apartment from '../page/modules/estate/estateManag/apartment' //楼盘户型
import Album from '../page/modules/estate/estateManag/album' //楼盘相册
import Dynamic from '../page/modules/estate/estateManag/dynamic' //楼盘动态
import SandTable from '../page/modules/estate/estateManag/sandTable' //楼盘沙盘
//*** 内容 ***//
import ArticleType from '../page/modules/content/articleManag/articleType' //文章分类
import ArticleList from '../page/modules/content/articleManag/articleList' //文章列表
import AddArticle from '../page/modules/content/articleManag/articleList/addArticleListModal' //添加文章
import RecycleBin from '../page/modules/content/articleManag/recycleBin' //回收站

//*** 用户 ***//


import ModuleConfig from '../page/modules/user/userManag/moduleConfig' //模块配置
import UserMember from '../page/modules/user/userManag/userMember' //会员管理
import AgentManag from '../page/modules/user/userManag/agentManage' //经济人管理  
import QueAnsList from '../page/modules/user/queAns/queAnsList' //问答列表
import CommentList from '../page/modules/user/commentManage/commentList' //评论列表
import NewHouse from '../page/modules/user/appointment/newHouse' //新房预约
import RentalHousing from '../page/modules/user/appointment/rentalHousing' //团购报名
import SecondHand from '../page/modules/user/appointment/secondHand' //活动报名
export default class AdminRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" exact={true} component={Login} />
                        <Route path="/" render={() =>
                            <Index>
                                <Switch>
                                    <Route path="/home" component={Home}/>{/*控制台*/}
                                    <Route exact path="/site" component={WebsiteSetup}/>{/*站点设置*/}
                                    {/*<Route path="/cache" component={}/>更新缓存*/}
                                    <Route exact path="/nav" component={NavSetup}/>{/*导航设置*/}
                                    <Route exact path="/menu" component={MenuSetup}/>{/*菜单设置*/}

                                    <Route exact path="/admin" component={Administrators}/>{/*管理员设置*/}
                                    <Route exact path="/role" component={Role}/>{/*角色设置*/}
                                    {/*<Route path="/MenuManage" component={MenuManage}/>*/}
                                    {/*<Route path="/coreSetup/menuManage/editModal/:id?" component={MenuManageEditModal}/>*/}


                                    <Route exact path="/region" component={RegionalManag}/>{/*区域管理*/}
                                    <Route path="/advert"
                                           render={() =>
                                               <Switch>
                                                   <Route exact path="/advert" component={AdvertManag}/>{/*广告位管理*/}
                                                   <Route exact path="/advert/posterSpaceList/:id" component={PosterSpaceList}/>{/*广告管理*/}
                                               </Switch>
                                    }/>
                                    <Route exact path="/recommend" component={Recommend}/>{/*推荐位管理*/}
                                    <Route exact path="/link" component={LinkManag}/>{/*友情链接管理*/}
                                    <Route exact path="/linksort" component={LinkType}/>{/*友情链接管理*/}
                                    <Route exact path="/screen" component={Screen}/>{/*筛选条件*/}
                                    <Route exact path="/attribute" component={Attribute}/>{/*属性管理*/}


                                    {/*<Route path="/houselist" component={EstateManag}/>/!*楼盘列表*!/*/}

                                    <Route path="/houselist"
                                        render={() =>
                                            <Switch>
                                                <Route exact path="/houselist" component={EstateManag}/>{/*楼盘列表*/}
                                                <Route exact path="/houselist/apartment/:id" component={Apartment}/>{/*楼盘户型*/}
                                                <Route exact path="/houselist/album/:id" component={Album}/>{/*楼盘相册*/}
                                                <Route exact path="/houselist/dynamic/:id" component={Dynamic}/>{/*楼盘动态*/}
                                                <Route exact path="/houselist/sandTable/:id" component={SandTable}/>{/*沙盘*/}
                                            </Switch>
                                    }/>


                                    {/*<Route path="/houselist/apartment/:id" component={Apartment}/>/!*楼盘户型*!/*/}
                                    {/*<Route path="/houselist/album/:id" component={Album}/>/!*楼盘相册*!/*/}
                                    {/*<Route path="/houselist/dynamic/:id" component={Dynamic}/>/!*楼盘动态*!/*/}
                                    {/*<Route path="/houselist/sandTable/:id" component={SandTable}/>/!*沙盘*!/*/}
                                    <Route exact path="/developer" component={Developers}/>{/*开发商管理*/}
                                    <Route exact path="/houseadd" component={AddHouselistModal}/>{/*添加楼盘列表*/}

                                    <Route exact path="/articlesort" component={ArticleType}/>{/*文章分类*/}
                                    <Route exact path="/list" component={ArticleList}/>{/*文章列表*/}
                                    <Route path="/add" component={AddArticle}/>{/*添加文章*/}
                                    <Route exact path="/recycle" component={RecycleBin}/>{/*回收站*/}

                                    <Route exact path="/module" component={ModuleConfig}/>{/*会员管理*/}
                                    <Route exact path="/member" component={UserMember}/>{/*会员管理*/}
                                    <Route exact path="/agent" component={AgentManag}/>{/*经济人管理*/}
                                    <Route exact path="/questions" component={QueAnsList}/>{/*问答列表*/}
                                    <Route exact path="/comment" component={CommentList}/>{/*评论列表*/}
                                    <Route exact path="/newhouse" component={NewHouse}/>{/*新房预约*/}
                                    <Route exact path="/rentalhouse" component={RentalHousing}/>{/*团购报名*/}
                                    <Route exact path="/secondhouse" component={SecondHand}/>{/*活动报名*/}
                                    {/*<Route path="/userCore/menuManage" render={() =>*/}
                                        {/*<Switch>*/}
                                            {/*<Route path="/userCore/menuManage" component={MenuManage}/>*/}
                                            {/*<Route path="/userCore/menuManage/editModal" component={MenuManageEditModal}/>*/}
                                        {/*</Switch>*/}
                                    {/*}/>*/}
                                    <Route component={NoFind} />
                                    {/*<Redirect from="/" to="/home" />*/}
                                </Switch>
                            </Index>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}