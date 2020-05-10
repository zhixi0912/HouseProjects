import React from 'react'
import {Form, Button, Table, Popconfirm, Switch,} from 'antd';
import axios from "../../../../../axios";
import AddOrUpdateModal from './editModal'
import ModalWrapper from "../../../../../components/modalwrapper";
import NotificationMixin from "../../../../../components/notification";

// const FormItem = Form.Item;
// const createForm = Form.create;
class MenuManage extends React.Component{
    state = {
        data:[],
    }
    componentWillMount() {
        this.fetch()
    }
    fetch=()=>{
        /**
         * 说明：文章分类管理列表接口
         * */
        axios.get("article/cate/list",null,
            result=> {
                this.setState({data:result.result.data ||[]})
            },
            result=> {

            }
        );
    }
    addOrUpdate=(modal,e)=> {
        /**
         * 说明：添加菜单
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
    handleSubmit=()=>{

    }
    handleDelete=(record)=> {
        /**
         * 说明：删除方法
         * */
        let param = {};
        param.id=record.id;
        axios.delete("article/cate",param,
            result=> {
                NotificationMixin.success("删除成功！")
            },
            result=> {

            }
        );
    }
    statusChange=(record,checked)=>{
        /**
         * 说明：修改状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("article/cate/update",param)

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
            { title: '编号',dataIndex: 'id', key: 'id'},
            { title: '栏目名称', dataIndex: 'names', key: 'names', width: '26%',  },
            { title: '栏目别名', dataIndex: 'alias', key: 'alias', width: '6%',  },
            { title: '排序', dataIndex: 'ordid', key: 'ordid', width: '6%',  },
            { title: '状态', dataIndex: 'status', key: 'status', width: '6%',
                render:(text, record)=>{
                    return (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.statusChange.bind(this,record)} defaultChecked={record['status']==='1' ? true:false} />)
                }
            },
            { title: '操作', key: '#', width: '22%',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)}>添加子栏目</Button>
                            <Button type="primary"  onClick={this.addOrUpdate.bind(this,record)} style={{marginLeft:15}}>修改</Button>
                            <Popconfirm placement="topRight" title={"您确定要删除该数据吗?"} onConfirm={this.handleDelete.bind(this,record)} okText="确定" cancelText="取消">
                                <Button type="danger" style={{marginLeft: "10px"}}>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
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
                            {/*<Button type="primary" htmlType="submit">菜单查询</Button>*/}
                        {/*</FormItem>*/}

                        <Button type="primary" onClick={this.addOrUpdate.bind(this,'')}>添加栏目</Button>
                    </Form>
                </div>
                {
                    this.state.data && this.state.data.length ?
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            rowSelection={rowSelection}
                            pagination={ false }
                            defaultExpandAllRows={true}
                            size="small"
                            rowKey={(record) => record.id}
                        />
                        : ''
                }

            </div>
        )
    }
}

MenuManage = Form.create()(MenuManage);
export default MenuManage;