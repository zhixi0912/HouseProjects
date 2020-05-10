import React from 'react'
import {Modal, Switch,Form,Input,Select,Upload, message,Icon} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class editModal extends React.Component {
    state = {
        item:this.props.item || {},
        typeData: [
            {id: '1', title: '友情链接'},
            {id: '2', title: '热闹搜索'},
        ],
        linkList: [],
        cityList:[]
    }
    componentWillMount() {
        console.log("item--->",this.state.item)
        this.fetch()
        this.getCityList()
    }
    fetch=()=>{
        axios.get("link/list",null,
            result=> {
                console.log("item--1->",result.result.data)
                this.setState({
                    linkList: result.result.data || [],
                })
            },
            result=> {

            }
        );
    }
    getCityList=()=>{
        axios.get("city/info",null,
            result=> {
                console.log("item-2-->",result.result.data)
                this.setState({
                    cityList: result.result.data || [],
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
            let url = "link";
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
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return(
            <Modal
                title={this.props.title}
                visible={true}
                maskClosable={false}
                onOk={this.handleSubmit}
                onCancel={this.hideModal}
                // width={800}
            >
                <Form layout="horizontal" >
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
                                    this.state.linkList && this.state.linkList.map((item, index) => {
                                        return (<Option value={item.pid} key={item.pid}> {item.name} </Option>)
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="城市"
                    >
                        {getFieldDecorator('city_id', {
                            initialValue: (this.state.item && this.state.item.city_id ) || '',
                            rules: [{
                                required: true,
                                message:'请选择城市'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择城市 </Option>
                                {
                                    this.state.cityList && this.state.cityList.map((item, index) => {
                                        return (<Option value={item.pid} key={item.pid}> {item.name} </Option>)
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="链接名称"
                    >
                        {getFieldDecorator('name', {
                            initialValue: (this.state.item && this.state.item.name )|| '',
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
                        label="链接地址"
                    >
                        {getFieldDecorator('url', {
                            initialValue: (this.state.item && this.state.item.url )|| '',
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
                            <Input type="text"  placeholder="链接地址" />
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
                    <Form.Item
                        {...formItemLayout}
                        label="选择图片"
                    >
                        {getFieldDecorator('img', {
                            initialValue: (this.state.data && this.state.data.img) || '',
                            rules: [{
                                // required: true,
                                // validator: (rule, value, callback) => {
                                //     if (!value || (value && value.length > 50)) {
                                //         callback(new Error('不能为空且长度不超过50!'));
                                //     } else {
                                //         callback();
                                //     }
                                // }
                            }],
                        })(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
editModal = createForm()(editModal);
export default editModal;