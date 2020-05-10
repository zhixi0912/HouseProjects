import React from 'react'
import {Form,Button,Table,Popconfirm,Switch} from 'antd';
import axios from "../../../../axios";
import NotificationMixin from "../../../../components/notification";
import AddOrUpdateModal from './editModal'
import ModalWrapper from "../../../../components/modalwrapper";

const FormItem = Form.Item;
const createForm = Form.create;
class MenuManage extends React.Component{
    state = {
        data:[],
        advertType: []
    }
    componentWillMount() {
        this.fetch()
    }
    fetch=()=>{
        /**
         * 说明：广告位列表接口方法
         * */
        axios.get("/poster_space/list",null,
            result=> {
                // console.log(result.result)
                this.setState({
                    data:result.result.data ||[]
                },this.advertType())
            },
        );
    }
    advertType=()=>{
        /**
         * 说明：广告位类型枚举接口方法
         * */
        axios.get("/constant/info/poster_space_type",null,
            result=> {
                console.log('poster_space_type----->', result)
                this.setState({
                    advertType: result ||[]
                })
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
    goDetil=(modal,e)=>{
        if (modal.id && modal.id !== '') {
            let url = '/advert/' + e + '/' + modal.id
            this.props.history.push({pathname:url})
        } else {
            NotificationMixin.error("广告位不能为空！")
        }
    }
    handleDelete=(record)=> {
        /**
         * 说明：删除方法
         * */
        let id = record.id;
        axios.delete("poster_space/"+id,null,
            result=> {
                NotificationMixin.success("删除成功！")
                this.fetch()
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
        this.postFile("poster_space/update",param)
    }
    postFile=(url,param)=>{
        axios.post(url,param,
            result=> {
                NotificationMixin.success("修改成功！")
                this.fetch()
            },
            result=> {

            }
        );
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let columns = [
            { title: '编号',dataIndex: 'id', key: 'id'},
            { title: '广告位名称', dataIndex: 'names', key: 'names', },
            { title: '广告类型', dataIndex: 'type', key: 'type',
                render: (text, record) => {
                    let html =  ''
                    this.state.advertType && this.state.advertType.map((item, index)=>{
                        if(item.key === record['type']) {
                            html = item.title
                        }
                    })
                    return ( <div>{html}</div> )
                }
            },
            { title: '广告位宽度', dataIndex: 'width', key: 'width'},
            { title: '广告位高度', dataIndex: 'height', key: 'height' },
            { title: '广告数量', dataIndex: 'items', key: 'items' },
            { title: '显示数量', dataIndex: 'display_num', key: 'display_num'},
            { title: '状态', dataIndex: 'status', key: 'status',
                render:(text, record)=>{
                    return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChange.bind(this,record)} defaultChecked={record['status']==='1' ? true:false} />)
                }
            },
            { title: '操作', key: '#',
                render: (text, record) => {
                    let html = <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleDelete.bind(this,record)} okText="确定" cancelText="取消"><Button type="danger" style={{marginLeft: "10px"}}>删除</Button></Popconfirm>
                    return (
                        <div>
                            <Button type="primary"  onClick={this.goDetil.bind(this,record,'posterSpaceList')} style={{marginLeft: "10px"}}>广告列表</Button>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)} style={{marginLeft: "10px"}}>修改</Button>
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