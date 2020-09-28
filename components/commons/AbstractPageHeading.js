import Link from 'next/link';

const AbstractPageHeading = () => {
  return (
    <>
      <header className="Header">
        <h1>Abstract Requirements</h1>
        <Link href="/abstracts">
          <a className="btn">Already submitted abstract?</a>
        </Link>
      </header>

      <section className="SubmitAbstract__teaser">
        <div className="desc">
          <h2>
            The abstract should summarize the paper and state the following:
          </h2>
          <ul className="desc__list">
            <li className="desc__item">Problem / Challenge</li>
            <li className="desc__item">
              Approach to the solution (methodology)
            </li>
            <li className="desc__item">Findings</li>
            <li className="desc__item">Solutions / Recommendations</li>
          </ul>
        </div>

        {/* <div className="req">
          <p>
            Papers should be printed in Times New Roman font style, 12 point
            font size with single spacing, and should not be more than one (1)
            page of A4 size in length and should contain sufficient details.{' '}
          </p>
        </div> */}
      </section>

      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .Header {
          margin-bottom: 4.3rem;
        }

        .Header h1 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.8em;
          color: #000;
          margin-right: 2rem;
          display: inline-block;
        }

        .Header .btn {
          color: #fff;
          font-size: 1.7em;
          padding: 0.9rem 2.5rem;
          background-color: #52b9b8;
          vertical-align: top;
        }

        .Header .btn:hover {
          background-color: #1e8493;
        }

        .SubmitAbstract__teaser {
          width: 100%;
          margin-bottom: 6.5rem;
        }

        .SubmitAbstract__teaser .desc {
          padding: 1.5rem;
          border-radius: 10px;
          background-color: rgba(71, 193, 191, 0.03);
        }

        .desc h2 {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 2em;
          line-height: 1.76;
          color: #000;
          margin-bottom: 1.1rem;
        }

        .desc__item {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 1.85em;
          line-height: 1.76;
          color: #000;
          position: relative;
          padding-left: 2rem;
        }

        .desc__item::before {
          content: '*';
          position: absolute;
          font-size: 1em;
          left: 0;
        }

        // .SubmitAbstract__teaser .req {
        //   font-size: 2em;
        //   line-height: 1.7;
        //   color: #ed6347;
        //   font-family: 'Avenir Next', sans-serif;
        // }

        @media (min-width: 769px) {
          .SubmitAbstract__teaser .desc {
            padding: 2.5rem 4rem;
          }
        }
      `}</style>
    </>
  );
};

export default AbstractPageHeading;
