import React from 'react'
import {Form,Input, Button,Radio} from 'antd'
// import './index.less'
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

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
        /**
         * 说明：模块配置接口方法
         * */
        axios.get("user/setting",null,
            result=> {
            console.log()
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
        axios.post("user/setting",this.state.param,
            result=> {
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
                sm: { span: 4 },
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
                    offset: 4,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };
        return(
            <div className="tabs-box">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="开启注册"
                    >
                        {getFieldDecorator('open_reg', {
                            initialValue: (this.state.data && this.state.data.open_reg) || '',
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
                                <Radio value={'0'}>否</Radio>
                                <Radio value={'1'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="注册发送短信"
                    >
                        {getFieldDecorator('reg_sms', {
                            initialValue: (this.state.data && this.state.data.reg_sms) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="预约报名发送短信"
                    >
                        {getFieldDecorator('subscribe_sms', {
                            initialValue: (this.state.data && this.state.data.subscribe_sms) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="评论经纪人是否审核"
                    >
                        {getFieldDecorator('check_comment', {
                            initialValue: (this.state.data && this.state.data.check_comment) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="提交问题是否需要审核"
                    >
                        {getFieldDecorator('check_question', {
                            initialValue: (this.state.data && this.state.data.check_question) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="回答问题是否需要审核"
                    >
                        {getFieldDecorator('check_answer', {
                            initialValue: (this.state.data && this.state.data.check_answer) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="发布/编辑二手房是否需要审核"
                    >
                        {getFieldDecorator('check_second', {
                            initialValue: (this.state.data && this.state.data.check_second) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="发布/编辑出租房是否需要审核"
                    >
                        {getFieldDecorator('check_rental', {
                            initialValue: (this.state.data && this.state.data.check_rental) || '',
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
                                <Radio value={'1'}>否</Radio>
                                <Radio value={'2'}>是</Radio>
                            </RadioGroup>
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