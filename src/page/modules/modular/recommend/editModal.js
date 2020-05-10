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
        recommendList: [],
        houselist: []
    }
    componentWillMount() {
        this.fetch()
        this.getHouselist()
    }
    fetch=()=>{
        /**
         * 说明：推荐位列表接口方法
         * */
        axios.get("position/list",null,
            result=> {
                let recommendList = []
                result.result.data && result.result.data.map((item,index)=>{
                    recommendList.push({'pid':item.pid,'title':item.title})
                })
                this.setState({recommendList:recommendList})
            },
        );
    }
    getHouselist=()=>{
        /**
         * 说明：楼盘列表接口方法
         * */
        axios.get("floor/list",null,
            result=> {
                this.setState({houselist:result.result.data ||[]})
            },
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
            let url = "position";
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
                        label="推荐位名称"
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
                            <Input type="text"  placeholder="推荐位名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="所属模型"
                    >
                        {getFieldDecorator('model', {
                            initialValue: (this.state.item && this.state.item.model) || '',
                            rules: [{
                                required: true,
                                message:'请选择类型'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择类型 </Option>
                                <Option value="1"> 新房 </Option>
                                <Option value="2"> 小区 </Option>
                                <Option value="3"> 二手房 </Option>
                                <Option value="4"> 出租房 </Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="所属楼盘"
                    >
                        {getFieldDecorator('house_id', {
                            initialValue: (this.state.item && this.state.item.house_id) || '',
                            rules: [{
                                required: true,
                                message:'请选择所属楼盘'
                            }],
                        })(
                            <Select
                                // showSearch
                                // optionFilterProp="children"
                                // filterOption={(input, option) =>
                                //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // }
                            >
                                <Option value=""> 请选择所属楼盘 </Option>
                                {
                                    this.state.houselist && this.state.houselist.map((item, index) => {
                                        return (<Option value={item.id} key={item.id}> {item.title} </Option>)
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="推荐位父id"
                    >
                        {getFieldDecorator('pid', {
                            initialValue: (this.state.item && this.state.item.pid ) || '',
                            rules: [{
                                required: true,
                                message:'推荐位父id'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择推荐位父id </Option>
                                {
                                    this.state.recommendList && this.state.recommendList.map((item, index) => {
                                        return (<Option value={item.pid} key={item.pid}> {item.title} </Option>)
                                    })
                                }
                            </Select>
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
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;