import React, { useEffect, useRef } from 'react';
import { Container, Row } from 'reactstrap';
import './Header.css';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav_links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  }
];

const Header = () => {
  const headerRef = useRef(null);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const { currentUser } = useAuth();

  const stickyHeaderFunction = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    });
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged Out');
        navigate('/home');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunction();

    return () => window.removeEventListener('scroll', stickyHeaderFunction);
  });

  const menuToggle = () => menuRef.current.classList.toggle('active_menu');

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle('show_profileActions');

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Shop-io</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'nav_active' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_icons">
              <span className="fav_icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser?.photoURL : userIcon}
                  alt="UserIcon"
                  onClick={toggleProfileActions}
                />
                <div className="profile_actions" ref={profileActionRef}>
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>Logout</span>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
