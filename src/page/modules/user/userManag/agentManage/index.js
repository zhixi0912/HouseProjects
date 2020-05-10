import React from 'react'
import {Form,Button,Table,Popconfirm,Switch,Input,Select} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";
import AddOrUpdateModal from './editModal'
import ModalWrapper from "../../../../../components/modalwrapper";


const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
class articleList extends React.Component{
    state = {
        data:[],
        typeData:[
            {id:'0', title: '楼盘资讯', key: '01'},
            {id:'1', title: '购房宝典', key: '02'},
            {id:'2', title: '房产百科', key: '03'},
            {id:'3', title: '楼盘导购', key: '04'},
            {id:'4', title: '优惠活动', key: '05'},
            {id:'5', title: '购房知识', key: '06'},
        ],
        pagination: {showQuickJumper: true,showTotal: total => `共 ${total} 条`},
    }
    componentWillMount() {
        this.fetch()
    }
    fetch=()=>{
        /**
         * 说明：会员管理列表接口方法 1：普通 会员，2：经纪人
         * */
        axios.get("user/list/2",null,
            result=> {
                console.log(result.result)
                const pagination = this.state.pagination;
                pagination.total = Number(result.result.count);
                this.setState({data:result.result.data ||[],pagination})
            },
            result=> {
                const pagination = this.state.pagination;
                pagination.total = 0;
                this.setState({
                    loading: false,
                    data: [],
                    pagination,
                })
            }
        )
    }
    addOrUpdate=(modal,e)=> {
        /**
         * 说明：新增或编辑弹窗
         * */
        e && e.preventDefault() ;
        e && e.stopPropagation();
        if(modal){
            modal.pos_name === '页头菜单' ? modal.pos_name = '1' :  modal.pos_name = '2'
            modal.open_type_name === '新页面' ? modal.open_type_name = '1' :  modal.open_type_name = '2'
        }

        new ModalWrapper(AddOrUpdateModal, "addOrUpdateModal", ()=> {
            this.fetch();
        }, null, {
            title:  modal && modal.id  ? '编辑' : '新增',
            // item: modal && modal.id ? Helper.copyObject(modal) : {},
            // item: modal && modal.id ? CommonMethod.copyObject(modal) : {},
            item: modal && modal.id ? modal : {},
            isEdit: modal && modal.id  ? true : false,
        }).show();
    }
    handleDelete=(record)=> {
        /**
         * 说明：删除方法
         * */
        let id = record.id;
        axios.delete("user/"+id,null,
            result=> {
                NotificationMixin.success("删除成功！")
            },
            result=> {

            }
        );
    }
    handleSubmit=(e)=>{
        /**
         * 说明：表头表单事件
         * */
        console.log('e----->', e)
    }
    statusChange=(record,checked)=>{
        /**
         * 说明：是否预置菜单状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("user/update",param)

    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                NotificationMixin.success("修改成功！")
            },
            result=> {

            }
        );
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let columns = [
            { title: '编号',dataIndex: 'id', key: 'id', width: '3%'},
            { title: '用户名', dataIndex: 'user_name', key: 'user_name', width: '16%',  },
            { title: '手机号码', dataIndex: 'mobile', key: 'mobile', width: '6%',  },
            { title: '昵称', dataIndex: 'nick_name', key: 'nick_name', width: '6%',  },
            { title: '登录时间', dataIndex: 'login_time', key: 'login_time', width: '6%',  },
            { title: '注册ip', dataIndex: 'reg_ip', key: 'reg_ip', width: '6%',  },
            { title: '登录ip', dataIndex: 'login_ip', key: 'login_ip', width: '6%',  },
            { title: '登录次数', dataIndex: 'login_num', key: 'login_num', width: '6%',  },
            { title: '邮箱', dataIndex: 'email', key: 'email', width: '6%',  },
            { title: '状态', dataIndex: 'status', key: 'status', width: '6%',
                render:(text, record)=>{
                    return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChange.bind(this,record)} defaultChecked={record['status']==='1' ? true:false} />)
                }
            },
            { title: '操作', key: '#', width: '10%',
                render: (text, record) => {
                    let html = <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleDelete.bind(this,record)} okText="确定" cancelText="取消"><Button type="danger" style={{marginLeft: "10px"}}>删除</Button></Popconfirm>
                    return (
                        <div>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)}>修改</Button>
                            {
                                // record.is_sys === '0' ? html :''
                                html
                            }

                        </div>
                    )
                }
            }
        ];
        return(
            <div className="admin-content">
                <div className="form-search">
                    <Form layout="inline" onSubmit={this.handleSubmit} autoComplete="off">
                        {/*<FormItem*/}
                        {/*    label="分类"*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        getFieldDecorator('title',{*/}
                        {/*            initialValue: this.state.title|| '',*/}
                        {/*            rules: [{*/}
                        {/*                required: true,*/}
                        {/*                message:'请选择分类'*/}
                        {/*            }],*/}
                        {/*        })(*/}
                        {/*            <Select className="seach-item-box">*/}
                        {/*                <Option value=""> 请选择 </Option>*/}
                        {/*            {*/}
                        {/*                this.state.typeData && this.state.typeData.map((item, index) => {*/}
                        {/*                    return (<Option value={item.id} kye={item.key}> {item.title} </Option>)*/}
                        {/*                })*/}
                        {/*            }*/}
                        {/*            </Select>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*</FormItem>*/}
                        <FormItem
                            label="状态"
                        >
                            {
                                getFieldDecorator('status',{
                                    initialValue: this.state.status|| '',
                                    rules: [{
                                        required: true,
                                        message:'请选择状态'
                                    }],
                                })(
                                    <Select className="seach-item-box">
                                        <Option value="" key={0}> 所有 </Option>
                                        <Option value="1" key={1}> 启用 </Option>
                                        <Option value="2" key={2}> 禁用 </Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label="关键词"
                        >
                            {
                                getFieldDecorator('title')(
                                    <Input placeholder="请输入关键词搜索" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加</Button>
                        </FormItem>
                    </Form>
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    // pagination={ false }
                    pagination={this.state.pagination}
                    size="small"
                    rowKey={(record) => record.id}
                />
            </div>
        )
    }
}
articleList = Form.create()(articleList);
export default articleList;