import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import useInterval from '../helpers/useInterval';
import useSWR from 'swr';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { CLOUD_NAME } from '../constants/cloudinary';

const speakers = [
  {
    index: 0,
    avatar: '/img/past-speakers/yemi-osibanjo.jpg',
    title: 'Prof. Yemi Osibanjo',
  },
  {
    index: 1,
    avatar: '/img/past-speakers/emmanuel-ibe-kachikwu.jpg',
    title: 'Dr. Emmanuel Ibe Kachikwu',
  },
  {
    index: 2,
    avatar: '/img/past-speakers/folashade-yemi-esan.jpg',
    title: 'Dr. Folashade Yemi-Esan',
  },
  {
    index: 3,
    avatar: '/img/past-speakers/mbd-ladan.jpg',
    title: 'M. B. D. Ladan',
  },
  {
    index: 4,
    avatar: '/img/past-speakers/usani-uguru-usani.jpg',
    title: 'Mr. Usani Uguru Usani',
  },
  {
    index: 5,
    avatar: '/img/past-speakers/musa-m-zagi.jpg',
    title: 'Dr. Musa M. Zagi',
  },
  {
    index: 6,
    avatar: '/img/past-speakers/imevbore-victor.jpg',
    title: 'Mr. Imevbore Victor',
  },
  {
    index: 7,
    avatar: '/img/past-speakers/oyet-gogomary.jpg',
    title: 'Dr. Oyet Gogomary',
  },
  {
    index: 8,
    avatar: '/img/past-speakers/nwaogu-marcellinus.jpg',
    title: 'Dr. Nwaogu Marcellinus',
  },
];

const Organizers = () => {
  return (
    <>
      <section className="organizers">
        <h2>Conference Organizers</h2>
        <ul className="organizers__list photobanner">
          <li className="first">
            <img src="/img/sponsors/dpr-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/mpr-logo.jpg" />
          </li>
          <li>
            <img src="/img/sponsors/nnpc-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/ptdf-logo.jpg" />
          </li>
          <li>
            <img src="/img/organizers/pef-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/pppra-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/opts-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/moman-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/ipman-logo.jpe" />
          </li>

          <li>
            <img src="/img/sponsors/dpr-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/mpr-logo.jpg" />
          </li>
          <li>
            <img src="/img/sponsors/nnpc-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/ptdf-logo.jpg" />
          </li>
          <li>
            <img src="/img/organizers/pef-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/pppra-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/opts-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/moman-logo.png" />
          </li>
          <li>
            <img src="/img/organizers/ipman-logo.jpe" />
          </li>
        </ul>
      </section>

      <style jsx>{`
        .organizers {
          width: 50%;
          padding-left: 1rem;
          overflow: hidden;
        }

        .organizers h2 {
          font-family: 'ibm_plex_sansmedium', san-serif;
          font-size: 2em;
          color: #000;
        }

        .photobanner {
          width: 4000%;
          display: flex;
          overflow: hidden;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .organizers__list {
          padding-top: 2rem;
          padding-bottom: 1rem;
        }

        @keyframes bannermove {
          0% {
            margin-left: 0px;
          }
          100% {
            margin-left: -1730px;
          }
        }

        .first {
          animation: bannermove 30s linear infinite;
        }

        .organizers__list li {
          width: auto;
          height: 8.5rem;
          margin-right: 7rem;
        }

        .organizers__list img {
          // height: 8.5rem;
          // margin-right: 7rem;
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </>
  );
};

const Banner = () => {
  const [animationTimeout, setAnimationTimeout] = useState(5000);
  const [speakerList, setSpeakerList] = useState(speakers.slice(0, 8));
  let lastVisibleSpeaker;

  const showNextSpeaker = () => {
    // Update Speaker That Will Be Dropped
    lastVisibleSpeaker = speakerList[speakerList.length - 1];
    let lastVisibleIdx = lastVisibleSpeaker.index;

    // Update Speaker Item To Be Rendered
    lastVisibleIdx = lastVisibleIdx === 8 ? 0 : lastVisibleIdx + 1;
    let speakerToShow = speakers[lastVisibleIdx];

    // Re Arrange SpeakerList
    const newList = [...speakerList];
    newList.pop();
    newList.unshift(speakerToShow);

    setSpeakerList(newList);
  };

  useInterval(showNextSpeaker, animationTimeout);

  const transitions = useTransition(speakerList, img => img.index, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  });

  const liStyle = {
    width: '6.5rem',
    height: '9.5rem',
    fontSize: '12px',
  };

  const imgStyle = {
    maxWidth: '100%',
    borderRadius: '50%',
    cursor: 'pointer',
  };

  return (
    <aside className="Banner container-full">
      <div className="Banner__inner">
        <section className="past-speakers">
          <h2>Past featured speakers</h2>
          <ul className="past-speakers__list">
            {transitions.map(({ item, key, props }) => {
              return (
                <animated.li
                  key={key}
                  className="past-speakers__item"
                  style={{ ...liStyle, ...props }}
                  title={item.title}
                >
                  <img
                    src={item.avatar}
                    alt={item.title}
                    style={{ ...imgStyle }}
                    onMouseEnter={() => setAnimationTimeout(null)}
                    onMouseLeave={() => setAnimationTimeout(5000)}
                  />
                </animated.li>
              );
            })}
          </ul>
        </section>

        <div className="divider"></div>

        <Organizers />
      </div>

      <style jsx>{`
        .Banner {
          background-color: #f6f9fc;
          display: none;
        }

        .Banner__inner {
          display: flex;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .past-speakers {
          width: 50%;
          flex-grow: 1;
          padding-right: 1rem;
        }

        .past-speakers h2,
        .organizers h2 {
          font-family: 'ibm_plex_sansmedium', san-serif;
          font-size: 2em;
          color: #000;
        }

        .past-speakers__list {
          padding-top: 2rem;
          padding-bottom: 1rem;
          padding-right: 2rem;
          display: grid;
          grid-auto-flow: column;
          overflow: hidden;
          grid-template-columns: repeat(auto-fit, 70px);
          column-gap: 3rem;
        }

        .past-speakers__item {
          width: 6.5rem;
          height: 9.5rem;
        }

        .past-speakers__item img {
          max-width: 100%;
          border-radius: 50%;
        }

        .divider {
          width: 2px;
          height: 9.5rem;
          align-self: flex-end;
          background-color: rgba(151, 151, 151, 0.5);
        }

        @media (min-width: 1225px) {
          .Banner {
            display: block;
          }
        }
      `}</style>
    </aside>
  );
};

export default Banner;
