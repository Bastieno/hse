import Link from 'next/link';

const ConferenceResource = () => {
  return (
    <section className="ConferenceResource">
      <div className="ConferenceResource__inner container-1220">
        <h2>Conference Resource</h2>
        <p>Download previous conference resource</p>

        <section className="past-conferences">
          <ul className="past-conferences__list">
            <li
              className="past-conferences__item"
              style={{ backgroundColor: '#0062ff' }}
            >
              <Link href="/past-conferences?year=2018">
                <a>
                  <p>2018</p>
                  <div>
                    <img src="/icons/past-confs/mataura.svg" />
                  </div>
                </a>
              </Link>
            </li>

            <li
              className="past-conferences__item"
              style={{ backgroundColor: '#3dd598' }}
            >
              <Link href="/past-conferences?year=2016">
                <a>
                  <p>2016</p>
                  <div>
                    <img src="/icons/past-confs/doubs.svg" />
                  </div>
                </a>
              </Link>
            </li>

            <li
              className="past-conferences__item"
              style={{ backgroundColor: '#50b5ff' }}
            >
              {/* <Link href="/past-conferences?year=2014"> */}
              <a>
                <p>2014</p>
                <div>
                  <img src="/icons/past-confs/clarence.svg" />
                </div>
              </a>

              {/* </Link> */}
            </li>

            <li
              className="past-conferences__item"
              style={{ backgroundColor: '#a461d8' }}
            >
              {/* <Link href="/past-conferences?year=2012"> */}
              <a>
                <p>2012</p>
                <div>
                  <img src="/icons/past-confs/whangaehu.svg" />
                </div>
              </a>

              {/* </Link> */}
            </li>
          </ul>
        </section>
      </div>

      <style jsx>{`
        .ConferenceResource__inner {
          padding-top: 3rem;
          padding-bottom: 10.2rem;
          font-family: 'ibm_plex_sanregular', sans-serif;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .ConferenceResource h2 {
          color: #000;
          font-size: 3.5em;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        .ConferenceResource p {
          font-size: 2.5em;
        }

        .past-conferences {
          margin-top: 3.6rem;
        }

        .past-conferences__list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
          grid-gap: 2.5rem;
        }

        .past-conferences__item {
          border-radius: 8px;
          padding: 2.2rem 2.4rem;

          transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .past-conferences__item:hover {
          cursor: pointer;
          transform: scale(1.05);
        }

        .past-conferences__item a {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .past-conferences__item p {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2rem;
          line-height: 1.25;
          letter-spacing: -0.26px;
          color: #fff;
        }

        .past-conferences__item div {
          margin-top: 6rem;
        }

        .past-conferences__item img {
          max-width: 100%;
          // filter: brightness(0.5) sepia(1) hue-rotate(140deg) saturate(6);
        }

        .past-conferences__item:nth-of-type(1) img {
          filter: brightness(0.8) sepia(1) hue-rotate(530deg) saturate(5);
        }

        .past-conferences__item:nth-of-type(2) img {
          filter: brightness(0.7) sepia(1) hue-rotate(120deg) saturate(7);
        }

        .past-conferences__item:nth-of-type(3) img {
          filter: brightness(0.5) sepia(1) hue-rotate(153deg) saturate(15);
        }

        .past-conferences__item:nth-of-type(4) img {
          filter: grayscale(90%);
        }

        @media (min-width: 1024px) {
          .ConferenceResource h2 {
            font-size: 5em;
          }
        }
      `}</style>
    </section>
  );
};

export default ConferenceResource;
