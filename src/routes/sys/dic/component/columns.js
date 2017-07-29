const columns = (toolBar) => {
    return [{
        title: '#',
        fixed: 'left',
        width: 50,
        render: (text, record, index) => (
            <span>{index + 1}</span>
        )
    }, {
        title: '名称',
        dataIndex: 'name',
        width: 180
    }, {
        title: '值',
        dataIndex: 'value',
        width: 180,
    }, {
        title: '编码',
        dataIndex: 'code',
        // width:140,
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
        width: 150,
        fixed: 'right',
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;