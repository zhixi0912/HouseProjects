import React from 'react'
import {Form,Input, Button,Radio} from 'antd'
import './index.less'
import axios from "../../../../../../axios";
import NotificationMixin from "../../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;
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
        axios.get("setting/sms",null,
            result=> {
                console.log("短信设置--------->",result)
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
                console.log('Received values of form: ', values);
                this.setState({
                    param:values ||[]
                },this.putFile)
            }
        });
    }
    putFile=()=>{
        axios.post("setting/sms",this.state.param,
            result=> {
                console.log("短信设置参数--------->",result)
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
                        label="短信平台"
                    >
                        {getFieldDecorator('platform', {
                            initialValue: (this.state.data && this.state.data.platform) || '1',
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
                            <RadioGroup>
                                <Radio value={'1'}>阿里云</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Access Key ID"
                    >
                        {getFieldDecorator('access_key_id', {
                            initialValue: (this.state.data && this.state.data.access_key_id) || '',
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
                            <Input type="text" placeholder="Access Key ID" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Access Key Secret"
                    >
                        {getFieldDecorator('access_key_secret', {
                            initialValue: (this.state.data && this.state.data.access_key_secret) || '',
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
                            <Input type="text" placeholder="Access Key Secret" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="短信签名"
                    >
                        {getFieldDecorator('sign', {
                            initialValue: (this.state.data && this.state.data.sign) || '',
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
                            <Input type="text" placeholder="短信签名" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="验证码短信模板ID"
                    >
                        {getFieldDecorator('verify', {
                            initialValue: (this.state.data && this.state.data.verify) || '',
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
                            <Input type="text" placeholder="验证码短信模板ID" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="短信平台"
                    >
                        {getFieldDecorator('platform_name', {
                            initialValue: (this.state.data && this.state.data.platform_name) || '',
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
                            <Input type="text" placeholder="短信平台" />
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