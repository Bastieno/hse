const PageSubHeading = ({ page, setPage, isFormEditable }) => {
  const goToPage = value => {
    if (isFormEditable) setPage(value);
  };

  return (
    <section className="page-subheading">
      {page === 0 ? (
        <>
          <div>
            <h2>Author Information</h2>
            <p className="askerisk-info">
              Your information will never be shared. All fields are required.
              {/* <span className="asterisk">*</span> */}
            </p>
          </div>

          <p className="submission-progress">
            <span
              className={
                isFormEditable
                  ? 'stages stage-0 active-indicator clickable'
                  : 'stages stage-0 active-indicator'
              }
              onClick={() => goToPage(0)}
            >
              Information
            </span>
            <span
              className={
                isFormEditable ? 'stages stage-1 clickable' : 'stages stage-1'
              }
              onClick={() => goToPage(1)}
            >
              Abstract Details
            </span>
            <span
              className={
                isFormEditable ? 'stages stage-2 clickable' : 'stages stage-2'
              }
              onClick={() => goToPage(2)}
            >
              Preview
            </span>
          </p>
        </>
      ) : page === 1 ? (
        <>
          <h2>Abstract Details</h2>

          <p className="submission-progress">
            <span
              className={
                isFormEditable ? 'stages stage-0 clickable' : 'stages stage-0'
              }
              onClick={() => goToPage(0)}
            >
              Information
            </span>
            <span
              className={
                isFormEditable
                  ? 'stages stage-1 active-indicator clickable'
                  : 'stages stage-1 active-indicator '
              }
              onClick={() => goToPage(1)}
            >
              Abstract Details
            </span>
            <span
              className={
                isFormEditable ? 'stages stage-2 clickable' : 'stages stage-2'
              }
              onClick={() => goToPage(2)}
            >
              Preview
            </span>
          </p>
        </>
      ) : (
        <>
          <h2>Abstract Preview</h2>

          <p className="submission-progress">
            <span
              className={
                isFormEditable ? 'stages stage-0 clickable' : 'stages stage-0'
              }
              onClick={() => goToPage(0)}
            >
              Information
            </span>
            <span
              className={
                isFormEditable ? 'stages stage-1 clickable' : 'stages stage-1'
              }
              onClick={() => goToPage(1)}
            >
              Abstract Details
            </span>
            <span
              className={
                isFormEditable
                  ? 'stages stage-2 active-indicator clickable'
                  : 'stages stage-2 active-indicator'
              }
              onClick={() => goToPage(2)}
            >
              Preview
            </span>
          </p>
        </>
      )}

      <style jsx>{`
        .page-subheading {
          margin-bottom: 2.5em;
        }

        h2 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.4em;
          color: #000;
          margin-bottom: 1rem;
        }

        .page-subheading div p {
          font-size: 2em;
          line-height: 1.76;
          color: #4a4a4a;
          margin-bottom: 0.5rem;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .asterisk {
          color: #d0021b;
        }

        .submission-progress {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.74em;
          line-height: 1.33;
          color: #b5b5b5;
          text-align: right;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .stages {
          padding-left: 3.2rem;
          position: relative;
          transition: all 500ms linear;
        }

        .stages::before {
          position: absolute;
          border: 1px solid;
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1.54rem;
          left: 0;
          top: 44%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          border-radius: 50%;
          padding: 1rem;
        }

        .stages.clickable:hover {
          cursor: pointer;
          color: #52b9b8;
        }

        .stages.clickable:hover::before {
          cursor: pointer;
          background-color: #52b9b8;
        }

        .stage-0::before {
          content: '1';
          background-color: rgba(181, 181, 181, 0.5);
        }

        .stage-1::before {
          content: '2';
          background-color: rgba(181, 181, 181, 0.5);
        }

        .stage-2::before {
          content: '3';
          background-color: rgba(181, 181, 181, 0.5);
        }

        .stage-0,
        .stage-1 {
          margin-right: 1.88rem;
        }

        .active-indicator {
          color: #52b9b8;
        }

        .active-indicator::before {
          background-color: #52b9b8;
        }

        @media (min-width: 769px) {
          .page-subheading {
            display: grid;
            grid-template-columns: auto auto;
            column-gap: 2rem;
            align-items: end;
          }

          .submission-progress {
            margin-top: 0;
          }

          .stage-0,
          .stage-1 {
            margin-right: 3.66rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PageSubHeading;
