import React from 'react'
import {Modal, TreeSelect, Form, Input, Select, Icon, Switch} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;

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
        value: undefined,
    }
    componentWillMount() {
        // this.fetch()
    }
    treeSelectChange = value => {
        console.log(value);
        this.setState({ value });

    };
    fetch=()=>{
        /**
         * 说明：文章分类父级树状选择器数据接口
         * */
        // axios.get("menu/list",null,
        //     result=> {
        //         this.setState({data:result.result ||[]})
        //     },
        //     result=> {
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
            let url = "article/cate/add";
            let param = values;
            if (this.props.item.id) {
                url = "article/cate/update";
                param.id = this.props.item.id;
                if(param.is_sys === !!param.is_sys){
                    param.is_sys ? param.is_sys = 1 : param.is_sys = 0
                }
            }
            this.postFile(url,param)
        })
    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
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
                // width={680}
            >
                <Form  layout="horizontal" >
                    <FormItem
                        {...formItemLayout}
                        label="上级栏目"
                    >
                        {getFieldDecorator('cate_id', {
                            initialValue: (this.state.item && this.state.item.cate_id )|| '',
                            rules: [{
                                required: true,
                                message:'请选择上级分类'
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
                        label="栏目名称"
                    >
                        {getFieldDecorator('names', {
                            initialValue: (this.state.item && this.state.item.names) || '',
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
                            <Input type="text"  placeholder="栏目名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="栏目别名"
                    >
                        {getFieldDecorator('alias', {
                            initialValue: (this.state.item && this.state.item.alias) || '',
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
                            <Input type="text"  placeholder="栏目别名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="状态"
                        colon={true}
                    >
                        {getFieldDecorator('sale_status', {
                            initialValue: (this.state.item && this.state.item.sale_status )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={(this.state.item && this.state.item.sale_status === '1' ) ? true:false} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="排序"
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
                        label="seo关键词"
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
                        label="seo描述"
                    >
                        {getFieldDecorator('seo描述', {
                            initialValue: (this.state.item && this.state.item.seo描述 )|| '',
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