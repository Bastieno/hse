import Link from 'next/link';

const Logo = ({ pathname }) => (
  <>
    <Link href={pathname.includes('/admin') ? '/admin' : '/'}>
      <a className="Logo">
        <img src="/img/conf-logo-img.svg" className="Logo__img" />
        <span className="Logo__text">
          HSE International
          <br />
          Biennial Conference
        </span>
      </a>
    </Link>

    <style jsx>{`
      .Logo {
        padding-right: 2rem;
      }

      .Logo:hover {
        cursor: pointer;
      }

      .Logo__img {
        display: inline-block;
        width: 5rem;
        height: 6rem;
        margin-right: 0.8rem;
      }

      .Logo__text {
        display: inline-block;
        font-family: 'balooregular', sans-serif;
        font-size: 1.9em;
        line-height: 1.13;
        letter-spacing: -0.4px;
        color: #212242;
        text-align: left;
        vertical-align: middle;
      }
    `}</style>
  </>
);

export default Logo;
