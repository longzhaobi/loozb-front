const columns = (toolBar) => {
    return [{
        title: '#',
        fixed: 'left',
        width: 50,
        render: (text, record, index) => (
            <span>{index + 1}</span>
        )
    }, {
        title: '权限名称',
        dataIndex: 'name',
        width: 180
    }, {
        title: '权限标识',
        dataIndex: 'permission',
        width: 180,
    }, {
        title: '描述',
        dataIndex: 'description',
        // width:140,
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
        width: 150,
        fixed: 'right',
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;