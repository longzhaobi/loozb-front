const columns = (toolBar) => {
    return [{
        title: '#',
        fixed: 'left',
        width: 50,
        render: (text, record, index) => (
            <span>{index + 1}</span>
        )
    }, {
        title: '姓名',
        className: 'column-money',
        dataIndex: 'name',
        width: 120
    }, {
        title: '用户名',
        className: 'column-money',
        dataIndex: 'username',
        width: 120
    }, {
        title: '性别',
        dataIndex: 'gender',
        width: 60,
        render: (text, record, index) => (
            <span>{text == '1' ? '男' : '女'}</span>
        )
    }, {
        title: '身份证号码',
        dataIndex: 'idcard',
        width: 180
    }, {
        title: '联系地址',
        dataIndex: 'address',
        width: 380,
    }, {
        title: '联系电话',
        dataIndex: 'phone',
        width: 140
    }, {
        title: '是否锁住',
        dataIndex: 'locked',
        width: 80,
        render: (text, record, index) => (
            <span>{text == '1' ? '已锁住' : '未锁住'}</span>
        )
    }, {
        title: '拥有角色',
        dataIndex: 'roleNames',
        // width:180
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
        width: 180,
        fixed: 'right',
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;