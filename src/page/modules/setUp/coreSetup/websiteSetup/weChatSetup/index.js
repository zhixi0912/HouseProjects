import React from 'react'
import {Form,Input, Button} from 'antd'
import './index.less'
import axios from "../../../../../../axios";
import NotificationMixin from "../../../../../../components/notification";

class webSetup extends React.Component{
    state = {
        data:[],
        loading: false,
        param:{}
    }
    componentWillMount(){
        this.fetch()
    }
    fetch=()=>{
        axios.get("setting/weixin",null,
            result=> {
                console.log("微信设置--------->",result)
                this.setState({data:result.result ||[]})
            },
            result=> {

            }
        );
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.putFile(values)
            }
        });
    }
    putFile=(values)=>{
        axios.post("setting/weixin",values,
            result=> {
                console.log("微信设置参数--------->",result)
                NotificationMixin.success("修改成功！")
            },
            result=> {

            }
        );
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 2,
                },
            },
        };
        return(
            <div className="tabs-box">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="appid"
                    >
                        {getFieldDecorator('appid', {
                            initialValue: (this.state.data && this.state.data.appid) || '',
                            rules: [{
                                // required: true,
                                // validator: (rule, value, callback) => {
                                //     if (!value || (value && value.length > 50)) {
                                //         callback(new Error('不能为空且长度不超过50!'));
                                //     } else {
                                //         callback();
                                //     }
                                // }
                            }],
                        })(
                            <Input type="text" placeholder="appid" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="appsecret"
                    >
                        {getFieldDecorator('appsecret', {
                            initialValue: (this.state.data && this.state.data.appsecret) || '',
                            rules: [{
                                // required: true,
                                // validator: (rule, value, callback) => {
                                //     if (!value || (value && value.length > 50)) {
                                //         callback(new Error('不能为空且长度不超过50!'));
                                //     } else {
                                //         callback();
                                //     }
                                // }
                            }],
                        })(
                            <Input type="text" placeholder="appsecret" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="tokens"
                    >
                        {getFieldDecorator('tokens', {
                            initialValue: (this.state.data && this.state.data.tokens) || '',
                            rules: [{
                                // required: true,
                                // validator: (rule, value, callback) => {
                                //     if (!value || (value && value.length > 50)) {
                                //         callback(new Error('不能为空且长度不超过50!'));
                                //     } else {
                                //         callback();
                                //     }
                                // }
                            }],
                        })(
                            <Input type="text" placeholder="tokens" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="encodingaeskey"
                    >
                        {getFieldDecorator('encodingaeskey', {
                            initialValue: (this.state.data && this.state.data.encodingaeskey) || '',
                            rules: [{
                                // required: true,
                                // validator: (rule, value, callback) => {
                                //     if (!value || (value && value.length > 50)) {
                                //         callback(new Error('不能为空且长度不超过50!'));
                                //     } else {
                                //         callback();
                                //     }
                                // }
                            }],
                        })(
                            <Input type="text" placeholder="encodingaeskey" />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

webSetup = Form.create()(webSetup);
export default webSetup;