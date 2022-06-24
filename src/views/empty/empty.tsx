import React from 'react';
import { Empty as EmptyAnt } from 'antd';

import './empty.scss';

const EmptyData:React.FC = () => (
  <div className='empty-container'>
    <EmptyAnt image={EmptyAnt.PRESENTED_IMAGE_SIMPLE} />
  </div>
);

export default EmptyData;
