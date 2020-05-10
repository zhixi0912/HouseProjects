import React from 'react'
import {Form,Input, Button,Radio} from 'antd'
import './index.less'
import NotificationMixin from "../../../../../../components/notification";
import axios from "../../../../../../axios";

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
        axios.get("setting/water",null,
            result=> {
                console.log("水印设置--------->",result)
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
        axios.post("setting/water",this.state.param,
            result=> {
                console.log("水印设置参数--------->",result)
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
                        label="是否开启水印"
                    >
                        {getFieldDecorator('open_water', {
                            initialValue: (this.state.data && this.state.data.open_water) || '0',
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
                        label="水印类型"
                    >
                        {getFieldDecorator('water_type', {
                            initialValue: (this.state.data && this.state.data.water_type) || '1',
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
                                <Radio value={'2'}>文字</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="水印图片路径"
                    >
                        {getFieldDecorator('water_img', {
                            initialValue: (this.state.data && this.state.data.water_img) || '',
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
                            <Input type="text" placeholder="水印图片路径" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="水印文字"
                    >
                        {getFieldDecorator('water_word', {
                            initialValue: (this.state.data && this.state.data.water_word) || '',
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
                            <Input type="text" placeholder="水印文字" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="水印透明度"
                    >
                        {getFieldDecorator('water_alpha', {
                            initialValue: (this.state.data && this.state.data.water_alpha) || '',
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
                            <Input type="text" placeholder="水印透明度" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="文字旋转角度"
                    >
                        {getFieldDecorator('water_angle', {
                            initialValue: (this.state.data && this.state.data.water_angle) || '',
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
                            <Input type="text" placeholder="文字旋转角度" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="水印文字大小"
                    >
                        {getFieldDecorator('water_size', {
                            initialValue: (this.state.data && this.state.data.water_size) || '',
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
                            <Input type="text" placeholder="水印文字大小" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="水印文字颜色"
                    >
                        {getFieldDecorator('water_color', {
                            initialValue: (this.state.data && this.state.data.water_color) || '',
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
                            <Input type="text" placeholder="水印文字颜色" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="水印位置"
                    >
                        {getFieldDecorator('water_pos', {
                            initialValue: (this.state.data && this.state.data.water_pos) || '1',
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
                                <Radio value={'1'}>顶部居左</Radio>
                                <Radio value={'2'}>顶部居中</Radio>
                                <Radio value={'3'}>顶部居右</Radio>
                                <Radio value={'4'}>左侧居中</Radio>
                                <Radio value={'5'}>居中</Radio>
                                <Radio value={'6'}>右侧居中</Radio>
                                <Radio value={'7'}>底部居左</Radio>
                                <Radio value={'8'}>底部居中</Radio>
                                <Radio value={'9'}>底部居右</Radio>
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