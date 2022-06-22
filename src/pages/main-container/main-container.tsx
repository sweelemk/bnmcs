import React from 'react';
import { Layout } from 'antd';
import { Router } from '../../router';
import { Header } from './components/header';

import './main-container.scss';

const { Content, Footer } = Layout;

const MainContainer:React.FC = () => (
  <div id='main-container' className='mainContainer'>
    <Layout>
      <Header />
      <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-background' style={{ padding: 24 }}>
          <Router />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Buynomics ©2022 Created by Andrei</Footer>
    </Layout>
  </div>
);

export default MainContainer;
