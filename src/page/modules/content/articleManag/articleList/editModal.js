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
        typeData:[
            {id:'0', title: '楼盘资讯', key: '01'},
            {id:'1', title: '购房宝典', key: '02'},
            {id:'2', title: '房产百科', key: '03'},
            {id:'3', title: '楼盘导购', key: '04'},
            {id:'4', title: '优惠活动', key: '05'},
            {id:'5', title: '购房知识', key: '06'},
        ],
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
            let url = "article/add";
            let param = values;


            if (this.props.item.id) {
                url = "article/update";
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
                        label="所属分类"
                    >
                        {getFieldDecorator('cate_id', {
                            initialValue: (this.state.item && this.state.item.cate_id )|| '',
                            rules: [{
                                required: true,
                                message:'请选择所属分类'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择 </Option>
                                {
                                    this.state.typeData && this.state.typeData.map((item, index) => {
                                        return (<Option value={item.id} key={item.id}> {item.title} </Option>)
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
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
                        label="简介"
                    >
                        {getFieldDecorator('description', {
                            initialValue: (this.state.item && this.state.item.description )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <TextArea type="text"  placeholder="简介" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="内容"
                    >
                        {getFieldDecorator('info', {
                            initialValue: (this.state.item && this.state.item.info )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <TextArea type="text"  placeholder="内容" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="浏览数"
                    >
                        {getFieldDecorator('hits', {
                            initialValue: (this.state.item && this.state.item.hits )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="浏览数" />
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