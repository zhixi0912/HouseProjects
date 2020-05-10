import React from 'react'
import {Modal, Switch,Form,Input,Select,Icon,TreeSelect} from 'antd';
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;

class editModal extends React.Component {
    state = {
        item: this.props.item || {},
        data: []
    }
    componentWillMount() {
        console.log("item--->",this.state.item)
        this.fetch()
    }
    fetch=()=>{
        axios.get("region/list",null,
            result=> {
                this.setState({
                    data:result.result.data || {},
                })
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
            console.log("values",values)
            let url = "region/add";
            let param = values;
                param.pid = '0'

            if (this.props.item.id) {
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
    treeNodeOne=(dataList)=>{
        /**
         * 说明：父级ID树选择器方法
         * */
        let treeNodeOne = [];
        dataList.map(item=>{
            if(item.children){
                treeNodeOne.push(
                    <TreeNode value={item.id} title={item.names} key={item.id} >
                        {this.treeNodeOne(item.children)}
                    </TreeNode>
                )
            }else {
                treeNodeOne.push(<TreeNode value={item.id} title={item.names} key={item.id} />)
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
                // width={800}
            >
                <Form  layout="horizontal" >
                    <FormItem
                        {...formItemLayout}
                        label="上级栏目"
                    >
                        {getFieldDecorator('pid', {
                            initialValue: (this.state.item && this.state.item.id) || 0,
                            // rules: [{
                            //     required: true,
                            //     message:'请选择上级栏目'
                            // }],
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
                                <TreeNode value="0" title="请选择上级栏目" key="0" />
                                {this.treeNodeOne(this.state.data)}
                            </TreeSelect>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="栏目名称："
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
                            <Input type="text"  placeholder="栏目名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="区域别名"
                    >
                        {getFieldDecorator('alias', {
                            initialValue: (this.state.item && this.state.item.alias )|| '',
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
                            <Input type="text"  placeholder="区域别名" />
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
                        label="状态"
                    >
                        {getFieldDecorator('is_hot', {
                            initialValue: (this.state.item && this.state.item.is_hot )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={this.state.item.is_hot ==='1' ? true:false} />
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
                        label="绑定域名"
                    >
                        {getFieldDecorator('domain', {
                            initialValue: (this.state.item && this.state.item.domain )|| '',
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input type="text"  placeholder="绑定域名" />
                        )}
                    </FormItem>
                    
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;