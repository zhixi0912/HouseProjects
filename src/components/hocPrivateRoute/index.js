import React from 'react';
import {Route,Redirect,withRouter} from 'react-router-dom';

function withHocPrivateRoute(WrappedComponent,hocProps){
    if(!!!WrappedComponent){
        throw new Error("缺少组件参数");
        return false;
    }
    //withRouter 也是一个高阶组件 传递 history
    return withRouter(
        class extends React.Component{
            constructor(props) {
                super(props);
            }
            componentWillMount(){
                let  isAuthenticated =  localStorage.getItem("token") ? true :false;
                console.log('isAuthenticated-->', isAuthenticated,this.props)
                this.setState({isAuthenticated:isAuthenticated})
                if(!isAuthenticated){
                    const {history} = this.props;
                    if(this.props.location.pathname === '/'){
                        history.replace("/login");
                    } else {
                        setTimeout(() => {
                            history.replace("/login");
                        }, 1000)
                    }
                }
            }

            render(){
                return this.state.isAuthenticated ?  (
                    <WrappedComponent {...hocProps} />
                ) : ("请重新登录");
            }
        }
    )
}


export default withHocPrivateRoute;