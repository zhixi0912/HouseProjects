import React from 'react'
import { Form,Switch,Input,Select,DatePicker,Tabs,Row, Col,Button } from 'antd'
import './index.less'
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TabPane } = Tabs;
class addArticleListModal extends React.Component{
    state = {
        item:this.props.location.state || {},
        priceList: [],
        cityList: [],
        typeData:[
            {id:'0', title: '楼盘资讯', key: '01'},
            {id:'1', title: '购房宝典', key: '02'},
            {id:'2', title: '房产百科', key: '03'},
            {id:'3', title: '楼盘导购', key: '04'},
            {id:'4', title: '优惠活动', key: '05'},
            {id:'5', title: '购房知识', key: '06'},
        ],
        // 创建一个空的editorState作为初始值
        // editorState: BraftEditor.createEditorState(null)
    }

    componentWillMount() {
        let item = this.props.location.state || {};
        this.setState({item:item})
        let id = 'price_unit'
        this.fetch(id)
        this.getCityList()
    }
    fetch=(id)=>{
        axios.get("constant/info/"+id,null,
            result=> {
                console.log('result--1->', result)
                this.setState({
                    priceList:result || []
                })
            },
            result=> {

            }
        );
    }
    getCityList=()=>{
        axios.get("city/info",null,
            result=> {
                console.log('result--2->', result.data)
                this.setState({
                    cityList: result.result.data ||{}
                })
            },
            result=> {

            }
        );
    }
    // async componentDidMount () {
    //     // 假设此处从服务端获取html格式的编辑器内容
    //     const htmlContent = await fetchEditorContent()
    //     // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    //     this.setState({
    //         editorState: BraftEditor.createEditorState(htmlContent)
    //     })
    // }
    // submitContent = async () => {
    //     // 在编辑器获得焦点时按下ctrl+s会执行此方法
    //     // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    //     const htmlContent = this.state.editorState.toHTML()
    //     const result = await saveEditorContent(htmlContent)
    // }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!!err) {
                console.log('Received values of form: ', values);
                return
            }
            let url = "floor/add";
            let param = values;
            if (this.props.item) {
                url = "floor/update";
                param.id = this.props.item.id;
                if(param.is_sys === !!param.is_sys){
                    param.is_sys ? param.is_sys = 1 : param.is_sys = 0
                }
            }
            this.postFile(url,param)
        });
    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                // console.log("修改成功--------->",result)
                NotificationMixin.success("保存成功！")
                this.props.history.push({pathname:'/houselist'})
            },result=>{
                NotificationMixin.error("保存失败！")
            }
        );
    }
    goBack=(modal,e)=>{
        this.props.history.push({pathname:'/houselist',state:modal})
    }
    render(){
        const {history}=this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };
        const { editorState } = this.state
        return (
            <Row>
                <Col xs={24} sm={24} md={20} lg={20} xl={16}>
                    <div className="form-box">
                        <Form layout="horizontal"  onSubmit={this.handleSubmit}>
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
                                    <BraftEditor
                                        value={editorState}
                                        onChange={this.handleEditorChange}
                                        onSave={this.submitContent}
                                    />
                                )}
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        )
    }
}
addArticleListModal = Form.create()(addArticleListModal);
export default addArticleListModal;