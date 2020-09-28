import React, { Component } from 'react';
import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import AdminRoute from '../../components/layout/AdminRoute';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProtectedRoute from '../../components/layout/AdminProtectedRoute';
import { nairaFormatter } from '../../helpers/formatters';
import { getAllRegistrations } from '../../services/conferenceRegistration';

const Table = styled(AntTable)`
  .ant-table-thead {
    background-color: transparent;
  }

  th {
    opacity: 0.75;
    font-family: 'ibm_plex_sansbold', sans-serif;
    font-size: 1.4rem;
    line-height: 1.29;
    color: #171725;
    background: transparent !important;
    border-bottom: 3px solid #e9edf0 !important;
  }

  th:first-of-type {
    padding-left: 3rem;
  }

  td {
    font-family: 'ibm_plex_sansregular', sans-serif;
    font-size: 1.6rem !important;
    color: #344563;
    border-bottom: 1px solid #e9edf0 !important;
  }

  tr td:first-of-type {
    padding-left: 3rem;
  }
`;

const ticketColumns = [
  {
    title: 'CATEGORY',
    dataIndex: 'category',
    key: 'category',
    width: 190,
    fixed: 'left',
    sorter: (a, b) => {
      if (a.category > b.category) return 1;
      if (a.category < b.category) return -1;
      return 0;
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'PRICE',
    dataIndex: 'categoryPrice',
    key: 'categoryPrice',
    width: 140,
    fixed: 'left',
    render: categoryPrice => nairaFormatter(categoryPrice),
  },
  {
    title: 'PARTICIPANTS',
    dataIndex: 'allParticipants',
    key: 'allParticipants',
    width: 250,
    fixed: 'left',
  },
  {
    title: 'TOTAL AMOUNT',
    dataIndex: 'amount',
    key: 'amount',
    width: 150,
    render: amount => nairaFormatter(amount),
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email',
    width: 300,
  },
  {
    title: 'PHONE',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 175,
  },
  {
    title: 'ORGANIZATION',
    dataIndex: 'organisation',
    key: 'organisation',
    width: 250,
    sorter: (a, b) => {
      if (a.organisation > b.organisation) return 1;
      if (a.organisation < b.organisation) return -1;
      return 0;
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'ADDRESS',
    dataIndex: 'organisationAddr',
    key: 'organisationAddr',
    width: 250,
  },
  {
    title: 'ADDITIONAL INFO',
    dataIndex: 'additionalInfo',
    key: 'additionalInfo',
    width: 350,
  },
];

export const tableScrollWidthCalc = tableColumn => {
  return tableColumn.reduce((acc, cv) => acc + cv.width, 0);
};

class Tickets extends Component {
  state = {
    isLoading: true,
    dataSource: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getAllRegistrations();

      const dataSource = data.regs.map(element => {
        const allParticipants = element.participants
          .map(item => item.fullName)
          .join(', ');

        return {
          ...element,
          allParticipants,
          categoryPrice: element.participants[0].amount,
        };
      });

      this.setState({ dataSource, isLoading: false });
    } catch (error) {}
  }

  render() {
    return (
      <>
        <AdminRoute>
          <AdminProtectedRoute>
            <AdminLayout>
              <section className="Tickets">
                <div className="Tickets__inner">
                  <h2 className="PageTitle">Conference Registration Details</h2>

                  <div className="TabPanel">
                    <span className="active-tab">All</span>
                    <span>Pending</span>
                    <span>Approved</span>
                  </div>

                  <div className="TicketsTableContainer">
                    <Table
                      tableLayout="fixed"
                      columns={ticketColumns}
                      dataSource={this.state.dataSource}
                      scroll={{ x: tableScrollWidthCalc(ticketColumns) }}
                      loading={this.state.isLoading}
                      pagination={{ defaultPageSize: 10 }}
                    />
                  </div>
                </div>
              </section>
            </AdminLayout>
          </AdminProtectedRoute>
        </AdminRoute>

        <style jsx>{`
          .Tickets {
            height: calc(100vh - 90px - 2rem);
            overflow: auto;
            overflow-x: hidden;
            border-radius: 8px;
            box-shadow: 0 1px 3.5px 0 rgba(0, 0, 0, 0.15);
            background-color: #fff;
            font-size: 1rem;
          }

          .Tickets::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: #f5f5f5;
          }

          .Tickets::-webkit-scrollbar {
            width: 4px;
            background-color: #f5f5f5;
          }

          .Tickets::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #555;
          }

          .Tickets__inner {
            min-height: calc(100vh - 8.5rem - 2rem);
            padding-top: 3rem;
            padding-bottom: 3rem;
          }

          .PageTitle {
            font-size: 1.8em;
            color: #52b9b8;
            margin-bottom: 2rem;
            padding: 0 3rem;
            font-family: 'ibm_plex_sansbold', sans-serif;
          }

          .TabPanel {
            padding-right: 3rem;
            padding-left: 3rem;
            margin-bottom: 2rem;
          }

          .TabPanel span {
            display: inline-block;
            position: relative;
            padding: 1rem;
            text-align: center;
            margin-right: 5px;
            font-size: 1.6em;
            color: #9b9b9b;
            cursor: pointer;
            font-family: 'ibm_plex_sansmedium', sans-serif;
            transition: all 500ms ease;
          }

          .TabPanel span:hover,
          .TabPanel span.active-tab {
            color: #171725;
          }

          .TabPanel span::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2.5px;
            background-color: #171725;
            transition: all 500ms ease;
          }

          .TabPanel span:hover::before,
          .TabPanel span.active-tab::before {
            width: 100%;
          }

          .TicketsTableContainer {
            width: calc(100vw - 30rem - 3rem);
            overflow: auto;
            padding-right: 1rem;
            margin-top: 3rem;
            font-size: 1rem;
          }
        `}</style>
      </>
    );
  }
}

export default Tickets;
