import React from 'react'
import {Modal, Switch,Form,Input,Select,DatePicker } from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";
// import locale from 'antd/es/locale-provider/zh_CN';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;

class editModal extends React.Component {
    state = {
        item:this.props.item || {},
        house_title: this.props.house_title || '',
        startValue: null,
        endValue: null,
        endOpen: false,
    }
    componentWillMount() {
        console.log("item--->",this.state.item,this.state.house_title)
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
            let url = "floor/type/add";
            let param = values;


            if (this.props.item.id) {
                url = "floor/type/update";
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
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        const { startValue, endValue, endOpen } = this.state;
        return(
            <Modal
                title={this.props.title}
                visible={true}
                maskClosable={false}
                onOk={this.handleSubmit}
                onCancel={this.hideModal}
                width={600}
            >
                <Form layout="horizontal" >
                    <FormItem
                        {...formItemLayout}
                        label="所属楼盘"
                    >
                        <Input type="text" value={this.state.house_title || ''} disabled/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="户型名称"
                        colon={true}
                    >
                        {getFieldDecorator('title', {
                            initialValue: (this.state.item && this.state.item.title )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="户型名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="室"
                        colon={true}
                    >
                        {getFieldDecorator('room', {
                            initialValue: (this.state.item && this.state.item.room )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="室" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="客厅"
                        colon={true}
                    >
                        {getFieldDecorator('living_room', {
                            initialValue: (this.state.item && this.state.item.living_room )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="客厅" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="厨房"
                        colon={true}
                    >
                        {getFieldDecorator('kitchen', {
                            initialValue: (this.state.item && this.state.item.kitchen )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="厨房" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="卫生间"
                        colon={true}
                    >
                        {getFieldDecorator('toilet', {
                            initialValue: (this.state.item && this.state.item.toilet )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="卫生间" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="面积"
                        colon={true}
                    >
                        {getFieldDecorator('acreage', {
                            initialValue: (this.state.item && this.state.item.acreage )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="面积" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="售价"
                        colon={true}
                    >
                        {getFieldDecorator('price', {
                            initialValue: (this.state.item && this.state.item.price )|| '',
                            rules: [{
                                required: true,
                                validator: (rule, value, callback) => {
                                    if (!value || (value && value.length > 50)) {
                                        callback(new Error('不能为空且长度不超过50!'));
                                        this.setState({tabsActiveKey:'1'})
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Input type="text"  placeholder="售价" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="缩略图"
                        colon={true}
                    >
                        {getFieldDecorator('img', {
                            initialValue: (this.state.item && this.state.item.img )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="缩略图" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="销售状态"
                        colon={true}
                    >
                        {getFieldDecorator('sale_status', {
                            initialValue: (this.state.item && this.state.item.sale_status )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="销售状态" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="特色"
                        colon={true}
                    >
                        {getFieldDecorator('characteristic', {
                            initialValue: (this.state.item && this.state.item.characteristic )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <TextArea type="text"  placeholder="特色" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;