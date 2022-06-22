import React from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { routeMap } from '../../../../router';

import './header.scss';

const Header:React.FC = () => {
  const nav = routeMap.filter(route => !!route.isHeaderNav);

  return (
    <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex' }}>
      <div className='logo' />
      <div className='nav'>
        {
          nav.map(navItem => (
            <NavLink
              key={navItem.id}
              to={navItem.route}
              className='nav-link'
            >
              {navItem.name}
            </NavLink>
          ))
        }
      </div>
    </Layout.Header>
  );
};
export default Header;
