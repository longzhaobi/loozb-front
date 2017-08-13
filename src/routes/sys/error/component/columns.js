const columns = (toolBar) => {
    return [{
        title: '操作用户',
        dataIndex: 'name',
        width: 100
    }, {
        title: '异常标识',
        dataIndex: 'uuid',
        width: 280,
    }, {
        title: '异常URL',
        dataIndex: 'url',
        width: 100
    }, {
        title: '异常实例',
        dataIndex: 'instance',
        width: 480,
    }, {
        title: '请求方法',
        dataIndex: 'method',
        width: 100
    }, {
        title: '状态',
        dataIndex: 'status',
        width: 90,
    }, {
        title: '客户端信息',
        dataIndex: 'agent',
        // width:340,
    }, {
        title: '请求IP',
        dataIndex: 'ip',
        width:240,
    }, {
        title: '注册日期',
        dataIndex: 'ctime',
        width: 180
    }, {
        title: '维护日期',
        dataIndex: 'mtime',
        width: 180
    }, {
        title: '操作',
        key: 'operation',
        width: 100,
        fixed: 'right',
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;