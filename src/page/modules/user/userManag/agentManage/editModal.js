import React from 'react'
import {Modal, Switch, Form, Input, Select, Radio, Checkbox, Row, Col} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class editModal extends React.Component {
    state = {
        item:this.props.item || {},
        typeData:[
            {id:'0', title: '楼盘资讯', key: '01'},
            {id:'1', title: '购房宝典', key: '02'},
            {id:'2', title: '房产百科', key: '03'},
            {id:'3', title: '楼盘导购', key: '04'},
            {id:'4', title: '优惠活动', key: '05'},
            {id:'5', title: '购房知识', key: '06'},
        ],
        cateList: [
            {id:'1', title: '客户信赖'},
            {id:'2', title: '专业细心'},
            {id:'3', title: '耐心热情'},
            {id:'4', title: '带着活跃'},
            {id:'5', title: '专车接送'},
            {id:'6', title: '法律咨询'},
            {id:'7', title: '全程代办'}
        ]
    }
    componentWillMount() {
        console.log("item--->",this.state.item)
    }
    fetch=(id)=>{
        // axios.get("topic/"+id,null,
        //     result=> {
        //         this.setState({
        //             data:result.data ||{},
        //             authorName:result.data.author.loginname || '',
        //             replies:result.data.replies || [],
        //         })
        //     },
        //     result=> {
        //
        //     }
        // );
    }
    hideModal=()=> {
        /**
         * 说明：弹窗关闭事件
         * */
        this.props.onCancel && this.props.onCancel();
    }
    handleSubmit=()=>{
        /**
         * 说明：表单提交事件
         * */
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            // console.log("values",values)
            let url = "user";
            let param = values;


            if (this.props.item.id) {
                param.id = this.props.item.id;
                if(param.is_sys === !!param.is_sys){
                    param.is_sys ? param.is_sys = 1 : param.is_sys = 0
                }
                // console.log("param----->",param)
            }
            this.postFile(url,param)
        })
    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                // console.log("修改成功--------->",result)
                NotificationMixin.success("修改成功！")
                this.props.onManualClose && this.props.onManualClose();
            },result=>{
                NotificationMixin.error("修改失败！")
            }
        );

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return(
            <Modal
                title={this.props.title}
                visible={true}
                maskClosable={false}
                onOk={this.handleSubmit}
                onCancel={this.hideModal}
                // width={800}
            >
                <Form  layout="horizontal" >
                    <Form.Item
                        {...formItemLayout}
                        label="所属模型"
                    >
                        {getFieldDecorator('model', {
                            initialValue: '2',
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
                                <Radio value={'1'} disabled>普通用户</Radio>
                                <Radio value={'2'} disabled>经纪人</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <FormItem
                        {...formItemLayout}
                        label="状态"
                    >
                        {getFieldDecorator('status', {
                            initialValue: (this.state.item && this.state.item.status )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.item.status ==='1' ? true:false} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                    >
                        {getFieldDecorator('user_name', {
                            initialValue: (this.state.item && this.state.item.user_name )|| '',
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
                            <Input type="text"  placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号码"
                    >
                        {getFieldDecorator('mobile', {
                            initialValue: (this.state.item && this.state.item.mobile )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="手机号码" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            initialValue: (this.state.item && this.state.item.password )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="昵称"
                    >
                        {getFieldDecorator('nick_name', {
                            initialValue: (this.state.item && this.state.item.nick_name )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="昵称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            initialValue: (this.state.item && this.state.item.email )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="邮箱" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否推荐"
                    >
                        {getFieldDecorator('recommon', {
                            initialValue: (this.state.item && this.state.item.recommon )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={this.state.item.status ==='1' ? true:false} />
                        )}
                    </FormItem>
                    <Form.Item
                        {...formItemLayout}
                        label="分类标签"
                    >
                        {getFieldDecorator('cate_id', {
                            initialValue: (this.state.data && this.state.data.cate_id) || [],
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
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    {
                                        this.state.cateList && this.state.cateList.map((item, index) => {
                                            return (
                                                <Col span={8} key={index}>
                                                    <Checkbox value={item.id} key={item.id}>{item.title}</Checkbox>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Checkbox.Group>
                        )}
                    </Form.Item>
                </Form >
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;