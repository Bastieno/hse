import React, { Component } from 'react';
import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import AdminRoute from '../../components/layout/AdminRoute';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProtectedRoute from '../../components/layout/AdminProtectedRoute';
import { capitalizeWord } from '../../helpers/formatters';
import sponsorRequestData from '../../data/sponsorRequests';
import { tableScrollWidthCalc } from './tickets';

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

const sponsorsTableColumns = [
  {
    title: 'FIRST NAME',
    dataIndex: 'firstName',
    key: 'firstName',
    width: 210,
    fixed: 'left',
    sorter: (a, b) => {
      if (a.firstName > b.firstName) return 1;
      if (a.firstName < b.firstName) return -1;
      return 0;
    },
    sortDirections: ['descend', 'ascend'],
    render: firstName => capitalizeWord(firstName),
  },
  {
    title: 'LAST NAME',
    dataIndex: 'lastName',
    key: 'lastName',
    width: 210,
    fixed: 'left',
    sorter: (a, b) => {
      if (a.lastName > b.lastName) return 1;
      if (a.lastName < b.lastName) return -1;
      return 0;
    },
    sortDirections: ['descend', 'ascend'],
    render: lastName => capitalizeWord(lastName),
  },
  {
    title: 'EMAIL ADDRESS',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
    width: 300,
    sorter: (a, b) => {
      if (a.emailAddress > b.emailAddress) return 1;
      if (a.emailAddress < b.emailAddress) return -1;
      return 0;
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'ORGANIZATION NAME',
    dataIndex: 'orgName',
    key: 'orgName',
    width: 250,
    sorter: (a, b) => {
      if (a.orgName > b.orgName) return 1;
      if (a.orgName < b.orgName) return -1;
      return 0;
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'ADDRESS',
    dataIndex: 'orgAddress',
    key: 'orgAddress',
    width: 275,
  },
  {
    title: 'ADDITIONAL INFO',
    dataIndex: 'additionalInfo',
    key: 'additionalInfo',
    width: 350,
  },
];

class SponsorshipRequest extends Component {
  state = {};

  render() {
    return (
      <>
        <AdminRoute>
          <AdminProtectedRoute>
            <AdminLayout>
              <section className="SponsorshipRequests">
                <div className="SponsorshipRequests__inner">
                  <h2 className="PageTitle">Sponsorship Request List</h2>

                  <div className="TabPanel">
                    <span className="active-tab">Active</span>
                    <span>Archive</span>
                  </div>

                  <div className="SponsorsTableContainer">
                    <Table
                      tableLayout="fixed"
                      columns={sponsorsTableColumns}
                      scroll={{ x: tableScrollWidthCalc(sponsorsTableColumns) }}
                      dataSource={sponsorRequestData}
                      pagination={{ defaultPageSize: 10 }}
                    />
                  </div>
                </div>
              </section>
            </AdminLayout>
          </AdminProtectedRoute>
        </AdminRoute>

        <style jsx>{`
          .SponsorshipRequests {
            height: calc(100vh - 90px - 2rem);
            overflow: auto;
            overflow-x: hidden;
            border-radius: 8px;
            box-shadow: 0 1px 3.5px 0 rgba(0, 0, 0, 0.15);
            background-color: #fff;
            font-size: 1rem;
          }

          .SponsorshipRequests::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: #f5f5f5;
          }

          .SponsorshipRequests::-webkit-scrollbar {
            width: 4px;
            background-color: #f5f5f5;
          }

          .SponsorshipRequests::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #555;
          }

          .SponsorshipRequests__inner {
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

          .SponsorsTableContainer {
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

export default SponsorshipRequest;
