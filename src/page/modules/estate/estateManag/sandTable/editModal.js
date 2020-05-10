import React from 'react'
import {Modal, Switch, Form, Input, Select, DatePicker} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;

class editModal extends React.Component {
    state = {
        item:this.props.item || {},
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
            let url = "floor/sand/add";
            let param = values;


            if (this.props.item.id) {
                url = "floor/sand/update";
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
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
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
                    <FormItem
                        {...formItemLayout}
                        label="楼栋名称"
                    >
                        {getFieldDecorator('title', {
                            initialValue: (this.state.item && this.state.item.title )|| '',
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
                            <Input type="text"  placeholder="楼栋名称" />
                        )}
                    </FormItem>
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
                        label="单元数"
                    >
                        {getFieldDecorator('unit', {
                            initialValue: (this.state.item && this.state.item.unit )|| '',
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
                            <Input type="text"  placeholder="单元数" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电梯数"
                    >
                        {getFieldDecorator('elevator', {
                            initialValue: (this.state.item && this.state.item.elevator )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="电梯数" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="总楼层"
                    >
                        {getFieldDecorator('floor_num', {
                            initialValue: (this.state.item && this.state.item.floor_num )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="总楼层" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="总户数"
                    >
                        {getFieldDecorator('room_num', {
                            initialValue: (this.state.item && this.state.item.room_num )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="总户数" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开盘时间"
                        colon={true}
                    >
                        {getFieldDecorator('open_time',config)(
                            <DatePicker showTime placeholder="Select Time" style={{width:'100%'}}  />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="交房时间"
                        colon={true}
                    >
                        {getFieldDecorator('complete_time',config)(
                            <DatePicker showTime placeholder="Select Time" style={{width:'100%'}}  />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="销售状态"
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
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;