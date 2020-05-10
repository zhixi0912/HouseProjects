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
         * 说明：文章列表接口方法
         * */
        axios.get("article/list",null,
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
        let param = {};
        param.id=record.id;
        axios.delete("article",param,
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
        this.postFile("article/update",param)

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
            { title: '标题', dataIndex: 'title', key: 'title', width: '26%',  },
            { title: '所属分类', dataIndex: 'cate_alias', key: 'cate_alias', width: '6%',  },
            { title: '发布时间', dataIndex: 'create_time', key: 'create_time', width: '6%',  },
            { title: '更新时间', dataIndex: 'update_time', key: 'update_time', width: '6%',  },
            { title: '排序', dataIndex: 'ordid', key: 'ordid', width: '6%',  },
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
                            <Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加文章</Button>
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