import React from 'react';
import { Spin } from 'antd';
import { PageSpinInterface } from './interfaces/page-spin.interface';

import './page-spin.scss';

const PageSpin: React.FC<PageSpinInterface> = ({ spinning, children }) => (
  <Spin tip='Loading...' spinning={spinning}>
    {
      children
    }
  </Spin>
);

export default PageSpin;
