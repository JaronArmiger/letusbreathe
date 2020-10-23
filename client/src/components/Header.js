import React from 'react';
import { NavLink } form 'react-router-dom';

const Header = () => (
  <header>
  	<h1>#LetUsBreathe</h1>
  	<div className='links'>
  	  <NavLink to='/' className='link'>
  	    Home
  	  </NavLink>
  	  <NavLink to='/gallery' className='link'>
  	    Gallery
  	  </NavLink>
  	</div>
  </header>
);

export default Header;