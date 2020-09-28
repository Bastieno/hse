import { createRef } from 'react';
import { Tabs as AntTabs, Popover } from 'antd';
import styled from 'styled-components';
import scheduleList from '../data/schedules';

const Tabs = styled(AntTabs)`
  .ant-tabs-nav .ant-tabs-tab {
    font-size: 19px !important;
  }

  .ant-tabs-nav .ant-tabs-tab:hover {
    color: #000 !important;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    font-family: 'ibm_plex_sansmedium', sans-serif;
    color: #000 !important;
    font-size: 22px !important;
  }

  .ant-tabs-ink-bar {
    background-color: #000 !important;
    height: 3px !important;
  }
`;

const { TabPane } = AntTabs;

const PanelDiscussion = ({ event }) => {
  return (
    <>
      <div>
        {event.title}
        <span
          className="Event__Info--color"
          style={{
            display: 'inline-block',
            width: '1.3rem',
            height: '1.3rem',
            borderRadius: '50%',
            marginLeft: '1.2rem',
            background: `${event.colorCode}`,
          }}
        ></span>
        <br />
        <div className="Event__Info--sess-chair">
          <span className="Event__Info--sess-chair-name">
            Panel Moderator: {event.sessionChairperson.name}
          </span>
          <br />
          <span className="Event__Info--sess-chair-org">
            {event.sessionChairperson.org}
          </span>
        </div>
        <br />
        <p className="Event__Info--discussants--title">Panelists:</p>
        <ul className="Event__Info--discussants">
          {event.discussants.map((discussant, idx) => {
            return (
              <li key={idx}>
                <span
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                  }}
                >
                  {discussant.name}
                </span>{' '}
                - {discussant.org}
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        .Event__Info--sess-chair,
        .Event__Info--discussants--title {
          margin-top: 1.5rem;
        }

        .Event__Info--sess-chair-name {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #000;
        }

        .Event__Info--discussants--title {
          margin-bottom: 1rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #000;
        }

        .Event__Info--discussants {
          line-height: 1.7;
        }
      `}</style>
    </>
  );
};

const TechicalSession = ({ session }) => {
  return (
    <>
      <div className="VenuesGroup">
        <p style={{ paddingRight: '2rem' }}>
          Session Chairperson{' '}
          <span
            className="Event__Info--color"
            style={{
              display: 'inline-block',
              width: '1.3rem',
              height: '1.3rem',
              borderRadius: '50%',
              marginLeft: '1.2rem',
              backgroundColor: `${session.colorCode}`,
              float: 'right',
            }}
          ></span>
        </p>

        <div className="VenuesGroup__Header">
          {session.venues.map((venue, idx) => (
            <div key={idx}>
              <p>{`${venue.name} - ${venue.theme}`}</p>
              {venue.abstractPresenters.map((presenter, idx) => (
                <p key={idx} className="Presenter">
                  {presenter}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="VenuesGroup__Body">
          {session.venues.map((venue, idx) => (
            <div key={idx}>
              <p>{venue.abstractTitle}</p>
              <p>{venue.abstractAuthors}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .VenuesGroup > p,
        .Presenter {
          font-family: 'ibm_plex_sansbold', sans-serif;
          color: #000;
          font-size: 1.7rem;
        }

        .VenuesGroup__Header,
        .VenuesGroup__Body {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          column-gap: 4rem;
        }

        .VenuesGroup__Header {
          padding-right: 2rem;
          padding-bottom: 1rem;
        }

        .VenuesGroup__Header p {
          margin-bottom: 0.1em;
        }

        .VenuesGroup__Body {
          background-color: #fff;
          padding-top: 1rem;
          padding-bottom: 2rem;
          padding-right: 2rem;
          color: #4a4a4a;
          line-height: 1.46;
        }

        .VenuesGroup__Header div,
        .VenuesGroup__Body div {
          font-size: 1.7rem;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }
      `}</style>
    </>
  );
};

const conferenceDays = Object.keys(scheduleList);
const arrayOfBreaks = ['Tea Break', 'Lunch', 'Long Break', 'Tea/Coffee Break'];

const Schedule = () => {
  return (
    <>
      <section className="Schedule">
        <div className="Schedule__inner container-1220">
          <h2>Schedule</h2>

          <Tabs
            defaultActiveKey="0"
            tabBarStyle={{
              fontFamily: "'ibm_plex_sansregular', sans-serif",
              color: '#9b9b9b',
              borderBottomColor: 'transparent',
            }}
          >
            {conferenceDays.map((eventDay, idx) => {
              const refs = scheduleList[eventDay].events.reduce(
                (acc, value, idx) => {
                  acc[idx] = createRef();
                  return acc;
                },
                {}
              );

              const handleEventScroll = eventIdx => {
                refs[eventIdx].current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                });
              };

              const tooltipStyle = {
                fontFamily: "'ibm_plex_sansregular', sans-serif",
                fontSize: '15px',
                color: '#4a4a4a',
                borderRadius: '7px',
                backgroundColor: '#fff',
                width: '250px',
              };

              const PopoverContent = ({ event }) => {
                return (
                  <>
                    <h3
                      style={{
                        fontSize: 17,
                        fontFamily: "'ibm_plex_sansmedium', sans-serif",
                      }}
                    >
                      {event.presenters}
                    </h3>
                    <p style={{ marginBottom: '0.5em' }}>{event.title}</p>
                    <p style={{ marginBottom: 0, color: event.colorCode }}>
                      {event.start} - {event.end}
                    </p>
                  </>
                );
              };

              return (
                <TabPane tab={eventDay} key={idx}>
                  <p className="date">{scheduleList[eventDay].date}</p>
                  <p className="time__duration">{`${scheduleList[eventDay].start} - ${scheduleList[eventDay].end} (${scheduleList[eventDay].duration} Hours)`}</p>
                  <p className="count">{`${scheduleList[eventDay].eventCount} Events`}</p>

                  <p className="Events__Shortcut">
                    {scheduleList[eventDay].events.map((event, idx) => {
                      return (
                        <Popover
                          key={idx}
                          overlayStyle={tooltipStyle}
                          content={<PopoverContent event={event} />}
                        >
                          <span
                            key={idx}
                            style={{
                              display: 'inline-block',
                              width: `calc((${event.duration} / ${scheduleList[
                                eventDay
                              ].duration * 60}) * 100%)`,
                              height: '100%',
                              borderRadius: 10,
                              border: arrayOfBreaks.includes(event.title)
                                ? `1px solid ${event.colorCode}`
                                : 'none',
                              background: arrayOfBreaks.includes(event.title)
                                ? `repeating-linear-gradient(45deg, ${event.colorCode}, ${event.colorCode} 2px, #fff 1px, #fff 6px)`
                                : `${event.colorCode}`,
                              cursor: 'pointer',
                            }}
                            title="Click to view this event details"
                            data-event={idx}
                            onClick={() => handleEventScroll(idx)}
                          ></span>
                        </Popover>
                      );
                    })}
                  </p>

                  <h3>Event Details</h3>

                  <div className="Event__Details__Container">
                    <table className="Event__Details__Table">
                      <tbody>
                        {scheduleList[eventDay].events.map((event, idx) => {
                          return (
                            <tr key={idx} ref={refs[idx]}>
                              <th className="Event__Time">
                                <span className="Event__Time--duration">
                                  {event.duration} mins
                                </span>
                                <br />
                                <span className="Event__Time--time">
                                  {`${event.start} - ${event.end}`}
                                </span>
                              </th>
                              <td
                                className="Event__Info"
                                style={{
                                  backgroundColor:
                                    event.title ==
                                      'Breakout Technical Sessions' &&
                                    event.bgColorCode,
                                  paddingBottom:
                                    event.title ==
                                      'Breakout Technical Sessions' && 0,
                                  paddingRight:
                                    event.title ==
                                      'Breakout Technical Sessions' && 0,
                                }}
                              >
                                {event.title ==
                                'Breakout Technical Sessions' ? (
                                  <TechicalSession session={event} />
                                ) : event.title ==
                                  'Conference Panel Discussion' ? (
                                  <PanelDiscussion event={event} />
                                ) : (
                                  <>
                                    {event.title}
                                    <span
                                      className="Event__Info--color"
                                      style={{
                                        display: 'inline-block',
                                        width: '1.3rem',
                                        height: '1.3rem',
                                        borderRadius: '50%',
                                        border: arrayOfBreaks.includes(
                                          event.title
                                        )
                                          ? `1px solid ${event.colorCode}`
                                          : 'none',
                                        marginLeft: '1.2rem',
                                        background: arrayOfBreaks.includes(
                                          event.title
                                        )
                                          ? `repeating-linear-gradient(45deg, ${event.colorCode}, ${event.colorCode} 2px, #fff 1px, #fff 5px)`
                                          : `${event.colorCode}`,
                                      }}
                                    ></span>
                                    <br />
                                    <span className="Event__Info--presenter">
                                      {event.presenters}
                                    </span>

                                    {event.otherDetails && (
                                      <>
                                        <br />
                                        <ul className="Event__Info--other-details">
                                          {event.otherDetails.map(
                                            (item, idx) => {
                                              return <li key={idx}>{item}</li>;
                                            }
                                          )}
                                        </ul>
                                      </>
                                    )}

                                    {event.sessionChairperson && (
                                      <>
                                        <br />
                                        <div className="Event__Info--sess-chair">
                                          <span className="Event__Info--sess-chair-name">
                                            Session Chairperson:{' '}
                                            {event.sessionChairperson.name}
                                          </span>
                                          <br />
                                          <span className="Event__Info--sess-chair-org">
                                            {event.sessionChairperson.org}
                                          </span>
                                        </div>
                                      </>
                                    )}

                                    {event.discussants && (
                                      <>
                                        {/* <br /> */}
                                        <p className="Event__Info--discussants--title">
                                          Discussants:
                                        </p>
                                        <ul className="Event__Info--discussants">
                                          {event.discussants.map(
                                            (discussant, idx) => {
                                              return (
                                                <li key={idx}>
                                                  <span
                                                    style={{
                                                      fontWeight: 'bold',
                                                      color: '#000',
                                                    }}
                                                  >
                                                    {discussant.name}
                                                  </span>{' '}
                                                  - {discussant.org}
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </section>

      <style jsx>{`
        .Schedule__inner {
          padding-top: 4.81rem;
          padding-bottom: 13.76rem;
        }

        .Schedule__inner h2 {
          color: #000;
          font-size: 5em;
          font-family: 'ibm_plex_sansbold', sans-serif;
          margin-bottom: 3rem;
        }

        h3 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.3rem;
          color: #000;
        }

        .date,
        .time__duration,
        .count {
          text-align: right;
          margin-bottom: 0.1rem;
        }

        .date {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 3.4rem;
          color: #000;
        }

        .time__duration {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 2.3rem;
          color: #4a4a4a;
        }

        .count {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.3rem;
          color: #000;
        }

        .Events__Shortcut {
          width: 100%;
          height: 50px;
          margin-top: 35px;
          margin-bottom: 74px;
        }

        .Event__Details__Container {
          height: 400px;
          overflow: auto;
        }

        .Event__Details__Container::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        .Event__Details__Container::-webkit-scrollbar {
          width: 4px;
          height: 4px;
          background-color: #f5f5f5;
        }

        .Event__Details__Container::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #555;
        }

        .Event__Details__Table {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 1.7rem;
          color: #4a4a4a;
          table-layout: fixed;
          min-width: 1165px;
          width: 100%;
        }

        .Event__Details__Table tbody tr {
          padding-right: 1.5rem;
        }

        .Event__Time,
        .Event__Info {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .Event__Time {
          width: 16%;
          padding-right: 2rem;
        }

        .Event__Time--duration {
          font-size: 2.1rem;
          color: #000;
        }

        .Event__Info {
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          width: 80%;
          padding-right: 2rem;
        }

        tbody .Event__Info:first-of-type {
          border-top: none;
        }

        .Event__Info--presenter {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #000;
        }

        .Event__Info--other-details {
          margin-top: 1.5rem;
          line-height: 1.7;
        }

        .Event__Info--sess-chair,
        .Event__Info--discussants--title {
          margin-top: 1.5rem;
        }

        .Event__Info--sess-chair-name {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #000;
        }

        .Event__Info--discussants--title {
          margin-bottom: 1rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #000;
        }

        .Event__Info--discussants {
          line-height: 1.7;
        }
      `}</style>
    </>
  );
};

export default Schedule;
