import React from 'react'
import {Modal, Switch,Form,Input,Select} from 'antd';
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
            let url = "nav";
            let param = values;


            if (this.props.item.id) {
                url = "nav";
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
                    <FormItem
                        {...formItemLayout}
                        label="菜单名称："
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
                            <Input type="text"  placeholder="名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="状态："
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
                        label="图标："
                    >
                        {getFieldDecorator('icon', {
                            initialValue: '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="icon" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="导航位置："
                    >
                        {getFieldDecorator('pos', {
                            initialValue: (this.state.item && this.state.item.pos_name )|| '',
                            rules: [{
                                required: true,
                                message:'请选择导航位置'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择导航位置 </Option>
                                <Option value="1"> 页头菜单 </Option>
                                <Option value="2"> 页脚菜单 </Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="打开方式："
                    >
                        {getFieldDecorator('open_type', {
                            initialValue: (this.state.item && this.state.item.open_type_name )|| '',
                            rules: [{
                                required: true,
                                message:'请选择导航位置'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择导航位置 </Option>
                                <Option value="1"> 新页面 </Option>
                                <Option value="2"> 当前页面 </Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序："
                    >
                        {getFieldDecorator('ordid', {
                            initialValue: (this.state.item && this.state.item.ordid )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="排序" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="seo标题："
                    >
                        {getFieldDecorator('seo_title', {
                            initialValue: (this.state.item && this.state.item.seo_title )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="seo标题" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="seo关键词："
                    >
                        {getFieldDecorator('seo_keys', {
                            initialValue: (this.state.item && this.state.item.seo_keys )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="seo关键词" />
                        )}
                    </FormItem>



                    <FormItem
                        {...formItemLayout}
                        label="SEO描述："
                    >
                        {getFieldDecorator('seo_desc', {
                            initialValue: '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <TextArea rows={4} placeholder="SEO描述" />
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;