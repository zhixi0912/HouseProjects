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
        axios.get("setting/storage",null,
            result=> {
                console.log("云存储设置--------->",result)
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
        axios.post("setting/storage",this.state.param,
            result=> {
                console.log("云存储参数--------->",result)
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
                        label="是否开启云存储"
                    >
                        {getFieldDecorator('cloud_storage', {
                            initialValue: (this.state.data && this.state.data.cloud_storage) || '0',
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
                                <Radio value={'0'}>关闭</Radio>
                                <Radio value={'1'}>开启</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="上传类型"
                    >
                        {getFieldDecorator('upload_type', {
                            initialValue: (this.state.data && this.state.data.upload_type) || '1',
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
                                <Radio value={'1'}>图片</Radio>
                                <Radio value={'2'}>音视频</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="类型"
                    >
                        {getFieldDecorator('type', {
                            initialValue: (this.state.data && this.state.data.type) || '1',
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
                                {/*<Radio value={'2'}>七牛云</Radio>*/}
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="accessKey"
                    >
                        {getFieldDecorator('access_key', {
                            initialValue: (this.state.data && this.state.data.access_key) || '',
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
                            <Input type="text" placeholder="accessKey" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="secretKey"
                    >
                        {getFieldDecorator('secret_key', {
                            initialValue: (this.state.data && this.state.data.secret_key) || '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text" placeholder="secretKey" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="存储空间名"
                    >
                        {getFieldDecorator('bucket', {
                            initialValue: (this.state.data && this.state.data.bucket) || '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text" placeholder="存储空间名" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="资源访问域名"
                    >
                        {getFieldDecorator('domain', {
                            initialValue: (this.state.data && this.state.data.domain) || '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text" placeholder="资源访问域名" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="EndPoint"
                    >
                        {getFieldDecorator('end_point', {
                            initialValue: (this.state.data && this.state.data.end_point) || '',
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
                            <Input type="text" placeholder="EndPoint" />
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