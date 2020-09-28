import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import resources from '../data/past-conf-resources';

const PastConference = ({ year }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  return (
    <section className={`PastConference conf-${year}`}>
      <div className={`PastConference__Inner container-1360 conf-${year}`}>
        <h2>{year}</h2>
        <h3>Documents</h3>
        <ul className="Document__List">
          {resources[year].documents.map((doc, i) => (
            <li
              key={i}
              className="Document__Item"
              onMouseEnter={() => setHoveredRowIndex(i)}
              onMouseLeave={() => setHoveredRowIndex(null)}
            >
              {doc.name}
              {hoveredRowIndex === i && (
                <button
                  className={`btn ${
                    year === '2016' ? 'btn--ash' : 'btn--green'
                  } btn--download`}
                >
                  <a href={doc.path} download={doc.name}>
                    Download
                  </a>
                </button>
              )}
            </li>
          ))}
        </ul>
        <h3>Keynote Speakers</h3>
      </div>

      <style jsx>{`
        .PastConference {
          position: relative;
          // border-bottom: 1px solid #fff;
        }

        .PastConference.conf-2018 {
          background-color: #0062ff;
          // background-image: url('/icons/past-confs/mataura.svg');
          // background-repeat: no-repeat;
          // background-position: right top;
        }

        .PastConference.conf-2016 {
          background-color: #3dd598;
          // background-image: url('/icons/past-confs/mataura.svg');
          // background-repeat: no-repeat;
          // background-position: right top;
        }

        .PastConference.conf-2014 {
          background-color: #50b5ff;
          // background-image: url('/icons/past-confs/mataura.svg');
          // background-repeat: no-repeat;
          // background-position: right top;
        }

        .PastConference.conf-2012 {
          background-color: #a461d8;
          // background-image: url('/icons/past-confs/mataura.svg');
          // background-repeat: no-repeat;
          // background-position: right top;
        }

        .PastConference__Inner {
          position: relative;
          padding-top: 5.5rem;
          padding-bottom: 7rem;
          font-size: 5em;
          color: #fff;
        }

        .PastConference__Inner::before {
          content: '';
          position: absolute;
          top: -27px;
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 27px solid transparent;
        }

        .PastConference__Inner.conf-2018::before {
          left: calc(21.7rem / 2);
          border-bottom-color: #0062ff;
        }

        .PastConference__Inner.conf-2016::before {
          left: calc(21.7rem + 2rem + (21.7rem / 2));
          border-bottom-color: #3dd598;
        }

        .PastConference__Inner.conf-2014::before {
          left: calc((2rem * 2) + (21.7rem * 2) + (21.7rem / 2));
          border-bottom-color: #50b5ff;
        }

        .PastConference__Inner.conf-2012::before {
          left: calc((2rem * 3) + (21.7rem * 3) + (21.7rem / 2));
          border-bottom-color: #a461d8;
        }

        h2 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 3.7rem;
          color: #fff;
          margin-bottom: 2.45rem;
        }

        h3 {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 2.4rem;
          color: #fff;
        }

        .Document__List {
          width: 100%;
          max-width: 960px;
          padding: 0;
          margin: 0;
          margin-bottom: 4rem;
          list-style-type: none;
        }

        .Document__Item {
          position: relative;
          padding: 1.9rem 1rem;
          color: #fff;
          font-size: 1.7rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .btn--download {
          position: absolute;
          right: 0;
          padding: 0.2rem 1.25rem;
          color: #fff;
          font-size: 1.5rem;
          margin-left: auto;
          font-family: 'ibm_plex_sansmedium', sans-serif;
        }

        .btn--download a {
          color: inherit;
        }
      `}</style>
    </section>
  );
};

const PastConferences = () => {
  const router = useRouter();

  return (
    <>
      <main className="Main">
        <section className="PastConferenceGroup">
          <div className="PastConferenceGroup__inner container-1360">
            <h2>Conference Resources</h2>
            <p>Download previous conference resources</p>

            <ul>
              <li data-year="2018" style={{ backgroundColor: '#0062ff' }}>
                <Link href="?year=2018" scroll={false}>
                  <a>
                    <p>2018</p>

                    <div>
                      <img src="/icons/past-confs/mataura.svg" />
                    </div>
                  </a>
                </Link>
              </li>

              <li data-year="2016" style={{ backgroundColor: '#3dd598' }}>
                <Link href="?year=2016" scroll={false}>
                  <a>
                    <p>2016</p>
                    <div>
                      <img src="/icons/past-confs/doubs.svg" />
                    </div>
                  </a>
                </Link>
              </li>

              <li data-year="2014" style={{ backgroundColor: '#50b5ff' }}>
                {/* <Link href="?year=2014" scroll={false}> */}
                <a>
                  <p>2014</p>
                  <div>
                    <img src="/icons/past-confs/clarence.svg" />
                  </div>
                </a>
                {/* </Link> */}
              </li>

              <li data-year="2012" style={{ backgroundColor: '#a461d8' }}>
                {/* <Link href="?year=2012" scroll={false}> */}
                <a>
                  <p>2012</p>
                  <div>
                    <img src="/icons/past-confs/whangaehu.svg" />
                  </div>
                </a>
                {/* </Link> */}
              </li>
            </ul>
          </div>
        </section>

        <PastConference year={router.query.year} />
      </main>

      <style jsx>{`
        .Main {
          min-height: calc(100vh - 8.5rem);
        }

        .PastConferenceGroup {
          background-color: #f9f9f9;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .PastConferenceGroup__inner {
          padding-top: 4.3rem;
          padding-bottom: 6rem;
        }

        .PastConferenceGroup h2 {
          color: #000;
          font-size: 4.5em;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        .PastConferenceGroup p {
          font-size: 2.5em;
        }

        .PastConferenceGroup ul {
          margin: 0;
          padding: 0;
          list-style-type: none;

          margin-top: 3.6rem;
          display: flex;
          flex-wrap: nowrap;
        }

        .PastConferenceGroup li {
          width: 21.7rem;
          margin-right: 2rem;
          border-radius: 5px;
          padding: 2.2rem 2.4rem;
          transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .PastConferenceGroup li:hover {
          cursor: pointer;
          transform: scale(1.05);
        }

        .PastConferenceGroup li a {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .PastConferenceGroup li p {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2rem;
          line-height: 1.25;
          letter-spacing: -0.26px;
          color: #fff;
        }

        .PastConferenceGroup li div {
          margin-top: 3rem;
          text-align: center;
        }

        .PastConferenceGroup li img {
          max-width: 95%;
        }

        .PastConferenceGroup li:nth-of-type(1) img {
          filter: brightness(0.8) sepia(1) hue-rotate(530deg) saturate(5);
        }

        .PastConferenceGroup li:nth-of-type(2) img {
          filter: brightness(0.7) sepia(1) hue-rotate(120deg) saturate(7);
        }

        .PastConferenceGroup li:nth-of-type(3) img {
          filter: brightness(0.5) sepia(1) hue-rotate(153deg) saturate(15);
        }

        .PastConferenceGroup li:nth-of-type(4) img {
          filter: grayscale(90%);
        }
      `}</style>
    </>
  );
};

export default PastConferences;
