import React from 'react';
// import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
  } from '@ant-design/icons';


const SideBar = () => {
    return (
        <div>
            <div className="logo">algo5 로고</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <span>algo5 table</span>
              {/* <Link to="/table"></Link> */}
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </div>
    );
};

export default SideBar;