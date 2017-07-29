const columns = (toolBar) => {
    function getMenuType(text) {
        if (text === '1') {
            return '父子类型'
        } else if (text === '2') {
            return '分组类型'
        } else if (text === '3') {
            return '普通类型'
        } else {
            return '未知类型'
        }

    }
    return [{
        title: '资源名称',
        dataIndex: 'name',
        width: 340,
    }, {
        title: '资源标识',
        dataIndex: 'identity',
        width: 180,
    }, {
        title: '图标',
        dataIndex: 'icon',
        width: 180,
    }, {
        title: '资源链接',
        dataIndex: 'url',
        width: 180,
    }, {
        title: '资源权重',
        dataIndex: 'weight',
        width: 100,
    }, {
        title: '资源类型',
        dataIndex: 'menuType',
        width: 100,
        render: (text, record, index) => (
            <div>
                {
                    getMenuType(text)
                }
            </div>
        )
    }, {
        title: '拥有权限',
        dataIndex: 'permissionText',
        // width: 180,
    }, {
        title: '操作',
        key: 'operation',
        width: 150,
        fixed: 'right',
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;