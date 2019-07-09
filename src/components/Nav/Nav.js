import React from 'react';
import logo from 'assets/logo.jpg';
import './Nav.scss';

const Nav = () => {
  return (
    <nav className='nav'>
      <img src={logo} alt="geowox" className="geowox-logo" />
    </nav>
  )
}

export default Nav;
