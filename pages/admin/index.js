import React, { Component } from 'react';
import * as d3 from 'd3';
import Link from 'next/link';
import { connect } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProtectedRoute from '../../components/layout/AdminProtectedRoute';
import AdminRoute from '../../components/layout/AdminRoute';
import adminDashboardData from '../../data/adminDashboard';
import { getAllRegistrations } from '../../services/conferenceRegistration';
import { nairaFormatter } from '../../helpers/formatters';

const regCatColor = {
  IND: '#5073b8',
  CPC: '#0ab39c',
  PAT: '#f1963a',
  STD: '#f16548',
};

class AdminDashboard extends Component {
  state = {
    allTicketsSold: [],
  };

  svgElem = React.createRef();

  async componentDidMount() {
    try {
      const { data } = await getAllRegistrations();
      this.setState({ allTicketsSold: data.regs });

      this.setState({ dataSource, isLoading: false });
    } catch (error) {}

    this.drawChart(this.svgElem);
  }

  drawChart = containerElem => {
    const width = containerElem.current.getBoundingClientRect().width + 70;
    const height = containerElem.current.getBoundingClientRect().height + 100;

    var radius = Math.min(width, height) / 2;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select(containerElem.current)
      // .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Create dummy data
    var data = {
      IND: this.state.allTicketsSold.filter(
        ticket => ticket.category === 'Individual'
      ).length,
      CPC: this.state.allTicketsSold.filter(
        ticket => ticket.category === 'CPC Members'
      ).length,
      PAT: this.state.allTicketsSold.filter(
        ticket => ticket.category === 'Presenting Authors'
      ).length,
      STD: this.state.allTicketsSold.filter(
        ticket => ticket.category === 'Student'
      ).length,
    };

    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(data)
      .range(Object.values(regCatColor));

    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.value;
      });

    const arc = d3
      .arc()
      .innerRadius(50)
      .outerRadius(function(d) {
        return radius - d.index * 10;
      });

    var data_ready = pie(d3.entries(data));

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('fill', function(d) {
        return color(d.data.key);
      })
      .transition()
      .delay(function(d, i) {
        return i * 500;
      })
      .duration(500)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle + 0.01, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });
  };

  render() {
    return (
      <>
        <AdminRoute>
          <AdminProtectedRoute>
            <AdminLayout>
              <section className="AdminDashboard">
                <div className="AdminDashboard__inner">
                  <Link href="/admin/abstracts">
                    <section className="TotalAbstracts">
                      <span className="TotalAbstractsIcon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                        >
                          <path
                            fill="#6554C0"
                            fillRule="evenodd"
                            d="M21.184 3.5h1.658c.916 0 1.658.709 1.658 1.583v14.778a2.837 2.837 0 0 0-1.658-.528H7.922V3.5h6.63v8.972c0 .374.396.629.759.49l2.557-.977 2.558.977c.363.139.758-.116.758-.49V3.5zm-3.193 7.402a.577.577 0 0 0-.073-.011l-2.26.863-.052-8.254h4.473l.052 8.254-2.14-.852zM3.5 20.442V5.083c0-.874.742-1.583 1.658-1.583h1.658v15.833h-.553a3.948 3.948 0 0 0-2.763 1.11zm2.763-.053h16.58c.915 0 1.657.709 1.657 1.583v2.111c0 .875-.742 1.584-1.658 1.584H6.263c-1.526 0-2.763-1.182-2.763-2.64 0-1.457 1.237-2.638 2.763-2.638z"
                          />
                        </svg>
                      </span>
                      <span>
                        <h2>Total Abstracts</h2>
                        <p>{adminDashboardData.totalAbstracts}</p>
                      </span>
                    </section>
                  </Link>

                  <section className="TotalFullpapers">
                    <span className="TotalFullpapersIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                      >
                        <path
                          fill="#3DD598"
                          fillRule="evenodd"
                          d="M21.184 3.5h1.658c.916 0 1.658.709 1.658 1.583v14.778a2.837 2.837 0 0 0-1.658-.528H7.922V3.5h6.63v8.972c0 .374.396.629.759.49l2.557-.977 2.558.977c.363.139.758-.116.758-.49V3.5zm-3.193 7.402a.577.577 0 0 0-.073-.011l-2.26.863-.052-8.254h4.473l.052 8.254-2.14-.852zM3.5 20.442V5.083c0-.874.742-1.583 1.658-1.583h1.658v15.833h-.553a3.948 3.948 0 0 0-2.763 1.11zm2.763-.053h16.58c.915 0 1.657.709 1.657 1.583v2.111c0 .875-.742 1.584-1.658 1.584H6.263c-1.526 0-2.763-1.182-2.763-2.64 0-1.457 1.237-2.638 2.763-2.638z"
                        />
                      </svg>
                    </span>
                    <span>
                      <h2>Total Fullpapers</h2>
                      <p>{adminDashboardData.totalFullpapers}</p>
                    </span>
                  </section>

                  <section className="ExhibitionRequests">
                    <span className="ExhibitionRequestsIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                      >
                        <path
                          fill="#AEAEB2"
                          fillRule="evenodd"
                          d="M13.5 7.793c4.67 0 8.841 3.24 10.88 8.23a.66.66 0 0 1 0 .498c-2.039 4.99-6.21 8.229-10.88 8.229-4.67 0-8.841-3.239-10.88-8.229a.66.66 0 0 1 0-.499c2.039-4.99 6.21-8.229 10.88-8.229zm0 5.218c-1.775 0-3.214 1.46-3.214 3.26 0 1.802 1.439 3.262 3.214 3.262s3.214-1.46 3.214-3.261c0-1.801-1.439-3.261-3.214-3.261zm0 1.304c1.065 0 1.929.876 1.929 1.957 0 1.08-.864 1.956-1.929 1.956s-1.929-.876-1.929-1.956.864-1.957 1.929-1.957zM24.468 3.841a.988.988 0 0 1 0 1.383l-2.572 2.609a.955.955 0 0 1-1.364 0 .988.988 0 0 1 0-1.383l2.572-2.61a.955.955 0 0 1 1.364 0zm-20.572 0L6.468 6.45a.988.988 0 0 1 0 1.383.955.955 0 0 1-1.364 0L2.532 5.224a.988.988 0 0 1 0-1.383.955.955 0 0 1 1.364 0zM13.5 2.25c.533 0 .964.438.964.978v2.609c0 .54-.431.978-.964.978a.971.971 0 0 1-.964-.978V3.228c0-.54.431-.978.964-.978z"
                        />
                      </svg>
                    </span>
                    <span>
                      <h2>Exhibition Requests</h2>
                      <p>{adminDashboardData.exhibitionRequests}</p>
                    </span>
                  </section>

                  <Link href="/admin/tickets">
                    <section className="TicketsPurchased">
                      <span className="TicketsPurchasedIcon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                        >
                          <path
                            fill="#FFA958"
                            fillRule="evenodd"
                            d="M14.66 2.257l8.746.795a.598.598 0 0 1 .542.542l.795 8.746a1.794 1.794 0 0 1-.519 1.43l-9.753 9.754a4.186 4.186 0 0 1-5.92 0l-5.075-5.075a4.186 4.186 0 0 1 0-5.92l9.753-9.753c.377-.377.901-.567 1.431-.519zm4.886 5.197a2.99 2.99 0 1 0-4.229 4.229 2.99 2.99 0 0 0 4.229-4.229zm-3.383.846a1.794 1.794 0 1 1 2.537 2.537A1.794 1.794 0 0 1 16.163 8.3z"
                          />
                        </svg>
                      </span>
                      <span>
                        <h2>Tickets Purchased</h2>
                        <p>{adminDashboardData.ticketsPurchased}</p>
                      </span>
                    </section>
                  </Link>

                  <section className="ApprovedFullpapers">
                    <h2>Approved Fullpapers</h2>
                    {adminDashboardData.approvedFullpapers.map((item, i) => (
                      <p key={i}>
                        <span
                          className="Fullpaper__Authors"
                          title={item.authors.join(', ')}
                        >{`${item.authors[0]} (${item.authors.length})`}</span>
                        <span
                          className="Fullpaper__Title"
                          title={item.abstractTitle}
                        >
                          {item.abstractTitle}
                        </span>
                      </p>
                    ))}
                  </section>

                  <section className="TicketsBreakdown">
                    <h2>Ticket Breakdown</h2>
                    <div className="ContentArea">
                      <div className="TicketInfo">
                        {Object.values(this.props.registrationCategories).map(
                          ({ code, category, amount }) => (
                            <p key={code}>
                              <span
                                style={{
                                  width: '1rem',
                                  height: '1rem',
                                  marginRight: '2rem',
                                  borderRadius: '50%',
                                  backgroundColor: regCatColor[code],
                                }}
                              ></span>
                              <span className="TicketInfo__Name">
                                {category}
                              </span>
                              <span className="TicketInfo__Amount">
                                {nairaFormatter(amount)}
                              </span>
                            </p>
                          )
                        )}
                      </div>
                      <svg ref={this.svgElem}></svg>
                    </div>
                  </section>

                  <section className="Attendees">
                    <h2>Attendees</h2>
                  </section>

                  <Link href="/admin/sponsorship-requests">
                    <section className="TopSponsors">
                      <h2>Top Sponsors</h2>
                      {adminDashboardData.topSponsors.map((item, i) => (
                        <p key={i}>
                          <span className="Sponsor__Organisation">
                            {item.organisation}
                          </span>
                          <span className="Sponsor__Fullname">{`${item.firstName} ${item.lastName}`}</span>
                          <span className="Sponsor__Email">{item.email}</span>
                        </p>
                      ))}
                    </section>
                  </Link>
                </div>
              </section>
            </AdminLayout>
          </AdminProtectedRoute>
        </AdminRoute>

        <style jsx>{`
          .AdminDashboard {
            overflow: auto;
            height: calc(100vh - 90px - 2rem);
            font-size: 1rem;
          }

          .AdminDashboard::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: #f5f5f5;
          }

          .AdminDashboard::-webkit-scrollbar {
            width: 4px;
            background-color: #f5f5f5;
          }

          .AdminDashboard::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #555;
          }

          .AdminDashboard__inner {
            min-height: calc(100vh - 8.5rem - 2rem);
            padding-left: 3rem;
            padding-right: 3rem;

            display: grid;
            grid-gap: 2.2rem;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: minmax(14rem, auto);
          }

          .AdminDashboard__inner > section,
          .AdminDashboard__inner > a {
            padding: 3rem 4rem;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4.5px 17.5px 2px rgba(0, 0, 0, 0.03);
            transition: all 500ms ease;
          }

          .AdminDashboard__inner > section:hover,
          .AdminDashboard__inner > a:hover {
            cursor: pointer;
            transform: scale(1.011);
          }

          .TotalAbstracts,
          .TotalFullpapers,
          .ExhibitionRequests,
          .TicketsPurchased {
            display: flex;
            align-items: center;
          }

          .TotalAbstracts h2,
          .TotalFullpapers h2,
          .ExhibitionRequests h2,
          .TicketsPurchased h2 {
            margin-bottom: 0;
            font-size: 1.6em;
            color: #404040;
            font-family: 'ibm_plex_sansregular', sans-serif;
          }

          .TotalAbstractsIcon,
          .TotalFullpapersIcon,
          .ExhibitionRequestsIcon,
          .TicketsPurchasedIcon {
            width: 6.2rem;
            height: 6.2rem;
            margin-right: 2.2rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .TotalAbstractsIcon {
            background-color: #e8e7ff;
          }

          .TotalFullpapersIcon {
            background-color: #daf7e8;
          }

          .ExhibitionRequestsIcon {
            background-color: #f0f0f7;
          }

          .TicketsPurchasedIcon {
            background-color: #fff4e5;
          }

          .TotalAbstracts p,
          .TotalFullpapers p,
          .ExhibitionRequests p,
          .TicketsPurchased p {
            margin-bottom: 0;
            font-size: 2.8em;
            letter-spacing: 0.5px;
            color: #404040;
            font-family: 'ibm_plex_sansmedium', sans-serif;
          }

          .ApprovedFullpapers,
          .TicketsBreakdown,
          .Attendees,
          .TopSponsors {
            grid-column: span 2;
            grid-row: span 3;
            box-shadow: -5px 5px 10px 0 rgba(30, 30, 30, 0.06);
          }

          .ApprovedFullpapers h2,
          .TicketsBreakdown h2,
          .Attendees h2,
          .TopSponsors h2 {
            margin-bottom: 3rem;
            font-size: 2em;
            color: #282d32;
            font-family: 'ibm_plex_sansmedium', sans-serif;
          }

          .ApprovedFullpapers p,
          .TopSponsors p,
          .TicketsBreakdown p {
            display: flex;
            align-items: center;
            font-size: 1.6em;
            line-height: 1.9;
          }

          .ApprovedFullpapers .Fullpaper__Authors {
            width: 22rem;
            margin-right: 2rem;
            color: #282d32;
            text-transform: capitalize;
            font-family: 'ibm_plex_sansmedium', sans-serif;
          }

          .ApprovedFullpapers .Fullpaper__Title {
            flex: 1 1 0;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-transform: capitalize;
          }

          .TopSponsors span {
            margin-right: 2rem;
            color: #666666;
          }

          .TicketInfo__Name,
          .TopSponsors .Sponsor__Organisation {
            width: 18rem;
            margin-right: 2rem;
            color: #282d32;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-transform: capitalize;
            font-family: 'ibm_plex_sansmedium', sans-serif;
          }

          .TopSponsors .Sponsor__Fullname {
            width: 22rem;
            text-transform: capitalize;
          }

          .TopSponsors .Sponsor__Email {
            margin-right: 0;
            flex-grow: 1 1 0;
          }

          .TicketsBreakdown {
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .TicketsBreakdown .ContentArea {
            display: flex;
            flex: 1 1 0;
            align-items: center;
          }

          .TicketsBreakdown .TicketInfo {
            margin-right: 2rem;
          }

          .TicketsBreakdown svg {
            flex: 1 1 0;
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    registrationCategories: state.registrationCategories,
  };
};

export default connect(mapStateToProps, null)(AdminDashboard);
