import React, { useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import { Table, Icon, Input, message } from 'antd';
import AdminRoute from '../../components/layout/AdminRoute';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminProtectedRoute from '../../components/layout/AdminProtectedRoute';
import abstractService from '../../services/abstract';

const FullPaperTable = styled(Table)`
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

const TitleColumn = ({ record, searchText, text, index }) => {
  return (
    <>
      <div className="AbstractTitle">
        {searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={searchText}
            textToHighlight={record.abstractTitle}
          />
        ) : (
            <span className="title">{record.abstractTitle}</span>
          )}

        <br />
        <span className="subtitle">{record.abstractSubTitle}</span>
      </div>

      <style jsx>{`
        .AbstractTitle {
          position: relative;
        }

        .title {
          margin-bottom: 0.3rem;
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 1.6rem;
          color: #171725;
        }

        .subtitle {
          opacity: 0.5;
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 1.5rem;
          color: #5e6c84;
        }
      `}</style>
    </>
  );
};

const statusMap = {
  0: {
    value: 'Not Submitted',
    color: '#f49342',
    bgColor: 'rgba(244, 147, 66, 0.1)',
  },
  1: {
    value: 'Submitted',
    color: '#52b9b8',
    bgColor: 'rgba(82, 185, 184, 0.1)',
  },
}

const SubmissionDateColumn = ({ fullPaperSubmitDate }) => (
  !fullPaperSubmitDate ? <span>{'N/A'}</span> : <span>{fullPaperSubmitDate}</span>
);

const StatusColumn = ({ fullPaperStatus }) => {
  return (
    <>
      <span style={{
        display: 'inline-block',
        minWidth: '16.8rem',
        textAlign: 'center',
        border: '1px solid',
        padding: '0.6rem 1rem',
        borderRadius: '20px',
        color: statusMap[fullPaperStatus].color,
        backgroundColor: statusMap[fullPaperStatus].bgColor,
      }}>
        {statusMap[fullPaperStatus].value}
      </span>
    </>
  );
};

const DownloadColumn = ({ abstract }) => {
  const [fullPaperString, setFullPaperString] = useState('');
  const [isGettingFullPaper, setIsGettingFullPaper] = useState(false);

  useEffect(() => {
    const isFullPaperSubmitted = abstract.fullPaperStatus === 1 ? true : false;
    let didCancel = false;

    const fetchFullPaperBase64String = async () => {
      try {
        setIsGettingFullPaper(true);
        const { data } = await abstractService.getFullPaperBase64String(abstract.id);

        if (!didCancel) {
          setFullPaperString(data.fullPaper);
          setIsGettingFullPaper(false);
        }
      } catch (error) {
        console.log(error);
        setIsGettingFullPaper(false);
        message.warning(`The download link of the abstract linked to ${abstract.firstName} ${abstract.lastName} failed`);
      }
    };

    if (isFullPaperSubmitted) {
      fetchFullPaperBase64String();
    }

    return () => {
      didCancel = true;
    }
  }, [])

  return (
    <>
      <span>
        {
          abstract.fullPaperStatus === 0 ? <span>N/A</span> :
            <a href={fullPaperString} download={`${abstract.firstName}_${abstract.lastName}_Fullpaper`}>Download{' '}</a>
        }
        {isGettingFullPaper && (
          <Icon type="loading" spin />
        )}
      </span>
    </>
  )
}

const tableScrollWidthCalc = tableColumn => {
  return tableColumn.reduce((acc, cv) => acc + cv.width, 0);
};

const SearchTextHighlighter = ({ searchWords, textToHighlight }) => {
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[searchWords]}
      autoEscape
      textToHighlight={textToHighlight}
    />
  );
};

const TabPanel = ({ handleTabChange, activeTab}) => {
  return (
    <>
      <div className="TabPanel">
        <span onClick={() => handleTabChange('All')} className={activeTab === 'All' && 'active-tab'}>All</span>
        <span onClick={() => handleTabChange('Submitted')} className={activeTab === 'Submitted' && 'active-tab'}>Submitted</span>
      </div>

      <style jsx>{`
        .TabPanel {
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
      `}</style>
    </>
  )
};

const SearchForm = ({ handleSearchTextChange, handleSearchButtonPress, searchText }) => {
  return (
    <>
      <div>
        <Input.Search
          placeholder="Search Abstract"
          onChange={handleSearchTextChange}
          onSearch={value => handleSearchButtonPress(value)}
          value={searchText}
          enterButton
        />
      </div>
    </>
  )
}

const FullPapers = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [activeTab, setactiveTab] = useState('All');
  const [searchText, setSearchText] = useState('');

  const tabStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    alignItems: 'center'
  }

  const fullPaperColumns = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      width: 550,
      fixed: true,
      sorter: (a, b) => {
        if (a.abstractTitle > b.abstractTitle) return 1;
        if (a.abstractTitle < b.abstractTitle) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => <TitleColumn text={text} index={index} searchText={searchText} record={record} />,
    },
    {
      title: 'AUTHORS',
      dataIndex: 'authors',
      key: 'authors',
      width: 400,
      sorter: (a, b) => {
        if (a.authors > b.authors) return 1;
        if (a.authors < b.authors) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: text => searchText.trim() ? (
        <SearchTextHighlighter
          searchWords={searchText}
          textToHighlight={text}
        />
      ) : text
    },
    {
      title: 'PRESENTERS',
      dataIndex: 'presenters',
      key: 'presenters',
      width: 250,
      sorter: (a, b) => {
        if (a.presenters > b.presenters) return 1;
        if (a.presenters < b.presenters) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: text => searchText.trim() ? (
        <SearchTextHighlighter
          searchWords={searchText}
          textToHighlight={text}
        />
      ) : text
    },
    {
      title: 'ORGANIZATION',
      dataIndex: 'organization',
      key: 'organization',
      width: 250,
      sorter: (a, b) => {
        if (a.organization > b.organization) return 1;
        if (a.organization < b.organization) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: text =>
        searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={searchText}
            textToHighlight={text}
          />
        ) : text
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      width: 280,
      sorter: (a, b) => {
        if (a.email > b.email) return 1;
        if (a.email < b.email) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: text =>
        searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={searchText}
            textToHighlight={text}
          />
        ) : text
    },
    {
      title: 'CATEGORY',
      dataIndex: 'presentationCat',
      key: 'presentationCat',
      width: 160,
      sorter: (a, b) => {
        if (a.presentationCat > b.presentationCat) return 1;
        if (a.presentationCat < b.presentationCat) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: text =>
        searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={searchText}
            textToHighlight={text}
          />
        ) : text
    },
    {
      title: 'SUBMISSION STATUS',
      dataIndex: 'fullPaperStatus',
      key: 'fullPaperStatus',
      width: 220,
      sorter: (a, b) => {
        if (a.fullPaperStatus > b.fullPaperStatus) return 1;
        if (a.fullPaperStatus < b.fullPaperStatus) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: fullPaperStatus => (
        <StatusColumn fullPaperStatus={fullPaperStatus} />
      ),
    },
    {
      title: 'SUBMISSION DATE',
      dataIndex: 'fullPaperSubmitDate',
      key: 'fullPaperSubmitDate',
      width: 150,
      sorter: (a, b) =>
        new Date(a.fullPaperSubmitDate) - new Date(b.fullPaperSubmitDate),
      sortDirections: ['descend', 'ascend'],
      render: fullPaperSubmitDate => (
        <SubmissionDateColumn fullPaperSubmitDate={fullPaperSubmitDate} />
      ),
    },
    {
      title: 'DOWNLOAD LINK',
      dataIndex: 'download',
      key: 'download',
      width: 150,
      render: (text, record) => (
        <DownloadColumn
          abstract={record}
        />
      ),
    },
  ];

  const handleTabChange = (tabName) => {
    const allFullPapers = dataSource.filter((abstract) => abstract.status === 3);
    const submittedPapers = dataSource.filter((abstract) => abstract.fullPaperStatus === 1);
    setactiveTab(tabName);
    if (tabName === 'All') {
      setFilteredData(allFullPapers);
    } else {
      setFilteredData(submittedPapers)
    }
  }

  const handleSearchTextChange = ({target}) => setSearchText(target.value);
  const handleSearchButtonPress = value => setSearchText(value);

  const searchFilteredItems = searchText.trim()
    ? filteredData.filter(item => {
      return (
        item.abstractTitle
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.authors
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.organization
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.presenters
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.email
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.presentationCat
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    })
    : filteredData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await abstractService.getAllAbstracts();
        const allAbstracts = data.abstracts;
        const transformedData = allAbstracts.map((abstract, i) => ({
          key: i,
          ...abstract
        }))
        const allFullPapers = transformedData.filter((abstract) => abstract.status === 3);
        setDataSource(transformedData);
        setFilteredData(allFullPapers);
        setIsloading(false)
      } catch (error) {
        setDataSource([]);
        setIsloading(false);
        message.error('Sorry, an unexpected error occurred. Please try again later');
      }
    };
    fetchData();
  }, [])

  return (
    <>
      <AdminRoute>
        <AdminProtectedRoute>
          <AdminLayout>
            <section className="FullPapers">
              <div className="FullPapers__inner">
                <h2 className="PageTitle">{`Full Technical Papers (${dataSource.filter((abstract) => abstract.status === 3).length})`}</h2>
                <div style={tabStyle}>
                  <TabPanel handleTabChange={handleTabChange} activeTab={activeTab} />
                  <SearchForm
                    searchText={searchText}
                    handleSearchTextChange={handleSearchTextChange}
                    handleSearchButtonPress={handleSearchButtonPress}
                    />
                </div>
                <div className="FullPapersTableContainer">
                  <FullPaperTable
                    tableLayout="fixed"
                    columns={fullPaperColumns}
                    dataSource={searchFilteredItems}
                    scroll={{ x: tableScrollWidthCalc(fullPaperColumns) }}
                    loading={isLoading}
                    pagination={{ defaultPageSize: 10 }}
                  />
                </div>
              </div>
            </section>
          </AdminLayout>
        </AdminProtectedRoute>
      </AdminRoute>

      <style jsx>{`
        .FullPapers {
          height: calc(100vh - 90px - 2rem);
          overflow: auto;
          overflow-x: hidden;
          border-radius: 8px;
          box-shadow: 0 1px 3.5px 0 rgba(0, 0, 0, 0.15);
          background-color: #fff;
          font-size: 1rem;
        }

        .FullPapers::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        .FullPapers::-webkit-scrollbar {
          width: 4px;
          background-color: #f5f5f5;
        }

        .FullPapers::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #555;
        }

        .FullPapers__inner {
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

        .FullPapersTableContainer {
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

export default FullPapers;
