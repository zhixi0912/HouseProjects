import React from 'react'
import {Modal, Switch,Form,Input,Select} from 'antd';
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";

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
            let url = "poster_space/add";
            let param = values;


            if (this.props.item.id) {
                url = "poster_space/update";
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
                NotificationMixin.success("提交成功！")
                this.props.onManualClose && this.props.onManualClose();
            },result=>{
                NotificationMixin.error("提交失败！")
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
                        label="广告位名称："
                    >
                        {getFieldDecorator('names', {
                            initialValue: (this.state.item && this.state.item.names )|| '',
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
                            <Input type="text"  placeholder="广告位名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型："
                    >
                        {getFieldDecorator('type', {
                            initialValue: (this.state.item && this.state.item.type) || '',
                            rules: [{
                                required: true,
                                message:'请选择类型'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择类型 </Option>
                                <Option value="1"> 矩形横幅 </Option>
                                <Option value="2"> 对联广告 </Option>
                                <Option value="3"> 图片列表 </Option>
                                <Option value="4"> PC轮播图 </Option>
                                <Option value="5"> 手机轮播图 </Option>
                                <Option value="6"> 文字广告 </Option>
                                <Option value="7"> 代码广告 </Option>
                            </Select>
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
                        label="广告位宽度："
                    >
                        {getFieldDecorator('width', {
                            initialValue: (this.state.item && this.state.item.width )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="广告位宽度" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告位高度："
                    >
                        {getFieldDecorator('height', {
                            initialValue: (this.state.item && this.state.item.height )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="广告位高度" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="显示广告数："
                    >
                        {getFieldDecorator('display_num', {
                            initialValue: (this.state.item && this.state.item.display_num )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="显示广告数" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="说明："
                    >
                        {getFieldDecorator('description', {
                            initialValue: '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <TextArea rows={4} placeholder="说明" />
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;