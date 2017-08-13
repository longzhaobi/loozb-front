/**
 * 表格公共model,
 * service后端api， url判断当前路由URL
 */
import { message } from 'antd';

const grid = (service, url, namespace) => {
    return {
        state: {
            data: [],
            total: 0,
            current: 1,
            size: 20,
            selectedRowKeys: [],
            keyword: null,
            fetching: false
        },
        subscriptions: {
            setup({ dispatch, history }) {
                return history.listen(({ pathname, query }) => {
                    if (pathname === url) {
                        dispatch({ type: 'fetch', payload: { current: 1, size: 20, ...query } });
                    }
                });
            },
        },
        reducers: {
            fetchSuccess(state, { payload: { data, total, current, keyword } }) {
                return { ...state, data, total, current, selectedRowKeys: [], keyword };
            },
            onChangeSelectedRowKeys(state, { payload }) {
                return { ...state, selectedRowKeys: payload };
            },
            changeLoading(state, { payload }) {
                return { ...state, fetching: payload }
            }
        },
        effects: {
            *superFetch({ payload }, { call, put, select }) {
                yield put({ type: 'changeLoading', payload: true })
                const data = yield call(service.fetch, payload);
                if (data) {
                    const { total, current } = data;
                    yield put({
                        type: 'fetchSuccess',
                        payload: {
                            data: data.data, total, current, keyword: payload.keyword
                        }
                    });
                }
                yield put({ type: 'changeLoading', payload: false })
            },
            *remove({ payload }, { call, put, select }) {
                let data;
                if (payload instanceof Array) {
                    const size = payload.length;
                    for (let i = 0; i < size; i++) {
                        data = yield call(service.remove, payload[i]);
                        if (data) {
                            message.success(`第${i + 1}条删除成功`);
                        }
                    }
                } else {
                    data = yield call(service.remove, payload.id);
                }
                yield put({ type: 'app/result', payload: { data, namespace } });
            },
            *update({ payload: params, callback }, { call, put }) {
                callback(yield call(service.update, params));
            },
            *create({ payload: params, callback }, { call, put }) {
                callback(yield call(service.create, params));
            }
        }
    }
}

export default grid;
