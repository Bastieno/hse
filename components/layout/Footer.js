import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__inner container-560">
        <h2>About</h2>

        <ul className="Footer__links">
          <li className="Footer__links__item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="Footer__links__item">
            <Link href="/gallery">
              <a>Gallery</a>
            </Link>
          </li>
          <li className="Footer__links__item">
            <Link href="/abstracts">
              <a>Abstracts</a>
            </Link>
          </li>
          <li className="Footer__links__item">
            <Link href="/faqs">
              <a>FAQs</a>
            </Link>
          </li>
          <li className="Footer__links__item">
            <Link href="/become-sponsor">
              <a>Sponsors</a>
            </Link>
          </li>
          <li className="Footer__links__item inactive">
            <Link href="/contact-us">
              <a>Contact Us</a>
            </Link>
          </li>
          <li className="Footer__links__item">
            <Link href="/login-admin">
              <a>Admin Login</a>
            </Link>
          </li>
        </ul>

        <section className="newsletter-socials">
          <div className="newsletter">
            <h3>Get weekly newsletters</h3>
            <form className="newsletter__form">
              <input type="text" placeholder="Enter Your Email Address" />
              <button type="submit" onClick={e => e.preventDefault()}></button>
            </form>
          </div>

          <div className="socials">
            <h3>Connect with us</h3>
            <a href="https://twitter.com/HseConference" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                className="socials__icon"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#252525"
                    d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0z"
                  />
                  <path
                    fill="#555"
                    d="M30.504 15.277a7.306 7.306 0 0 1-2.347.92A3.639 3.639 0 0 0 25.462 15c-2.04 0-3.693 1.696-3.693 3.787 0 .297.033.586.096.863-3.069-.158-5.79-1.666-7.611-3.958-.318.559-.5 1.21-.5 1.904 0 1.315.653 2.474 1.643 3.152a3.62 3.62 0 0 1-1.673-.475v.047c0 1.835 1.274 3.365 2.962 3.715a3.639 3.639 0 0 1-1.668.064c.47 1.504 1.833 2.6 3.449 2.63A7.293 7.293 0 0 1 13 28.3 10.27 10.27 0 0 0 18.66 30c6.793 0 10.507-5.772 10.507-10.777l-.012-.49A7.552 7.552 0 0 0 31 16.775a7.24 7.24 0 0 1-2.12.596 3.792 3.792 0 0 0 1.624-2.094z"
                  />
                </g>
              </svg>
            </a>

            <a href="https://www.facebook.com/oilgasHSEngr" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                className="socials__icon"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#252525"
                    d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0z"
                  />
                  <path
                    fill="#555"
                    d="M19.73 16.486v2.478H18v3.03h1.73V31h3.551v-9.005h2.384s.223-1.453.331-3.042h-2.701v-2.072c0-.31.387-.726.77-.726H26V13h-2.631c-3.728 0-3.64 3.034-3.64 3.486z"
                  />
                </g>
              </svg>
            </a>

            <a href="https://www.instagram.com/intlhsebiennialconference" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                className="socials__icon"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#252525"
                    d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0z"
                  />
                  <path
                    fill="#555"
                    d="M26.033 12a4.974 4.974 0 0 1 4.962 4.752l.005.215v8.066a4.974 4.974 0 0 1-4.752 4.963l-.215.004h-8.066a4.973 4.973 0 0 1-4.962-4.752L13 25.033v-8.066a4.973 4.973 0 0 1 4.752-4.962l.215-.005h8.066zm0 1.597h-8.066a3.374 3.374 0 0 0-3.365 3.186l-.005.184v8.066a3.374 3.374 0 0 0 3.186 3.365l.184.005h8.066a3.374 3.374 0 0 0 3.365-3.186l.005-.184v-8.066a3.374 3.374 0 0 0-3.37-3.37zM22 16.362A4.643 4.643 0 0 1 26.638 21 4.644 4.644 0 0 1 22 25.638 4.643 4.643 0 0 1 17.362 21 4.643 4.643 0 0 1 22 16.362zm0 1.597A3.044 3.044 0 0 0 18.959 21a3.045 3.045 0 0 0 3.04 3.041A3.045 3.045 0 0 0 25.042 21 3.044 3.044 0 0 0 22 17.959zm4.833-2.951c.308 0 .61.124.828.343a1.176 1.176 0 0 1 0 1.656c-.218.218-.52.343-.828.343a1.18 1.18 0 0 1-.828-.343 1.18 1.18 0 0 1-.344-.828 1.176 1.176 0 0 1 1.172-1.171z"
                  />
                </g>
              </svg>
            </a>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              className="socials__icon"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="#252525"
                  d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0z"
                />
                <path
                  fill="#555"
                  d="M27.351 14c2.673 0 4.072.373 4.83 1.288.762.918.819 2.325.819 4.367v3.69c0 2.34-.364 3.69-1.216 4.519-.83.807-2.115 1.136-4.433 1.136H17.65C12.874 29 12 27.096 12 23.345v-3.69c0-1.936 0-3.335.736-4.284.755-.974 2.179-1.371 4.913-1.371zm-6.276 4.468a.67.67 0 0 0-.664.022.69.69 0 0 0-.326.588v4.66c0 .24.124.462.327.587a.671.671 0 0 0 .664.022l4.406-2.338a.688.688 0 0 0 .364-.61.688.688 0 0 0-.365-.609z"
                />
              </g>
            </svg>
          </div>
        </section>

        <small className="copyright">
          &copy; 2019 DPRO team. All rights reserved
        </small>
      </div>

      <style jsx>{`
        .Footer {
          background-color: #000;
        }

        .Footer__inner {
          padding-top: 2.8rem;
          padding-bottom: 2.4rem;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .Footer h2 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          color: #555555;
          text-transform: uppercase;
          padding: 1.5rem 0;
          font-size: 1.6em;
          border-bottom: 2px solid #40404052;
          margin-bottom: 1.6em;
        }

        .Footer__links,
        .newsletter,
        .socials {
          margin-bottom: 4.4rem;
        }

        .Footer__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .Footer__links__item {
          width: 33%;
          color: #fff;
          font-size: 1.5em;
          line-height: 1.77;
          font-family: 'ibm_plex_sansmedium', sans-serif;
        }

        .Footer__links__item a {
          color: #fff;
          transition: all 200ms linear;
        }

        .Footer__links__item a:hover {
          cursor: pointer;
          color: #555;
        }

        .Footer__links__item.inactive a {
          color: #c0c3cc;
          cursor: default;
          pointer-events: none;
        }

        .newsletter-socials {
          display: flex;
          flex-direction: column;
          color: #fff;
        }

        .newsletter-socials h3 {
          font-size: 1.8rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #fff;
        }

        .newsletter {
          width: 100%;
        }

        .newsletter__form {
          position: relative;
          background-color: #252525;
          padding: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .newsletter__form input {
          color: #fff !important;
          padding: 0 0.6rem;
          line-height: 1.6;
          background-color: transparent;
          outline: 0;
          flex: 1;
          font-size: 1.6rem;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .newsletter__form input::placeholder {
          font-size: 0.875em;
          color: #494949;
          font-family: 'ibm_plex_sansmedium', sans-serif;
        }

        .newsletter__form button {
          width: 3.5rem;
          height: 3.5rem;
          background-color: #2f2f2f;
          position: relative;
          cursor: pointer;
        }

        .newsletter__form button::before {
          content: '➜';
          position: absolute;
          transform: translate(-50%, -50%);
          color: #555;
          font-size: 2.1em;
          transition: all 300ms linear;
        }

        .newsletter__form button:hover::before {
          transform: translate(-25%, -50%);
          color: #fff;
        }

        .socials {
          flex-grow: 1;
          text-align: center;
        }

        .socials h3 {
          margin-bottom: 0.5rem;
        }

        .socials__icon {
          margin-right: 1rem;
          cursor: pointer;
          width: 5.5rem;
          height: 5.5rem;
        }

        .socials__icon:hover g path:last-of-type {
          transition: all 500ms linear;
        }

        .socials__icon:hover g path:last-of-type {
          fill: #fff;
        }

        .copyright {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.5em;
          color: #505050;
          text-align: center;
        }

        @media (min-width: 561px) {
          .Footer__links,
          .newsletter,
          .socials {
            margin-bottom: 5.5rem;
          }

          .newsletter-socials {
            flex-direction: row;
            align-items: center;
          }

          .newsletter {
            width: 50%;
          }

          .socials {
            margin-left: 4rem;
            text-align: left;
          }

          .socials__icon {
            width: 4.4rem;
            height: 4.4rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
