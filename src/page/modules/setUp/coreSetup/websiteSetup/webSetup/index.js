import React from 'react'
import {Form,Input, Button,Upload, Icon, message,Radio,Modal } from 'antd'
import './index.less'
import axios from "../../../../../../axios";
import NotificationMixin from '../../../../../../components/notification';

const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;


// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//     const isJPG = file.type === 'image/jpeg';
//     if (!isJPG) {
//         message.error('You can only upload JPG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//         message.error('Image must smaller than 2MB!');
//     }
//     return isJPG && isLt2M;
// }

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class webSetup extends React.Component{
    state = {
        data:[],
        loading: false,
        param:{},
        previewVisible: false,
        previewImage: '',
        fileList: [],
        fileListMob: [],
        fileListWechat: [],
        url: ''
    }
    componentWillMount(){
        this.fetch()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let param = values
                param.pc_logo = this.state.fileList[0].response.result.data.path
                param.mobile_logo = this.state.fileListMob[0].response.result.data.path
                param.wechat_code = this.state.fileListMob[0].response.result.data.path
                this.setState({
                    param:param || {}
                },this.putFile)
            }
        });
    }
    fetch=()=>{
        axios.get("setting/site",null,
            result=> {
                let url = 'http://www.xinsuifc.com'
                this.setState({
                    data:result.result.data ||[],
                    fileList: [{url: url + result.result.data.pc_logo, uid: result.result.data.pc_logo,}] || [],
                    fileListMob: [{url: url + result.result.data.mobile_logo, uid: result.result.data.mobile_logo,}] || [],
                    fileListWechat: [{url: url + result.result.data.wechat_code, uid: result.result.data.wechat_code,}] || []
                })
            },
            result=> {

            }
        );
    }
    putFile=()=>{
        axios.post("setting/site",this.state.param,
            result=> {
                console.log("站点设置参数--------->",result)
                NotificationMixin.success("修改成功！")
            },
            result=> {

            }
        );
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}) => {
        this.setState({ fileList })
    };
    handleChangeMob = ({fileList}) => {
        this.setState({ fileListMob: fileList })
    };
    handleChangeWechat = ({fileList}) => {
        this.setState({ fileListWechat: fileList })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 2,
                },
            },
        };
        // const uploadButton = (
        //     <div>
        //         <Icon type={this.state.loading ? 'loading' : 'plus'} />
        //         <div className="ant-upload-text">Upload</div>
        //     </div>
        // );
        // const imageUrl = this.state.imageUrl;
        const { previewVisible, previewImage, fileList, fileListMob, fileListWechat } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return(
            <div className="tabs-box">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="网站状态">
                        {getFieldDecorator('status', {
                            initialValue: (this.state.data && this.state.data.status) || '0',
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
                            <RadioGroup>
                                <Radio value={'0'}>关闭</Radio>
                                <Radio value={'1'}>开启</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="站点名称"
                    >
                        {getFieldDecorator('site_name', {
                            initialValue: (this.state.data && this.state.data.site_name) || '',
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
                            <Input type="text" placeholder="站点名称" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="电脑版Logo"
                    >
                        {getFieldDecorator('pc_logo', {
                            initialValue: (this.state.data && this.state.data.pc_logo) || '',
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
                            <div className="clearfix">
                                <Upload
                                    action="http://www.xinsuifc.com/api/v1/upload/pic"
                                    listType="picture-card"
                                    fileList={fileList}
                                    name="image"
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="移动端Logo"
                    >
                        {getFieldDecorator('mobile_logo', {
                            initialValue: (this.state.data && this.state.data.mobile_logo ) || '',
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
                            <div className="clearfix">
                                <Upload
                                    action="http://www.xinsuifc.com/api/v1/upload/pic"
                                    listType="picture-card"
                                    fileList={fileListMob}
                                    name="image"
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeMob}
                                >
                                    {fileListMob.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="微信二维码"
                    >
                        {getFieldDecorator('wechat_code', {
                            initialValue: (this.state.data && this.state.data.wechat_code ) || '',
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
                            <div className="clearfix">
                                <Upload
                                    action="http://www.xinsuifc.com/api/v1/upload/pic"
                                    listType="picture-card"
                                    fileList={fileListWechat}
                                    name="image"
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeWechat}
                                >
                                    {fileListWechat.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="备案号"
                    >
                        {getFieldDecorator('record_number', {
                            initialValue: (this.state.data && this.state.data.record_number) || '',
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
                            <Input type="text" placeholder="备案号" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="客服电话"
                    >
                        {getFieldDecorator('customer_telephone', {
                            initialValue: (this.state.data && this.state.data.customer_telephone) || '',
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
                            <Input type="text" placeholder="客服电话" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="客服QQ"
                    >
                        {getFieldDecorator('customer_qq', {
                            initialValue: (this.state.data && this.state.data.customer_qq) || '',
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
                            <Input type="text" placeholder="客服QQ" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="默认地图坐标"
                    >
                        {getFieldDecorator('map_point', {
                            initialValue: (this.state.data && this.state.data.map_point) || '',
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
                            <Input type="text" placeholder="默认地图坐标" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="在线咨询"
                    >
                        {getFieldDecorator('online_consulting', {
                            initialValue: (this.state.data && this.state.data.online_consulting) || '',
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
                            <Input type="text" placeholder="在线咨询" />
                        )}
                    </Form.Item>
                    <Form.Item label="城市域名">
                        {getFieldDecorator('city_domain', {
                            initialValue: (this.state.data && this.state.data.city_domain) || '0',
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
                            <RadioGroup>
                                <Radio value={'0'}>关闭</Radio>
                                <Radio value={'1'}>开启</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item label="购房红包">
                        {getFieldDecorator('red_packet', {
                            initialValue: (this.state.data && this.state.data.red_packet) || '0',
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
                            <RadioGroup>
                                <Radio value={'0'}>关闭</Radio>
                                <Radio value={'1'}>开启</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="企业名称"
                    >
                        {getFieldDecorator('company_name', {
                            initialValue: (this.state.data && this.state.data.company_name) || '',
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
                            <Input type="text" placeholder="企业名称" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="SEO标题"
                    >
                        {getFieldDecorator('seo_title', {
                            initialValue: (this.state.data && this.state.data.seo_title) || '',
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
                            <Input type="text" placeholder="SEO标题" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="SEO关键词"
                    >
                        {getFieldDecorator('seo_keys', {
                            initialValue: (this.state.data && this.state.data.seo_keys) || '',
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
                            <Input type="text" placeholder="SEO关键词" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="SEO描述"
                    >
                        {getFieldDecorator('seo_desc', {
                            initialValue: (this.state.data && this.state.data.seo_desc) || '',
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
                            <Input type="text" placeholder="SEO描述" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="公司邮箱"
                    >
                        {getFieldDecorator('email', {
                            initialValue: (this.state.data && this.state.data.email) || '',
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
                            <Input type="email" placeholder="公司邮箱" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="公司地址"
                    >
                        {getFieldDecorator('address', {
                            initialValue: (this.state.data && this.state.data.address) || '',
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
                            <Input type="text" placeholder="公司地址" />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
webSetup = Form.create()(webSetup);
export default webSetup;