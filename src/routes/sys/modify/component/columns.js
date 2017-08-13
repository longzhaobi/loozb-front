const columns = (toolBar) => {
    return [{
        title: '操作用户',
        dataIndex: 'name',
        width: 100
    }, {
        title: '请求URL',
        dataIndex: 'url',
        width: 100
    }, {
        title: '操作表名',
        dataIndex: 'tableName',
        width: 100,
    }, {
        title: '操作对象',
        dataIndex: 'tableInfo',
    }, {
        title: '记录ID',
        dataIndex: 'key',
        width: 160
    }, {
        title: '请求IP',
        dataIndex: 'ip',
        width:120,
    }, {
        title: '创建日期',
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