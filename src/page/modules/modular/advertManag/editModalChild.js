import React from 'react'
import {Modal, Switch,Form,Input,Select,DatePicker } from 'antd';
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";
import locale from 'antd/es/locale-provider/zh_CN';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;

class editModal extends React.Component {
    state = {
        item:this.props.item || {},
        startValue: null,
        endValue: null,
        endOpen: false,
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
            let url = "poster";
            let param = values;


            if (this.props.item.id) {
                url = "poster";
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







      
    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
        return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };
    
    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
        return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };
    
    onChange = (field, value) => {
        this.setState({
        [field]: value,
        });
    };
    
    onStartChange = value => {
        this.onChange('startValue', value);
    };
    
    onEndChange = value => {
        this.onChange('endValue', value);
    };
    
    handleStartOpenChange = open => {
        if (!open) {
        this.setState({ endOpen: true });
        }
    };
    
    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
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
                <Form  layout="horizontal" >
                    <FormItem
                        {...formItemLayout}
                        label="所属城市："
                    >
                        {getFieldDecorator('often', {
                            initialValue: (this.state.item && this.state.item.often) || '',
                            rules: [{
                                required: true,
                                message:'请选择所属城市'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择所属城市 </Option>
                                <Option value="0"> 海南 </Option>
                                <Option value="1"> 海口 </Option>
                            </Select>
                        )}
                    </FormItem>
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
                        label="广告类型："
                    >
                        {getFieldDecorator('type_name', {
                            initialValue: (this.state.item && this.state.item.type_name) || '',
                            rules: [{
                                required: true,
                                message:'请选择广告类型'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择广告类型 </Option>
                                <Option value="Images"> 图片 </Option>
                                <Option value="flash"> 动画 </Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="有效时间："
                    >
                        {getFieldDecorator('url', {
                            initialValue: (this.state.item && this.state.item.time )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                           <div>
                               <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={startValue}
                                placeholder="Start"
                                locale={locale}
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                                />
                                <span style={{marginLeft:'5px',marginRight:'5px'}}>至</span>
                                <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={endValue}
                                placeholder="End"
                                locale={locale}
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                                />
                           </div>
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
                        label="链接地址："
                    >
                        {getFieldDecorator('url', {
                            initialValue: (this.state.item && this.state.item.url )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="链接地址" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="提示文字："
                    >
                        {getFieldDecorator('alt', {
                            initialValue: (this.state.item && this.state.item.alt )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="提示文字" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="图片路径："
                    >
                        {getFieldDecorator('img', {
                            initialValue: (this.state.item && this.state.item.img )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="图片路径" />
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;