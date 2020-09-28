import React, { useState, useEffect } from 'react';

const AbstractSubmitConfirmation = ({ abstractToModify }) => {
  const [animateCheckmark, setAnimateCheckmark] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCheckmark(true), 300);
  }, []);

  return (
    <>
      <div className="container-1220">
        <section className="Feedback">
          <div className="Feedback__inner">
            <div className="circle-loader">
              <div className={animateCheckmark ? 'checkmark draw' : ''}></div>
            </div>

            <h1>
              {abstractToModify
                ? 'Abstract Updated Successfully'
                : 'Abstract Submitted Successfully'}
            </h1>

            <button onClick={() => (window.location = '/abstracts')}>
              Go to my abstracts
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .Feedback {
          border-radius: 6px;
          box-shadow: 0 0 2px 0 rgba(67, 90, 111, 0.47);
          background-color: #fff;
          text-align: center !important;
          margin-top: 13.3rem;
        }

        .Feedback__inner {
          padding-top: 7.7rem;
          padding-bottom: 6.54rem;
        }

        .circle-loader {
          position: relative;
          width: 8.58rem;
          height: 8.58rem;
          border-radius: 50%;
          color: #fff;
          background-color: #47b881;
          margin: 0 auto;
          margin-bottom: 2.52rem;
        }

        .checkmark.draw::after {
          animation-duration: 900ms;
          animation-timing-function: ease;
          animation-name: checkmark;
          transform: scaleX(-1) rotate(135deg);
        }

        .checkmark::after {
          opacity: 1;
          height: calc(8.58rem / 2);
          width: calc(8.58rem / 3.1);
          transform-origin: left top;
          border-right: 10px solid #fff;
          border-top: 10px solid #fff;
          border-radius: 5px;
          content: '';
          left: calc(1.43rem + 0.515rem);
          top: calc(8.58rem / 2);
          position: absolute;
        }

        @keyframes checkmark {
          0% {
            height: 0;
            width: 0;
            opacity: 1;
          }
          20% {
            height: 0;
            width: calc(8.58rem / 3.1);
            opacity: 1;
          }
          40% {
            height: calc(8.58rem / 2);
            width: calc(8.58rem / 3.1);
            opacity: 1;
          }
          100% {
            height: calc(8.58rem / 2);
            width: calc(8.58rem / 3.1);
            opacity: 1;
          }
        }

        h1 {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 2em;
          color: #47b881;
          margin-bottom: 5.3rem;
        }

        button {
          padding: 0.9rem 2.2rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.4em;
          color: #fff;
          background-color: #47b881;
          border-radius: 24px;
          transition: all 500ms linear;
        }

        button:hover {
          cursor: pointer;
          background-color: #31a879;
        }
      `}</style>
    </>
  );
};

export default AbstractSubmitConfirmation;

// $brand-success: #5cb85c;
// $loader-size: 7em;
// $check-height: $loader-size/2;
// $check-width: $check-height/2;
// $check-left: ($loader-size/6 + $loader-size/12);
// $check-thickness: 3px;
// $check-color: $brand-success;
