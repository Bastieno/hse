const SpeakerTile = ({ speaker, id, onExpansion, onCollapse }) => {
  return (
    <li className={`Speakers__item speaker-${id}`}>
      <section className="Speakers__item__header" onClick={onExpansion}>
        <div className="icon">
          <img className="icons--expand" src="/icons/speakers-expand.svg" />
        </div>

        <span className="speaker-avatar">
          <img src={speaker.avatar} />
        </span>
        <h3 className="speaker-name">{speaker.name}</h3>
        <p className="speaker-talk__title">{speaker.talkTitle}</p>
        <span className="speaker-coyName">{speaker.coyName}</span>
        <div className="speaker-coyLogo">
          <img width='200px' height='auto' src={speaker.coyLogo} />
        </div>
      </section>

      <section className="Speakers__item__body">
        <div className="icon" onClick={onCollapse}>
          <img className="icons--collapse" src="/icons/speakers-collapse.svg" />
        </div>

        <div className="speaker-avatar">
          <img src={speaker.avatar} />
        </div>

        <h3 className="speaker-name">{speaker.name}</h3>
        <span className="speaker-coyName">{speaker.coyName}</span>
        <div className="speaker-coyLogo">
          <img width='200px' height='auto' src={speaker.coyLogo} />
        </div>
        <p className="speaker-talk__title">{speaker.talkTitle}</p>
        <p className="speaker-talk__body">{speaker.talkBody}</p>
      </section>

      <style jsx>{`
        .Speakers__item {
          border-bottom: 2px solid #acabab38;
          transition: background-color 300ms linear;
        }

        .Speakers__item .Speakers__item__body,
        .Speakers__item:hover {
          background-color: ${speaker.color};
        }

        .Speakers__item__header {
          display: grid;
          grid-template-columns: repeat(2, minmax(2rem, auto)) 1fr;
          column-gap: 2rem;

          font-size: 2em;
          cursor: pointer;
          padding: 2rem 1rem;
          min-height: 105px;
        }

        .Speakers__item__header * {
          pointer-events: none;
        }

        .Speakers__item__header .icon {
          visibility: hidden;
        }

        .Speakers__item__header .speaker-avatar {
          width: 5.76rem;
          height: 5.76rem;
          margin-right: 1.2rem;
        }

        .Speakers__item__header .speaker-avatar img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
        }

        .Speakers__item__header .speaker-name {
          font-size: 1.3em;
          color: #000;
          font-family: 'ibm_plex_sansmedium', sans-serif;
        }

        .Speakers__item__header .speaker-talk__title {
          grid-row: 2/3;
          grid-column: 3/4;
        }

        .Speakers__item__header .speaker-coyName {
          color: #000;
          font-family: 'ibm_plex_sansmedium', sans-serif;

          display: none;
        }

        .Speakers__item__header .speaker-coyLogo {
          display: none;
        }

        .Speakers__item__header .speaker-coyLogo img {
          max-height: 100%;
        }

        .Speakers__item__body,
        .expanded-item .Speakers__item__header {
          display: none;
        }

        .Speakers__item__body {
          padding: 3rem 2rem;
          color: #000;
        }

        .expanded-item .Speakers__item__body {
          display: grid;
          grid-template-columns: minmax(1rem, 7rem) 20% 40% 15% 15%;
          column-gap: 2rem;
          row-gap: 1rem;
        }

        .Speakers__item__body .icon {
          cursor: pointer;
          margin-right: 0;
        }

        .Speakers__item__body .icon img {
          pointer-events: none;
        }

        .Speakers__item__body .speaker-avatar {
          grid-column: 2/3;
          grid-row: 1/4;
        }

        .Speakers__item__body .speaker-avatar img {
          max-width: 100%;
          border-radius: 50%;
        }

        .Speakers__item__body .speaker-name {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 3rem;
        }

        .Speakers__item__body .speaker-coy {
          display: flex;
          align-items: center;
        }

        .Speakers__item__body .speaker-coyName {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 1.7rem;
        }

        .Speakers__item__body .speaker-coyLogo {
          height: 5rem;
        }

        .Speakers__item__body .speaker-coyLogo img {
          max-height: 100%;
        }

        .Speakers__item__body .speaker-talk__title {
          grid-row: 2/3;
          grid-column: 3/6;
          margin-top: 3rem;
          margin-bottom: 1rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 2.4em;
        }

        .Speakers__item__body .speaker-talk__body {
          font-size: 2em;
          grid-row: 3/4;
          grid-column: 3/6;
        }

        @media (min-width: 1224px) {
          .Speakers__item__header {
            font-size: 1.8em;
            grid-template-columns: repeat(2, minmax(1rem, 7rem)) 12% 35% 17% 16%;
          }

          .Speakers__item__header .speaker-name {
            font-size: 1em;
          }

          .Speakers__item__header .speaker-talk__title {
            grid-row: 1/2;
            grid-column: 4/5;
          }

          .Speakers__item__header .speaker-coyName {
            display: initial;
            grid-column: 5/6;
          }

          .Speakers__item__header .speaker-coyLogo {
            padding-left: 2rem;
            display: initial;
          }
        }

        @media (min-width: 1824px) {
          .Speakers__item__header {
            column-gap: 2.5rem;
            padding: 2.6rem;
          }
        }
      `}</style>
    </li>
  );
};

export default SpeakerTile;
