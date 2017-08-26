import {Badge} from 'antd';
const columns = (toolBar) => {
    return [{
        title: '#',
        width: 50,
        render: (text, record, index) => (
            <span>{index + 1}</span>
        )
    }, {
        title: '主键',
        dataIndex: 'id',
        width: 180
    }, {
        title: '缓存KEY',
        dataIndex: 'cacheKey',
        width:500
    }, {
        title: '是否缓存',
        dataIndex: 'isCache',
        width: 100,
        render: (text, record) => (
            text === 'Y' ? <span><Badge status="success" />已缓存</span> : <span style={{color:'gray'}}><Badge status="default" />未缓存</span>
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
        widde: 150,
        render: (text, record, index) => toolBar(text, record, index)
    }]
}

export default columns;