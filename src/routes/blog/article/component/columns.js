const columns = (toolBar) => {
    return [{
        title: '#',
        fixed: 'left',
        width: 50,
        render: (text, record, index) => (
            <span>{index + 1}</span>
        )
    }, {
        title: '标题',
        dataIndex: 'title',
        width: 380
    }, {
        title: '作者',
        dataIndex: 'author',
        width: 180,
    }, {
        title: '原文链接',
        dataIndex: 'originalUrl',
        width: 380,
        render: (text, record, index) => (
            <span>{record.type == '1' ? `http://blog.loozb.com/articles/${record.id_}` : text}</span>
        )
    }, {
        title: '阅读次数',
        dataIndex: 'readNum',
        width: 120,
    }, {
        title: '文章排序',
        dataIndex: 'sort',
        width: 120,
    }, {
        title: '文章类型',
        dataIndex: 'type',
        width: 120,
        render: (text, record, index) => (
            <span dangerouslySetInnerHTML={{ __html: text == '1' ? '原创' : '转载' }}></span>
        )
    }, {
        title: '是否确认',
        dataIndex: 'confirm',
        width: 120,
        render: (text, record, index) => (
            <span dangerouslySetInnerHTML={{ __html: text == '1' ? '已确认' : '<span style="color:red;">未确认</span>' }}></span>
        )
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
        width: 240,
        fixed: 'right',
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;