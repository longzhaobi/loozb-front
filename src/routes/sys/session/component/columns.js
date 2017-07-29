import { Badge } from 'antd';
const columns = (toolBar) => {
    return [{
        title: '#',
        fixed: 'left',
        width: 50,
        render: (text, record, index) => (
            <span>{index + 1}</span>
        )
    }, {
        title: '状态',
        dataIndex: 'online',
        width: 100,
        render: (text, record, index) => (
            <div>
                {
                    text == '1' ? <Badge status="success" text="在线" /> : <Badge status="default" text="离线" />
                }
            </div>
        )
    }, {
        title: '会话ID',
        dataIndex: 'sessionId',
        width: 280
    }, {
        title: '用户',
        dataIndex: 'account',
        width: 140,
    }, {
        title: 'IP',
        dataIndex: 'ip',
        width: 180,
    }, {
        title: '登录时间',
        dataIndex: 'startTime',
        width: 340,
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