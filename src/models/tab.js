/**
 * 全局Tab数据
 */
export default {
  namespace: 'tab',
  state: {
    activeKey: null,
    panes: []
  },
  reducers: {
    addTab(state, { payload }) {
      console.log(payload)
      return { ...state, msg: payload };
    },
    setCurrentUser(state, action) {
      return { ...state, ...action.payload }
    },
    init(state, action) {
      return { ...state, ...action.payload }
    }
  }
};
