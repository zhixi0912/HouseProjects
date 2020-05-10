import React from 'react'
import {Modal, Switch,Form,Input,Select, Upload, Icon,TreeSelect,DatePicker} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";
import {message} from "antd/lib/index";
import moment from 'moment';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker } = DatePicker;
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
            {id: '1', title: '实景图'},
            {id: '2', title: '效果图'},
            {id: '3', title: '配套图'},
            {id: '4', title: '样板间'},
            {id: '5', title: '区位图'},
        ],
        cityList: []
    }
    componentWillMount() {
        console.log('this.props.item',this.props.item)
        this.fetch()
    }
    fetch=()=>{
        axios.get("region/list",null,
            result=> {
                this.setState({
                    cityList:result.result.data ||{},
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
            let param ={
                ...values,
                'space_id':this.props.space_id,
                'start_time':values.start_time.format('YYYY-MM-DD HH:mm:ss'),
                'end_time':values.end_time.format('YYYY-MM-DD HH:mm:ss'),
            }
            let url = "poster";

            // const rangeTimeValue = values['effectiveTime'];
            // let param = {
            //     ...values,
            //     'start_time': rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            //     'end_time': rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
            // };
            // delete param.effectiveTime

            // console.log("values",values)

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
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请选择时间!' }],
        };
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
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
                <Form  layout="horizontal">
                    <FormItem
                        {...formItemLayout}
                        label="所属城市"
                    >
                        {getFieldDecorator('region_id', {
                            initialValue: (this.state.item.region && this.state.item.region.id) || 0,
                            // rules: [{
                            //     required: true,
                            //     message:'请选择所属城市'
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
                                <TreeNode value="0" title="请选择所属城市" key="0" />
                                {this.treeNodeOne(this.state.cityList)}
                            </TreeSelect>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告名称"
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
                            <Input type="text"  placeholder="广告名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告类型"
                    >
                        {getFieldDecorator('type', {
                            initialValue: (this.state.item && this.state.item.type) || '',
                            rules: [{
                                required: true,
                                message:'请选择广告类型'
                            }],
                        })(
                            <Select>
                                <Option value=""> 请选择类型 </Option>
                                <Option value="1"> 矩形横幅 </Option>
                                <Option value="2"> 对联广告 </Option>
                                <Option value="3"> 图片列表 </Option>
                                <Option value="4"> PC轮播图 </Option>
                                <Option value="5"> 手机轮播图 </Option>
                                <Option value="6"> 文字广告 </Option>
                                <Option value="7"> 代码广告 </Option>
                            </Select>
                        )}
                    </FormItem>
                    {/*<FormItem*/}
                        {/*{...formItemLayout}*/}
                        {/*label="有效时间"*/}
                    {/*>*/}
                        {/*{getFieldDecorator('effectiveTime',rangeConfig, { //this.state.item.start_time this.state.item.end_time*/}
                            {/*initialValue: [moment('2019-06-13 12:00:00', dateFormat).startOf('day'), moment('2019-18-13 12:00:00', dateFormat).endOf('day')],*/}
                            {/*rules: [{*/}
                                {/*required: false,*/}
                            {/*}],*/}
                        {/*})(*/}
                            {/*<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                    <FormItem
                        {...formItemLayout}
                        label="有效开始时间"
                    >
                        {getFieldDecorator('start_time',config,{
                            initialValue: moment(this.state.item.start_time, dateFormat),
                            rules: [{
                                required: false,
                            }],
                        })(
                            <DatePicker showTime placeholder="Select start_time" style={{width:'100%'}}  />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="有效结束时间"
                    >
                        {getFieldDecorator('end_time',config,{
                            initialValue: moment(this.state.item.end_time, dateFormat),
                            rules: [{
                                required: false,
                            }],
                        })(
                            <DatePicker showTime placeholder="Select Time" format={dateFormat} style={{width:'100%'}}  />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="链接地址"
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
                        label="图片路径"
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
                        {getFieldDecorator('pc_logo', {
                            initialValue: (this.state.data && this.state.data.pc_logo) || '',
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