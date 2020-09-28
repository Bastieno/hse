const TwitterEngagement = () => {
  return (
    <section className="TwitterEngagement">
      <div className="TwitterEngagement__inner container-940">
        <div className="twitter-icon">
          <img src="/icons/twitter-bird-blue.svg" />
        </div>
        <section>
          <h2>Happening on Twitter</h2>
          <section className="twitter-card__group">
            <div className="twitter-card">
              <p className="tweet">
                "I’m a tech girl and I use a lot of Apps, but Oval Money is
                special because it helps me save money on a daily basis."
              </p>

              <div className="tweeter">
                <span className="avatar">
                  <img src="/img/alessia.png" />
                </span>
                <span>
                  <div className="name">Alessia C.</div>
                  <div className="location">London, UK</div>
                </span>
              </div>
            </div>
            <div className="twitter-card">
              <p className="tweet">
                “Marek is a highly motivated individual with a diverse skill
                set.”
              </p>

              <div className="tweeter">
                <span className="avatar">
                  <img src="/img/alessia.png" />
                </span>
                <span>
                  <div className="name">Alessia C.</div>
                  <div className="location">London, UK</div>
                </span>
              </div>
            </div>
            <div className="twitter-card">
              <p className="tweet">
                Upgraded to @culturedcode's Friendly on all my devices – love
                the new design and features. Best to-do app out there…
              </p>

              <div className="tweeter">
                <span className="avatar">
                  <img src="/img/alessia.png" />
                </span>
                <span>
                  <div className="name">Alessia C.</div>
                  <div className="location">London, UK</div>
                </span>
              </div>
            </div>
            <div className="twitter-card">
              <p className="tweet">
                "I’m a tech girl and I use a lot of Apps, but Oval Money is
                special because it helps me save money on a daily basis."
              </p>

              <div className="tweeter">
                <span className="avatar">
                  <img src="/img/alessia.png" />
                </span>
                <span>
                  <div className="name">Alessia C.</div>
                  <div className="location">London, UK</div>
                </span>
              </div>
            </div>
            <div className="twitter-card">
              <p className="tweet">
                "If you’ve ever been one of those folks that worries that you
                don’t know enough CSS to make a site look like you want it to,
                you can stop stressing right about now" "If you’ve ever been one
                of those folks that worries that you don’t know enough
              </p>

              <div className="tweeter">
                <span className="avatar">
                  <img src="/img/alessia.png" />
                </span>
                <span>
                  <div className="name">Alessia C.</div>
                  <div className="location">London, UK</div>
                </span>
              </div>
            </div>
            <div className="twitter-card">
              <p className="tweet">
                Upgraded to @culturedcode's Friendly on all my devices – love
                the new design and features. Best to-do app out there…
              </p>

              <div className="tweeter">
                <span className="avatar">
                  <img src="/img/alessia.png" />
                </span>
                <span>
                  <div className="name">Alessia C.</div>
                  <div className="location">London, UK</div>
                </span>
              </div>
            </div>
          </section>
        </section>
      </div>

      <style jsx>
        {`
          .TwitterEngagement {
            background-color: #f9f9f9;
          }

          .TwitterEngagement__inner {
            padding-top: 6.8rem;
            padding-bottom: 11.7rem;
          }

          .twitter-icon {
            margin-bottom: 2rem;
            text-align: center;
          }

          h2 {
            margin-bottom: 5rem;
            font-size: 5em;
            color: #191919;
            font-family: 'Product Sans Bold', sans-serif;
            text-align: center;
            letter-spacing: -1px;
          }

          .Embedded__timeline {
            border: 1px solid #000;
          }

          .twitter-card__group {
            display: grid;
            grid-gap: 3rem;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(9rem, auto);
          }

          .twitter-card {
            display: flex;
            flex-direction: column;
            padding: 2rem 2.8rem;
            background-color: #fff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
          }

          .twitter-card:first-of-type {
            grid-row: 1/5;
          }

          .twitter-card:nth-of-type(2) {
            grid-row: 1/4;
          }

          .twitter-card:nth-of-type(3) {
            grid-row: 1/5;
          }

          .twitter-card:nth-of-type(4) {
            grid-row: 5/8;
          }

          .twitter-card:nth-of-type(5) {
            grid-row: 4/9;
          }

          .twitter-card:nth-of-type(6) {
            grid-row: 5/8;
          }

          .tweet {
            color: #191919;
            font-size: 2.1rem;
            line-height: 1.52;
            flex-grow: 1;
          }

          .tweeter {
            justify-self: flex-end;
            display: flex;
            align-items: center;
          }

          .tweeter span:last-of-type {
            line-height: 1.2;
          }

          .avatar {
            width: 5.6rem;
            height: 5.6rem;
            margin-right: 2.2rem;
          }

          .avatar img {
            max-width: 100%;
            max-height: 100%;
          }

          .name {
            color: #191919;
            font-size: 2em;
          }

          .location {
            color: #c0c0c0;
            font-size: 1.6em;
          }
        `}
      </style>
    </section>
  );
};

export default TwitterEngagement;
