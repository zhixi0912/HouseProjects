import React from 'react'
import {Form, Button, Table, Popconfirm, Switch, Select} from 'antd';
import axios from "../../../../../axios/index";
import NotificationMixin from "../../../../../components/notification/index";
import AddOrUpdateModal from './editModal'
import ModalWrapper from "../../../../../components/modalwrapper/index";

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
class MenuManage extends React.Component{
    state = {
        data:[],
    }
    componentWillMount() {
        this.fetch()
    }
    fetch=()=>{
        /**
         * 说明：评论列表接口方法
         * */
        // axios.get("comment​/list",null,
        axios.get("comment/list",null,
            result=> {
                // console.log(result.result)
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
        let id=record.id;
        // console.log("record---",record);
        axios.delete("comment​/"+id,null,
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
         * 说明：是否预置菜单状态方法
         * */
        let param = {}
        param.id = record.id
        param.status = checked ? "1":"0"
        this.postFile("comment​/update",param)

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
            { title: '评论人', dataIndex: 'user_name', key: 'user_name', width: '6%',  },
            { title: '经纪人', dataIndex: 'broker_id', key: 'broker_id', width: '6%',  },
            { title: '评论内容', dataIndex: 'content', key: 'content', width: '6%',  },
            { title: '评论时间', dataIndex: 'create_time', key: 'create_time', width: '6%',  },
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
                            {/*<Button type="primary"  onClick={this.addOrUpdate.bind(this,record)}>修改</Button>*/}
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
                        <FormItem>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </FormItem>
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