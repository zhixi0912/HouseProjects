import React from 'react'
// import { Redirect } from 'react-router-dom';
import {Card, Form, Input, Button,Icon, Checkbox,notification } from 'antd';
import './index.less'
import axios from "../../axios";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18, offset: 6 },
};

class login extends React.Component{
    state = {
        checkboxVal: true, //是否记住帐号状态
    }
    componentWillMount(){
        //location.href = 'main/index.html';
    }
    componentDidMount(){
        this.loadAccountInfo();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post("token/app",values,
                    result=> {
                        if(result.result){
                            let token = result.result.token;
                            localStorage.setItem('token', JSON.stringify(token)); //token缓存
                            if(this.state.checkboxVal){
                                let accountInfo = values.ac+ '&' +values.se
                                let Days = 3;  //cookie保存时间
                                let exp = new Date();
                                exp.setTime(exp.getTime() + Days*24*60*60*1000);
                                document.cookie = 'accountInfo' + "="+ escape (accountInfo) + ";expires=" + exp.toGMTString();

                            }else {
                                let exp = new Date();
                                exp.setTime(exp.getTime() - 1);
                                let accountInfo = document.cookie
                                var cookie_pos = accountInfo.indexOf('accountInfo');

                                if(cookie_pos!=-1){
                                    document.cookie= 'accountInfo' + "="+' '+";expires="+exp.toGMTString();
                                }

                                this.state.name = '';
                                this.state.password = '';

                            }
                            window.location.href = '/#/home';
                            console.log(111)
                            // this.props.history.push({pathname:'/home'})
                        }

                    },
                    result=> {
                        notification.open({
                            message: '提示',
                            description: '帐号或密码错误！',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                );




            }
        });






    }
//判断cookie中是否有账号信息，有就可以进行预填写，没有则直接返回
    loadAccountInfo = () => {

        //读取cookie长度，看是否存在（测试）
        /*  let accountInfo123 = document.cookie
          var cookie_pos = accountInfo123.indexOf('accountInfo');
          console.log(cookie_pos + '@@@@@@@')*/

        //读取cookie
        let arr,reg=new RegExp("(^| )"+'accountInfo'+"=([^;]*)(;|$)");
        let accountInfo =''
        if(arr=document.cookie.match(reg)){
            accountInfo =  unescape(arr[2]);
        }
        else{
            accountInfo = null;
        }



        if(Boolean(accountInfo) == false){
            return false;
        }else{
            let userName = "";
            let passWord = "";
            // let typeLogin = "";

            let i=new Array()
            i = accountInfo.split("&");
            userName = i[0];
            passWord = i[1];
            // typeLogin = i[2]

            this.setState({
                username : userName,
                password : passWord,
                // rememberPassword : true,
                // typeLogin : typeLogin
            })

            /* this.state.username = userName;
             this.state.password = passWord;
             this.state.rememberPassword = true;*/

            /*console.log(this.state.username + this.state.password)*/
        }

        /* let accountInfo = getCookie('accountInfo');
         if(Boolean(accountInfo) == false){
             return false;
         }else{
             let userName = "";
             let passWord = "";
             let index = accountInfo.indexOf("&");
             userName = accountInfo.substring(0,index);
             passWord = accountInfo.substring(index+1);
             this.state.username = userName;
             this.state.password = passWord;
             this.state.rememberPassword = true;
         }*/
    }
    handleChange = (e) => {
        this.setState({
            checkboxVal: e.target.checked,
        }, () => {
            this.props.form.validateFields(['nickname'], { force: true });

        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login-con'>
                <div className='login-main'>
                    <div className='login-box'>

                        <Card title="后台管理系统" className='login-box' bordered={false}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('user_name', {
                                        initialValue: this.state.username || '',
                                        rules: [{ required: true, message: '请输入帐号!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        initialValue: this.state.password || '',
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox
                                        checked={this.state.checkboxVal}
                                        onChange={this.handleChange}
                                    >
                                        记住登录状态
                                    </Checkbox>
                                    <a className="login-form-forgot" href="">
                                        忘记密码？
                                    </a>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                    {/*Or <a href="">register now!</a>*/}
                                </Form.Item>
                            </Form>










                            {/*<Form onSubmit={this.handleSubmit} autoComplete="off">*/}
                                {/*<Form.Item {...formItemLayout} label="帐号">*/}
                                    {/*{getFieldDecorator('ac', {*/}
                                        {/*rules: [{*/}
                                            {/*required: true,*/}
                                            {/*message: 'Please input your name',*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Input placeholder="Please input your name" />*/}
                                    {/*)}*/}
                                {/*</Form.Item>*/}
                                {/*<Form.Item {...formItemLayout} label="密码">*/}
                                    {/*{getFieldDecorator('se', {*/}
                                        {/*rules: [{*/}
                                            {/*required: this.state.checkNick,*/}
                                            {/*message: 'Please input your password',*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Input type="password" placeholder="Please input your nickname" />*/}
                                    {/*)}*/}
                                {/*</Form.Item>*/}
                                {/*<Form.Item {...formTailLayout}>*/}
                                    {/*<Checkbox*/}
                                        {/*checked={this.state.checkNick}*/}
                                        {/*onChange={this.handleChange}*/}
                                    {/*>*/}
                                        {/*记住登录状态*/}
                                    {/*</Checkbox>*/}
                                {/*</Form.Item>*/}
                                {/*<Form.Item {...formTailLayout}>*/}
                                    {/*<Button type="primary" htmlType="submit" >*/}
                                        {/*登录*/}
                                    {/*</Button>*/}
                                {/*</Form.Item>*/}
                            {/*</Form>*/}
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
login = Form.create()(login);
export default login;