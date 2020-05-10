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
        data: [],
        posterTypeList: [],
        id: ''
    }
    componentWillMount() {
        let id = this.props.match.params.id;
        this.setState({id: id},this.fetch)
        // this.fetch()
    }
    fetch=()=>{
        /**
         * 说明：广告列表接口方法
         * */
        let id = this.state.id
        axios.get("poster/look/"+id,null,
            result=> {
                // console.log(result.result)
                this.setState({data:result.result.data ||[]})
            },
        );
    }
    getposterType(){
        /**
         * 说明：广告列表接口方法
         * */
        axios.get("constant/info/status/",null,
            result=> {
                // console.log(result.result)
                this.setState({posterTypeList:result.result.data ||[]})
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
            space_id: this.props.match.params.id
        }).show();
    }
    goBack=(modal,e)=>{
        this.props.history.push({pathname:'/advert',state:modal})
    }
    handleDelete=(record)=> {
        /**
         * 说明：删除方法
         * */
        let id=record.id;
        axios.delete("poster/​"+id,null,
            result=> {
                NotificationMixin.success("删除成功！")
                let id = this.props.match.params.id;
                this.fetch(id)
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
         * 说明：是否预置菜单状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("floor/photo/update",param)

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
            { title: '广告名称', dataIndex: 'names', key: 'names', width: '6%',  },
            { title: '类型', dataIndex: 'type', key: 'type', width: '6%',  },
            { title: '城市', dataIndex: 'region.names', key: 'region.names', width: '6%',  },
            { title: '广告位', dataIndex: 'space_id', key: 'space_id', width: '6%',  },
            { title: '开始时间', dataIndex: 'start_time', key: 'start_time', width: '6%',  },
            { title: '结束时间', dataIndex: 'end_time', key: 'end_time', width: '6%',  },
            { title: '添加时间', dataIndex: 'create_time', key: 'create_time', width: '6%',  },
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

                        <Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加</Button>
                        <Button onClick={this.goBack.bind(this,'')} style={{marginLeft:'15px'}}>返回</Button>
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