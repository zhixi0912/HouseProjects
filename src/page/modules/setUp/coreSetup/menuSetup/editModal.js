import React from 'react'
import {Modal, TreeSelect,Form,Input,Select,Icon} from 'antd';
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
        data:[],
        value: undefined,
    }
    componentWillMount() {
        this.fetch()
    }
    treeSelectChange = value => {
        console.log(value);
        this.setState({ value });

    };
    fetch=()=>{
        /**
         * 说明：菜单管理父级树状选择器数据接口
         * */
        axios.get("menu/list",null,
            result=> {
                console.log("菜单设置------11--->",result)
                this.setState({data:result.result.data ||[]})
            },
            result=> {

            }
        );
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
            let url = "menu";
            let param = values;


            if (this.props.item.id) {
                param.id = this.props.item.id;
                if(param.is_sys === !!param.is_sys){
                    param.is_sys ? param.is_sys = 1 : param.is_sys = 0
                }
                console.log("param----->",param)
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
    treeNodeOne=(dataList)=>{
        /**
         * 说明：父级ID树选择器方法
         * */
        let treeNodeOne = [];
         dataList.map(item=>{
             if(item.children){
                 treeNodeOne.push(
                     <TreeNode value={item.id} title={item.title} key={item.id} >
                         {this.treeNodeOne(item.children)}
                     </TreeNode>
                 )
             }else {
                 treeNodeOne.push(<TreeNode value={item.id} title={item.title} key={item.id} />)
             }
        })
        return treeNodeOne
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
                width={680}
            >
                <Form  layout="horizontal" >
                    <FormItem
                        {...formItemLayout}
                        label="菜单名称："
                    >
                        {getFieldDecorator('title', {
                            initialValue: (this.state.item && this.state.item.title) || '',
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
                        label="父id："
                    >
                        {getFieldDecorator('pid', {
                            initialValue: (this.state.item && this.state.item.id) || '',
                            rules: [{
                                required: true,
                                message:'请选择父id'
                            }],
                        })(
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                // value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            >
                                <TreeNode value="" title="请选择父id" key="0" />
                                {this.treeNodeOne(this.state.data)}
                            </TreeSelect>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="父级请求路径："
                    >
                        {getFieldDecorator('request_parent', {
                            initialValue: (this.state.item && this.state.item.request_parent )|| '',
                            rules: [{
                                required: true,
                                message:'请输入父级请求路径'
                            }],
                        })(
                            <Input type="text"  placeholder="父级请求路径" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="子级请求路径："
                    >
                        {getFieldDecorator('request_child', {
                            initialValue: (this.state.item && this.state.item.request_child )|| '',
                            rules: [{
                                required: true,
                                message:'请输入子级请求路径'
                            }],
                        })(
                            <Input type="text"  placeholder="子级请求路径" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="请求方法："
                    >
                        {getFieldDecorator('request_method', {
                            initialValue: (this.state.item && this.state.item.request_method )|| '',
                            rules: [{
                                required: true,
                                message:'请输入请求方法'
                            }],
                        })(
                            <Input type="text"  placeholder="请求方法" />
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
                        label="是否加到常用菜单："
                    >
                        {getFieldDecorator('often', {
                            initialValue: (this.state.item && this.state.item.often) || '',
                            rules: [{
                                required: true,
                                message:'请选择是否加到常用菜单'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择是否加到常用菜单 </Option>
                                <Option value="0"> 否 </Option>
                                <Option value="1"> 是 </Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否显示："
                    >
                        {getFieldDecorator('display', {
                            initialValue: (this.state.item && this.state.item.display) || '',
                            rules: [{
                                required: true,
                                message:'请选择是否显示'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择是否显示 </Option>
                                <Option value="0"> 不显示 </Option>
                                <Option value="1"> 显示 </Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="图标："
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