import React from 'react'
import {Modal, Switch,Form,Input,Select, TreeSelect} from 'antd';
import axios from "../../../../../axios/index";
import NotificationMixin from "../../../../../components/notification/index";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const { SHOW_PARENT } = TreeSelect;
class editModal extends React.Component {
    state = {
        item:this.props.item || {},
        data: [],
        treeNodeOne: []
    }
    componentWillMount() {
        console.log("item--->",this.state.item)
        this.fetch()
    }
    fetch=()=>{
        axios.get("menu/list",null,
            result=> {
                console.log("菜单权限设置------11--->",result.result.data)
                let treeNodeOne = this.treeNodeOne(result.result.data)
                this.setState({
                    data:result.result.data ||[],
                    treeNodeOne: treeNodeOne
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
            // console.log("values",values)
            let url = "role​/menu​/list";
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
        const tProps = {
            treeData: this.state.treeNodeOne,
            value: this.state.data,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: '100%',
            },
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
                        label="名称"
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
                            <Input type="text"  placeholder="名称" disabled />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="菜单设置"
                    >
                        {getFieldDecorator('pid', {
                            initialValue: (this.state.item && this.state.item.pid) || '',
                            rules: [{
                                required: true,
                                message:'请选择菜单'
                            }],
                        })(
                            <TreeSelect {...tProps} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;