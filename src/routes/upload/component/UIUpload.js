import React, { Component } from 'react';
import { Map } from 'react-amap';

class UIAmap extends Component {
  constructor(props) {
    super(props);
    this.amapEvents = {
      created: (mapInstance) => {
        console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(mapInstance.getZoom());
      }
    };
  }

  render() {
    const plugins = [
      'MapType',
      'Scale',
      'OverView',
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          onCreated(ins){
            // console.log(ins);
          },
        },
      }
    ];

    const events = {
      created: (ins) => {
        console.log(ins);
        // ins.setCity("贵阳市");
        // ins.setZoom(16);
      },
      dblclick:() => {console.log("双击了地图")},
      click: () => {console.log("你点击了地图")}
    }

    return (
      <div style={{width: '100%',height: table_height+144}}>
        <Map events={events} zoom={16} plugins={plugins} key="5a36cc1b63f03f268ca85d9fe5a0a283"/>
      </div>
    );
  }
}

export default UIAmap;
