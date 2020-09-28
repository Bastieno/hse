import SpeakerTile from './commons/SpeakerTile';

const speakersList = [
  {
    name: 'His Excellency, Prof. Yemi Osinbajo GCON',
    avatar: '/img/past-speakers/yemi-osibanjo.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'Vice President of the Federal Republic of Nigeria',
    coyLogo: '/img/sponsors/mpr.png',
    color: '#FBD858',
  },
  {
    name: 'Dr. Emmanuel Ibe Kachikwu',
    avatar: '/img/past-speakers/emmanuel-ibe-kachikwu.jpg',
    talkTitle: '',
    talkBody:
      '',
    coyName: 'Honorable Minister of State, Petroleum Resources',
    coyLogo: '/img/sponsors/mpr.png',
    color: '#FBD858',
  },
  {
    name: 'Mr. M.D.B Ladan',
    avatar: '/img/past-speakers/mbd-ladan.jpg',
    talkTitle: '',
    talkBody:
      '',
    coyName: 'Director of Petroleum Resources',
    coyLogo: '/img/sponsors/dpr-logo.png',
    color: '#FBD858',
  },
  {
    name: 'Dr. Musa. M. Zagi',
    avatar: '/img/past-speakers/musa-m-zagi.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'Deputy Director, HSE Division, Department of Petroleum Resources',
    coyLogo: '/img/sponsors/dpr-logo.png',
    color: '#fdd835',
  },
  {
    name: 'Dr. Folashade Yemi-Esan',
    avatar: '/img/past-speakers/folashade-yemi-esan.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'Permanent Secretary, Ministry of Petroleum Resources',
    coyLogo: '/img/sponsors/mpr.png',
    color: '#fdd835',
  },
  {
    name: 'Mr. Imevbore Victor',
    avatar: '/img/past-speakers/imevbore-victor.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'Managing Director, Environmental Resources Managers Limited – ERML',
    coyLogo: '/img/sponsors/erml.png',
    color: '#fff176',
  },
  {
    name: 'Dr. Oyet Gogomary',
    avatar: '/img/past-speakers/oyet-gogomary.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'General Manager, HSSEQ, OVH Energy Limited',
    coyLogo: '/img/sponsors/ovh.png',
    color: '#fff59d',
  },
  {
    name: 'Mr. Usani Uguru Usani',
    avatar: '/img/past-speakers/usani-uguru-usani.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'Honorable Minister of Niger Delta Affairs',
    coyLogo: '/img/sponsors/nda.png',
    color: '#fff9c4',
  },
  {
    name: 'Dr. Nwaogu Marcellinus',
    avatar: '/img/past-speakers/nwaogu-marcellinus.jpg',
    talkTitle:
      '',
    talkBody:
      '',
    coyName: 'Chevron Nigeria Limited & President, Employee Assistance Professional Association, Nigeria – Chapter',
    coyLogo: '/img/sponsors/chevron.png',
    color: '#fffde7',
  },
];

const Speakers = () => {
  const handleExpansion = e => console.log('expanded');
  const handleCollapse = e => console.log('collasped');
  // const handleExpansion = e =>
  //   e.target.parentElement.classList.add('expanded-item');

  // const handleCollapse = e =>
  //   e.target.parentElement.parentElement.classList.remove('expanded-item');

  return (
    <section className="Speakers">
      <div className="Speakers__inner container-1360">
        <h2>Past Speakers</h2>
        <p>
          We bring to us the Captains of Industry, Top stakeholders and
          Government regulators.
        </p>

        <ul className="Speakers__list">
          {speakersList.map((elem, idx) => (
            <SpeakerTile
              key={idx}
              id={idx}
              speaker={elem}
              onExpansion={handleExpansion}
              onCollapse={handleCollapse}
            />
          ))}
        </ul>
      </div>

      <style jsx>{`
        .Speakers {
          font-family: 'ibm_plex_sansregular', sans-serif;
          background-color: #fbfdff;
        }

        .Speakers__inner {
          padding-top: 9.5rem;
          padding-bottom: 7.5rem;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .Speakers__inner h2 {
          color: #000;
          font-size: 3.5em;
          margin-bottom: 1.5rem;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        .Speakers__inner > p {
          font-size: 2.5em;
          margin-bottom: 5.52rem;
        }

        @media (min-width: 1024px) {
          .Speakers__inner h2 {
            font-size: 5em;
          }
        }
      `}</style>
    </section>
  );
};

export default Speakers;
