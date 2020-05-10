import React from 'react'
import {Form,Button,Table,Popconfirm,Switch} from 'antd';
import axios from "../../../../../axios";
import NotificationMixin from "../../../../../components/notification";
import AddOrUpdateModal from './editModal'
import ModalWrapper from "../../../../../components/modalwrapper";

const FormItem = Form.Item;
const createForm = Form.create;
class MenuManage extends React.Component{
    state = {
        data:[],
    }
    componentWillMount() {
        this.fetch()
    }
    fetch=()=>{
        /**
         * 说明：回收站列表接口方法
         * */
        axios.get("article​/recycle​/list",null,
            result=> {
                console.log(result)
                this.setState({data:result.result.data ||[]})
            },
        );
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
        console.log("record---",record);
        axios.delete("article​/recycle​",param,
            result=> {
                NotificationMixin.success("删除成功！")
            },
            result=> {

            }
        );
    }
    handleSubmit=()=>{
        /**
         * 说明：表头表单事件
         * */
    }
    statusChange=(record,checked)=>{
        /**
         * 说明：修改状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("article​/update",param)

    }
    recoveryChange=(modal,record)=>{
        /**
         * 说明：恢复文章方法
         * */
        let param = {}
        console.log('modal,record--->', modal,record)
        axios.put('article/recycle',param,
            result=> {
                NotificationMixin.success("恢复成功！")
            },
            result=> {

            }
        );
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
            { title: '编号',dataIndex: 'id', key: 'id', width: '6%'},
            // { title: '标题', dataIndex: 'title', key: 'title', width: '25%',
            //     render: (text, record) => {
            //         return (<Link to={"/userCore/menuManage/editModal/"+record['id']}>{record['title']}</Link>)
            //     }
            // },
            { title: '标题', dataIndex: 'title', key: 'title', width: '6%',  },
            { title: '所属分类', dataIndex: 'cate_alias', key: 'cate_alias', width: '6%',  },
            { title: '发布时间', dataIndex: 'update_time', key: 'update_time', width: '6%',  },
            { title: '删除时间', dataIndex: 'create_time', key: 'create_time', width: '6%',  },
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
                            <Button type="primary"  onClick={this.recoveryChange.bind(this,record)}>恢复</Button>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)}>修改</Button>
                            {
                                record.is_sys === '0' ? html :''
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
                        {/*<FormItem>*/}
                            {/*{*/}
                                {/*getFieldDecorator('title')(*/}
                                    {/*<Input placeholder="请输入内容库名称" />*/}
                                {/*)*/}
                            {/*}*/}
                        {/*</FormItem>*/}
                        {/*<FormItem>*/}
                            {/*<Button type="primary" htmlType="submit">导航查询</Button>*/}
                        {/*</FormItem>*/}

                        {/*<Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加</Button>*/}
                    </Form>
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={ false }
                    size="small"
                    rowKey={(record) => record.id}
                />
            </div>
        )
    }
}
MenuManage = Form.create()(MenuManage);
export default MenuManage;