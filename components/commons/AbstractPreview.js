import ReactHtmlParser from 'react-html-parser';
const AbstractPreview = ({ values, abstractMarkup, authors, presenters }) => {
  const {
    presentationCategory,
    orgName,
    orgAddress,
    abstractTitle,
    abstractSubtitle,
    abstractBody,
  } = values;

  return (
    <section className="AbstractPreview">
      <section className="AbstractPreview__cont">
        <h3>Abstract Details</h3>

        <section className="AbstractTitle">
          <h4>Abstract Title</h4>
          <p>{abstractTitle}</p>
        </section>

        {abstractSubtitle && (
          <section className="AbstractSubtitle">
            <h4>Abstract Subtitle</h4>
            <p>{abstractSubtitle}</p>
          </section>
        )}
      </section>

      <section className="AbstractBody">
        <div
          className="AbstractPreview__cont"
          style={{
            fontFamily: "'ibm_plex_sansregular', sans-serif",
            // fontFamily: 'Times New Roman',
            fontSize: '1.8rem',
            lineHeight: 1.56,
            letterSpacing: '0.4px',
            marginBottom: '1.63rem',
            color: '#000',
          }}
        >
          {ReactHtmlParser(abstractMarkup)}
        </div>
      </section>

      <section className="AbstractPreview__cont ">
        <h3>Author Information</h3>
        <section className="AuthorInfo">
          <div>
            <section>
              <h4>Presentation Category</h4>
              <p>{presentationCategory}</p>
            </section>

            <section>
              <h4>Authors</h4>
              <p>{authors.map(elem => elem.value).join(', ')}</p>
            </section>
          </div>

          {presenters.length > 0 && (
            <div>
              <section>
                <h4>Presenters</h4>
                <p>{presenters.map(elem => elem.value).join(', ')}</p>
              </section>
            </div>
          )}

          <div>
            <section>
              <h4>Name of Organisation</h4>
              <p>{orgName}</p>
            </section>
            <section>
              <h4>Address of Organisation</h4>
              <p>{orgAddress}</p>
            </section>
          </div>
        </section>
      </section>

      <style jsx>{`
        .AbstractPreview {
          padding-top: 1.6rem;
          padding-bottom: 2rem;
        }

        .AbstractPreview__cont {
          padding: 0 1.5rem;
        }

        h3 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.2em;
          color: #000;
        }

        h4 {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.7em;
          color: #4a4a4a;
          margin-top: 2.9rem;
          margin-bottom: 1.2rem;
        }

        .AbstractTitle,
        .AbstractSubtitle {
          width: 75%;
        }

        .AbstractTitle {
          margin-bottom: 4rem;
        }

        h4 + p {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 2em;
          color: #000;
          margin-bottom: 2rem;
        }

        .AbstractBody {
          padding: 2.9rem 0;
          margin: 2.4rem 0;
          letter-spacing: 0.4px;
          border-top: 1px solid rgba(151, 151, 151, 0.3);
          border-bottom: 1px solid rgba(151, 151, 151, 0.3);
        }

        .AbstractBody p,
        .AbstractBody ol,
        .AbstractBody ul {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 1.6em;
          line-height: 1.56;
          margin-bottom: 1.63rem;
          color: #000;
        }

        em.italic {
          font-style: italic !important;
        }

        .AbstractBody p:last-child {
          margin-bottom: 0;
        }

        .AuthorInfo div {
          border-bottom: 1px solid rgba(151, 151, 151, 0.3);
        }

        .AuthorInfo div:last-child {
          border-bottom: 0;
        }

        @media (min-width: 769px) {
          .AbstractPreview__cont {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1025px) {
          .AbstractPreview__cont {
            padding: 0 10rem;
          }

          .AuthorInfo div {
            display: grid;
            grid-template-columns: 45% auto;
            column-gap: 4rem;
            border-bottom: 1px solid rgba(151, 151, 151, 0.3);
          }
        }

        @media (min-width: 1225px) {
          .AbstractPreview__cont {
            padding: 0 20rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AbstractPreview;
