import { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Avatar as AntAvatar, Icon as AntIcon } from 'antd';
import SearchForm from '../commons/SearchForm';
import AdminNameTag from '../commons/AdminNameTag';
import NotificationBadge from '../commons/NotificationBadge';
import {
  getHonorifics,
  getHomepageContent,
  getPresentationCategories,
  getRegistrationCategories,
} from '../../actions/lookup';

const UserDropdown = ({ subscriber }) => {
  return (
    <section className="UserDropdown">
      <h2>{subscriber.firstName + ' ' + subscriber.lastName}</h2>
      <ul className="UserDropdown__list">
        <li className="UserDropdown__item">
          <Link href="/abstracts">
            <a>View My Abstract</a>
          </Link>
        </li>
        <li className="UserDropdown__item">
          <Link href="/registration-status">
            <a>Registration Status</a>
          </Link>
        </li>
        <li className="UserDropdown__item">
          <Link href="/logout">
            <a>Log Out</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .UserDropdown {
          min-width: 15.3rem;
          padding: 1.3rem 0.7rem;
          border-radius: 5px;
          box-shadow: 0 0 2px 0 rgba(67, 90, 111, 0.47);
          background-color: #fff;
          position: absolute;
          top: 90px;
          right: 15px;
        }

        .UserDropdown h2 {
          padding-bottom: 5px;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.5rem;
          color: #000;
          border-bottom: 1px solid rgba(144, 164, 183, 0.22);
        }

        ul,
        li {
          padding: 0;
          margin: 0;
          list-style-type: none !important;
        }

        .UserDropdown__list {
          padding-top: 0.6rem
          padding-bottom: 0.6rem
        }

        .UserDropdown__item {
          margin-bottom: 0.9rem;
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 1.5rem;
          color: #4a4a4a;
        }

        .UserDropdown__item:last-child {
          margin-bottom: 0;
        }

        .UserDropdown__item a {
          color: #4a4a4a;
        }

        .UserDropdown__item a:hover {
          color: #1a1919;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

const Avatar = ({ subscriber, dropdownDisplay, setDropdownDisplay }) => (
  <div
    className="AvatarPlusIcon"
    onClick={() => setDropdownDisplay(state => !state)}
  >
    <AntAvatar
      style={{
        backgroundColor: '#4a90e2',
        width: '4rem',
        height: '4rem',
        fontFamily: "'ibm_plex_sansbold', sans-serif",
        fontSize: '1.8rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {subscriber.firstName[0] + subscriber.lastName[0]}
    </AntAvatar>

    <AntIcon
      type={dropdownDisplay ? 'caret-up' : 'caret-down'}
      style={{ color: '#fff', fontSize: '0.7em' }}
    />

    <style jsx>{`
      .AvatarPlusIcon {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        margin-left: 3rem;
        margin-right: -3rem;
        cursor: pointer;
      }
    `}</style>
  </div>
);

export const NavLinks = props => {
  const [dropdownDisplay, setDropdownDisplay] = useState(false);

  useEffect(() => {
    if (props.honorifics.length === 0) {
      props.getHonorifics();
    }

    if (Object.keys(props.homepageContent).length === 0) {
      props.getHomepageContent();
    }

    if (props.presentationCategories.length === 0) {
      props.getPresentationCategories();
    }

    if (props.registrationCategories.length === 0) {
      props.getRegistrationCategories();
    }
  }, []);

  return (
    <>
      {Object.keys(props.subscriber).length !== 0 && dropdownDisplay && (
        <UserDropdown subscriber={props.subscriber} />
      )}

      {(() => {
        if (props.currentPage.includes('/admin')) {
          return (
            <div
              style={
                {
                  // display: 'grid',
                  // gridTemplateColumns: 'repeat(3, auto)',
                  // gridColumnGap: '2.7rem',
                  // alignItems: 'center',
                }
              }
            >
              {/* <SearchForm /> */}
              {/* <NotificationBadge /> */}
              <AdminNameTag subscriber={props.subscriber} />
            </div>
          );
        } else {
          return (
            <ul
              className={
                props.displayNav
                  ? 'NavLinks__list Navlist--Show'
                  : 'NavLinks__list Navlist--Hidden'
              }
            >
              <li
                className={
                  props.pathname === '/'
                    ? 'NavLinks__item active-link'
                    : 'NavLinks__item'
                }
              >
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li
                className={
                  props.pathname === '/about-us'
                    ? 'NavLinks__item active-link'
                    : 'NavLinks__item'
                }
              >
                <Link href="/about-us">
                  <a>About Us</a>
                </Link>
              </li>

              <li
                className={
                  props.pathname === '/faqs'
                    ? 'NavLinks__item active-link'
                    : 'NavLinks__item'
                }
              >
                <Link href="/faqs">
                  <a>FAQs</a>
                </Link>
              </li>

              <li className={
                props.pathname === '/conference-registration'
                  ? 'NavLinks__item active-link'
                  : 'NavLinks__item'
                }
              >
                <Link href="/conference-registration">
                  <a>Participate</a>
                </Link>
              </li>

              <li
                className={
                  props.pathname === '/gallery'
                    ? 'NavLinks__item active-link'
                    : 'NavLinks__item'
                }
              >
                <Link href="gallery">
                  <a>Gallery</a>
                </Link>
              </li>

              <li
                className={
                  props.pathname === '/become-sponsor'
                    ? 'NavLinks__item active-link'
                    : 'NavLinks__item'
                }
              >
                <Link href="/become-sponsor">
                  <a>Sponsor</a>
                </Link>
              </li>

              <li className="NavLinks__item inactive">
                <a>Hotel & Travel</a>
              </li>

              {Object.keys(props.subscriber).length !== 0 ? (
                <>
                  <span className="UserAvatar">
                    <Avatar
                      subscriber={props.subscriber}
                      dropdownDisplay={dropdownDisplay}
                      setDropdownDisplay={setDropdownDisplay}
                    />
                  </span>

                  <div className="UserAvatarReplace">
                    <li className="NavLinks__item">
                      <Link href="/abstracts">
                        <a>View My Abstract</a>
                      </Link>
                    </li>

                    <li className="NavLinks__item">
                      <Link href="/registration-status">
                        <a>Registration Status</a>
                      </Link>
                    </li>

                    <li className="NavLinks__item">
                      <Link href="/logout">
                        <a>Log Out</a>
                      </Link>
                    </li>
                  </div>
                </>
              ) : (
                <li className="NavLinks__item Login__Link">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
              )}
            </ul>
          );
        }
      })()}

      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          list-style-type: none !important;
        }

        .NavLinks__list {
          padding-top: 2rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          display: flex;
          flex-direction: column;
          font-size: 1.9em;
          position: absolute;
          top: 9rem;
          width: 100%;
          right: -5000px;
          line-height: 2;
          bottom: 0;
          z-index: 20000;
          font-family: 'ibm_plex_sansregular', sans-serif;
          background-color: #fff;
          box-shadow: 0 0 2px 0 rgba(67, 90, 111, 0.47);
        }

        .Navlist--Hidden {
          right: -5000px;
        }

        .Navlist--Show {
          right: 0;
        }

        .NavLinks__item {
          margin-left: 1rem;
          padding: 0.7rem 0.6rem;
          position: relative;
          cursor: pointer;
          list-style-type: none !important;
        }

        .NavLinks__item a {
          color: #4a4a4a;
        }

        .NavLinks__list .active-link a::before {
          content: '';
          height: 100%;
          width: 3px;
          border-radius: 10px;
          background-color: #007ace;
          position: absolute;
          left: -4px;
          bottom: 0.2rem;
          transition: width 0.5s ease;
        }

        .NavLinks__list .NavLinks__item.inactive a {
          color: #c0c3cc;
          cursor: default !important;
          pointer-events: none;
        }

        .UserAvatar {
          display: none;
        }

        @media (min-width: 1225px) {
          .NavLinks__list {
            width: unset;
            margin-top: 0;
            padding-right: 0;
            padding-left: 0;
            padding-top: 0;
            flex-direction: row;
            align-items: center;
            line-height: initial;
            position: relative;
            top: unset;
            left: unset;
            right: unset;
            bottom: unset;
            z-index: unset;
            box-shadow: unset;
            background-color: transparent;
          }

          .NavLinks__list .active-link a::before,
          .NavLinks__item a::before {
            content: '';
            height: 3px;
            width: 0;
            border-radius: 10px;
            background-color: #007ace;
            position: absolute;
            left: 0;
            bottom: 0.2rem;
            transition: width 0.5s ease;
          }

          .NavLinks__list .active-link a::before,
          .NavLinks__item a:hover::before {
            width: 100%;
          }

          .UserAvatar {
            display: initial;
          }

          .UserAvatarReplace {
            display: none;
          }

          .Login__Link a {
            color: #fff;
          }

          .Login__Link a::before {
            background-color: #fff;
          }
        }
      `}</style>
    </>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
    subscriber: state.subscriber,
    honorifics: Object.values(state.honorifics),
    currentPage: state.currentPage,
    homepageContent: state.homepageContent,
    presentationCategories: Object.values(state.presentationCategories),
    registrationCategories: Object.values(state.registrationCategories),
  };
};

export default connect(mapStateToProps, {
  getHonorifics,
  getHomepageContent,
  getPresentationCategories,
  getRegistrationCategories,
})(NavLinks);
