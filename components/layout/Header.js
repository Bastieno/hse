import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { setCurrentPage } from '../../actions/lookup';

const Header = props => {
  const router = useRouter();
  const [displayNav, setDisplayNav] = useState(false);

  useEffect(() => {
    props.setCurrentPage(router.route);
  }, [router.route]);

  return (
    <header
      className={
        props.currentPage.includes('/admin')
          ? 'Header--admin container-full'
          : 'Header--user container-full'
      }
    >
      <div className="Header__inner">
        <div className="LogoGroup">
          <Logo pathname={router.pathname} />
          <span
            className="MenuHamburger"
            onClick={() => setDisplayNav(state => !state)}
          >
            <div className="MenuHamburger__TopBar"></div>
            <div className="MenuHamburger__MiddleBar"></div>
            <div className="MenuHamburger__LastBar"></div>
          </span>
        </div>
        <NavLinks pathname={router.pathname} displayNav={displayNav} />
      </div>

      <style jsx>{`
        .Header {
          background-color: #fff important;
          position: relative;
          border-bottom: 1px solid rgba(23, 23, 37, 0.07);
        }

        .Header--user {
          background-color: #fff !important;
          background: url('/img/header-bg.svg') 102% top / 18% 100% no-repeat;
          border-bottom: 1px solid rgba(23, 23, 37, 0.07);
          position: ${displayNav ? 'fixed' : 'static'};
          z-index: 500;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .Header--admin {
          background-color: transparent;
          // position: fixed;
          // top: 0;
          // left: 0;
          // right: 0;
          // z-index: 20;
          // border-bottom: 1px solid rgba(23, 23, 37, 0.07);
        }

        .Header__inner {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: ${displayNav ? '#fff' : 'transparent'};
        }

        .LogoGroup {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .Header--user .MenuHamburger {
          color: #212242;
          font-size: 2rem;
          cursor: pointer;
          font-family: 'Product Sans Bold', sans-serif;
          width: 3.3rem;
          transform: ${displayNav ? 'translate(0px, -5px)' : 'unset'};
        }

        .Header--user .MenuHamburger:hover .MenuHamburger__MiddleBar {
          margin-left: 0;
        }

        .Header--user .MenuHamburger div {
          width: 100%;
          height: 3px;
          background-color: ${displayNav ? '#000' : '#fff'};
          margin-bottom: 5px;
          transition: all 100ms ease-in-out;
        }

        .Header--user .MenuHamburger .MenuHamburger__TopBar {
          transform: ${displayNav
            ? 'rotate(-45deg) translate(-13px, 0px)'
            : 'unset'};
        }

        .Header--user .MenuHamburger .MenuHamburger__MiddleBar {
          width: 80%;
          margin-left: auto;
          display: ${displayNav ? 'none' : 'block'};
          opacity: ${displayNav ? '0' : '1'};
        }

        .Header--user .MenuHamburger .MenuHamburger__LastBar {
          margin-bottom: 0;
          transform: ${displayNav
            ? 'rotate(45deg) translate(-6px, 7px)'
            : 'unset'};
        }

        @media (min-width: 582px) {
          .Header--user {
            background-position: 106% top;
          }
        }

        @media (min-width: 1225px) {
          .Header--user {
            background: url('/img/header-bg.svg') 102% top / 8.5% 100% no-repeat;
            border-bottom: 1px solid rgba(23, 23, 37, 0.07);
          }

          .Header__inner {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .Header--user .MenuHamburger {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

const mapStateToProps = state => {
  return { currentPage: state.currentPage };
};

export default connect(mapStateToProps, { setCurrentPage })(Header);
