import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import useInterval from '../helpers/useInterval';

const list = [
  { index: 0, img: '/img/sponsors/shell-logo.png' },
  { index: 1, img: '/img/sponsors/nnpc-logo.png' },
  { index: 2, img: '/img/sponsors/chevron-logo.png' },
  { index: 3, img: '/img/sponsors/shell-logo.png' },
  { index: 4, img: '/img/sponsors/nnpc-logo.png' },
  { index: 5, img: '/img/sponsors/chevron-logo.png' },
  { index: 6, img: '/img/sponsors/shell-logo.png' },
  { index: 7, img: '/img/sponsors/nnpc-logo.png' },
  { index: 8, img: '/img/sponsors/chevron-logo.png' },
];

const OurSponsors = () => {
  const [sponsors, setSponsors] = useState(list);
  const [centerImg, setCenterImg] = useState(sponsors[1]);

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 481px)',
  });

  const setBtnClass = () =>
    isTabletOrMobileDevice ? 'btn btn--ash' : 'btn btn--white';

  const goToNext = () => {
    let idx = sponsors.indexOf(centerImg) + 1;
    if (idx === sponsors.length - 1) idx = 1;
    setCenterImg(sponsors[idx]);
  };

  const goToPrevious = () => {
    let idx = sponsors.indexOf(centerImg) - 1;
    if (idx === 0) idx = sponsors.length - 2;
    setCenterImg(sponsors[idx]);
  };

  useInterval(goToNext, 4000);

  return (
    <section className="OurSponsors">
      <div className="OurSponsors__inner container-1220">
        <h2>Our sponsors</h2>
        <section className="OurSponsors__Intro">
          <p className="OurSponsors__text">
            The International HSE Biennial Conference brings together all
            stakeholders in the Nigerian Oil and Gas industry to discuss Health,
            Safety and Evironmental issues and challenges affecting the
            industry.
          </p>

          <div className="OurSponsors__logos">
            <img
              src="/icons/angle-left-solid.svg"
              title="Previous"
              onClick={goToPrevious}
            />
            <div className="slider">
              <ul
                className="OurSponsors__logos__list"
                style={{
                  transform: `translateX(-${(sponsors.indexOf(centerImg) - 1) *
                    (100 / sponsors.length)}%)`,
                }}
              >
                {sponsors.map((item, idx) => (
                  <li key={idx} className="OurSponsors__logos__item">
                    <img src={item.img} />
                  </li>
                ))}
              </ul>
            </div>

            <img
              src="/icons/angle-right-solid.svg"
              title="Next"
              onClick={goToNext}
            />
          </div>
        </section>

        <section className="OurSponsors__cta">
          <button className="btn btn--blue btn--become-sponsor">
            <Link href="/become-sponsor">
              <a>Become a sponsor</a>
            </Link>
          </button>
          <button className={setBtnClass()}>See all sponsors</button>
        </section>
      </div>

      <style jsx>{`
        .OurSponsors {
          background-color: #f9f9f9;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .OurSponsors__inner {
          padding-top: 8.6rem;
          padding-bottom: 7.47rem;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .OurSponsors h2 {
          color: #000;
          font-size: 3.5em;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        .OurSponsors__Intro {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(319px, 1fr));
          grid-gap: 3rem;
          align-items: center;
        }

        .OurSponsors__text {
          margin-top: 2rem;
          margin-bottom: 5rem;
          font-size: 2.5em;
          line-height: 1.79;
          padding-right: 1rem;
        }

        .OurSponsors__logos {
          display: flex;
          align-items: center;
          padding-right: 1rem;
        }

        .OurSponsors__logos > img {
          width: 3rem;
          height: 3rem;
        }

        .OurSponsors__logos > img:hover {
          cursor: pointer;
          background-color: rgba(74, 144, 226, 0.2);
        }

        .slider {
          position: relative;
          margin: 0 3rem;
          width: calc(16rem * 3);
          min-height: 9rem;
          overflow: hidden;
        }

        .OurSponsors__logos__list {
          display: flex;
          position: absolute;
          transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .OurSponsors__logos__item {
          min-width: 13rem;
          height: 9.4rem;
          margin-right: 3rem;
        }

        .OurSponsors__logos__item.active-item {
          transform: scale(1.5);
          opacity: 1;
        }

        .OurSponsors__logos__item img {
          max-height: 100%;
        }

        .OurSponsors__cta {
          font-size: 2.4em;
          letter-spacing: -0.18px;
          margin-top: 7rem;
        }

        .OurSponsors__cta .btn {
          padding: 0.5rem 3.6rem;
          margin-bottom: 2rem;
          min-width: 100%;
        }

        .OurSponsors__cta .btn a {
          color: #fff;
        }

        @media (min-width: 481px) {
          .OurSponsors__cta .btn {
            min-width: unset;
          }
        }

        @media (min-width: 769px) {
          .OurSponsors__cta {
            margin-top: 0;
          }
        }

        @media (min-width: 1024px) {
          .OurSponsors h2 {
            font-size: 5em;
          }
        }
      `}</style>
    </section>
  );
};

export default OurSponsors;
