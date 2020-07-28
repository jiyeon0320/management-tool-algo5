import React from 'react';
import {Layout} from 'antd';

/* 사이드바 있는 레이아웃 */


const {Content, Sider, Footer, Header}  =  Layout;



const DefaultLayout = ({children}) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider />
            <Layout>
                <Header></Header>
                <Content>{children}</Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;