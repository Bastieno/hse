import React, { Component } from 'react';
import {
  Drawer as AntDrawer,
  Dropdown,
  Icon,
  Menu,
  Modal,
  Popover,
  Table as AntTable,
} from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import ReactHtmlParser from 'react-html-parser';
import Highlighter from 'react-highlight-words';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {
  getAllAbstracts,
  changeOneAbstractStatus,
  changeManyAbstractsStatus,
} from '../actions/abstract';
import { dateFormatter, timeFormatter } from '../helpers/formatters';
import abstractStatus from '../constants/abstractStatus';
import ErrorText from './commons/ErrorText';
import RichEditor from './RichEditor/RichEditor';
import { tableScrollWidthCalc } from '../pages/admin/tickets';
import {
  GET_ALL_ABSTRACTS,
  CHANGE_ONE_ABSTRACT_STATUS,
  CHANGE_MANY_ABSTRACTS_STATUS,
} from '../constants/labels';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  td {
    position: relative;
    font-family: 'ibm_plex_sansregular', sans-serif;
    font-size: 1.6rem !important;
    color: #344563;
    border-bottom: 1px solid #e9edf0 !important;
  }
`;

const Drawer = styled(AntDrawer)`
  .ant-drawer-mask {
    background-color: rgba(66, 90, 112, 0.25) !important;
  }

  .ant-drawer-content-wrapper {
    width: 790px !important;
  }

  .ant-drawer-header {
    background-color: #36a3f9 !important;
    font-family: 'ibm_plex_sansmedium', sans-serif;
    border-radius: 0 !important;

    .ant-drawer-title {
      color: #f6fafd !important;
      font-size: 1.6rem;
    }

    .ant-drawer-close {
      color: #fff !important;

      &:hover {
        color: rgba(66, 90, 112, 0.55) !important;
      }
    }
  }

  .ant-drawer-body {
    color: #212242 !important;
    background-color: #ffffff !important;
    font-size: 1rem !important;
    padding: 4rem !important;
    padding-bottom: 8rem !important;
    position: relative !important;
    min-height: calc(100vh - 55px);
  }
`;

const TitleColumn = ({
  record,
  index,
  searchText,
  hoveredRowIndex,
  toggleAbstractPreview,
}) => {
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
        {hoveredRowIndex == index && (
          <span
            className="previewBtn"
            style={{ fontSize: '0.8em' }}
            onClick={toggleAbstractPreview}
          >
            &#60;&#62;&nbsp;&nbsp;preview
          </span>
        )}
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

        .previewBtn {
          position: absolute;
          bottom: 0;
          right: 1rem;
          padding: 0.2rem 1rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.6rem !important;
          color: #2e5bff;
          border-radius: 3px;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
          border: solid 1px #e9edf0;
          background-color: #fbfdff;
          transition: all 500ms ease;
        }

        .previewBtn:hover {
          cursor: pointer;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
};

const UploadDateColumn = ({ uploadDate }) => (
  <span>{dateFormatter(uploadDate)}</span>
);

const StatusColumn = ({ status }) => {
  return (
    <>
      <span>{abstractStatus[status].value}</span>

      <style jsx>{`
        span {
          display: inline-block;
          min-width: 16.8rem;
          text-align: center;
          border: 1px solid;
          padding: 0.6rem 1rem;
          border-radius: 20px;
          color: ${abstractStatus[status].color};
          background-color: ${abstractStatus[status].bgColor};
        }
      `}</style>
    </>
  );
};

const ActionColumn = ({ text, record, onAbstractDownload, showModal }) => {
  const styles = {
    fontFamily: "'ibm_plex_sansregular', sans-serif",
    fontSize: '1.5rem',
    color: '#4a4a4a',
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" style={styles} onClick={() => showModal(3, [record])}>
        Approve
      </Menu.Item>

      <Menu.Item key="1" style={styles} onClick={() => showModal(9, [record])}>
        Reject
      </Menu.Item>

      <Menu.Item key="2" style={styles} onClick={() => showModal(0, [record])}>
        Request More Info
      </Menu.Item>

      <Menu.Item key="3" style={styles} onClick={() => showModal(99, [record])}>
        Delete
      </Menu.Item>

      <Menu.Item
        key="4"
        style={styles}
        onClick={() => onAbstractDownload([record])}
      >
        Download
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown trigger={['click']} overlay={menu}>
        <span title="Perform Action">{text}</span>
      </Dropdown>

      <style jsx>{`
        span {
          font-family: 'ibm_plex_sanbold', sans-serif;
          font-size: 1.6em !important;
          cursor: pointer !important;
        }
      `}</style>
    </>
  );
};

const ActionButtonIcon = ({ type, color }) => (
  <Icon
    type={type}
    theme={['download', 'delete'].includes(type) ? '' : 'filled'}
    style={{
      fontSize: '1em',
      color: color,
      marginRight: 10,
    }}
  />
);

const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <button
        title="Export Table"
        onClick={() => exportToExcel(csvData, fileName)}
      >
        <ActionButtonIcon type="file-excel" color="#207245" />
        Export Table (.xlsx)
      </button>

      <style jsx>{`
        button {
          display: inline-block;
          padding: 1rem 1.4rem;
          border-radius: 6px;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
          border: solid 1px #e9edf0;
          background-color: #fbfdff;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.6rem;
          text-align: center;
          cursor: pointer;
          color: #207245;
        }
      `}</style>
    </>
  );
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

class AdminAbstracts extends Component {
  state = {
    dataSource: [],
    filteredData: [],
    activeFilteredStatus: 'ALL',
    selectedRows: [],
    selectedRowKeys: [],
    hoveredRowIndex: null,
    isAbstractPreviewed: false,
    abstractToPreview: null,
    isModalVisible: false,
    newStatusCode: '',
    remark: '',
    remarkWordCount: 1,
    remarkMarkup: '',
    okText: '',
    searchText: '',
  };

  async componentDidMount() {
    // get all abstracts from db
    await this.props.getAllAbstracts();

    // then set dataSource to allAbstracts props
    this.setState({
      dataSource: Object.values(this.props.allAbstracts),
      filteredData: Object.values(this.props.allAbstracts),
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.allAbstracts !== this.props.allAbstracts) {
      this.setState({
        dataSource: Object.values(this.props.allAbstracts),
        filteredData:
          this.state.activeFilteredStatus === 'ALL'
            ? Object.values(this.props.allAbstracts)
            : Object.values(this.props.allAbstracts).filter(
                elem => elem.status == this.state.activeFilteredStatus
              ),
        selectedRowKeys: [],
      });
    }
  }

  handleRemarkChange = (name, value) => this.setState({ [name]: value });

  handleRemarkWordCountChange = plainText => {
    if (plainText.length === 0) return this.setState({ remarkWordCount: 0 });
    const wordCount = plainText.split(/\s/).filter(item => item.length !== 0)
      .length;

    this.setState({ remarkWordCount: wordCount });
  };

  handleRemarkMarkupChange = markup => this.setState({ remarkMarkup: markup });

  handleSearchTextChange = event =>
    this.setState({ searchText: event.target.value });

  handleRowSelection = (selectedRowKeys, selectedRows) =>
    this.setState({ selectedRowKeys, selectedRows });

  showModal = (newStatusCode, rows = this.state.selectedRows) => {
    this.setState({
      isModalVisible: true,
      newStatusCode,
      okText: abstractStatus[newStatusCode].action,
      selectedRows: rows,
      remark: newStatusCode == 3 ? 'Approve' : '',
      remarkMarkup: newStatusCode == 3 ? '<p>Approve</p>' : '',
    });
  };

  handleModalClose = () =>
    this.setState({ isModalVisible: false, remark: '', remarkMarkup: '' });

  handleAbstractStatusUpdate = async newStatusCode => {
    if (newStatusCode != 99 && !this.state.remark.trim()) return false;

    const isOneAbstract = [0, 1].includes(this.state.selectedRows.length);
    const isManyAbstracts = this.state.selectedRows.length > 1;

    if (isOneAbstract) {
      const requestBody = {
        newStatus: newStatusCode,
        remark:
          this.state.newStatusCode == 99 ? 'Deleted' : this.state.remarkMarkup,
        abstractId: this.state.selectedRows[0].id,
      };

      await this.props.changeOneAbstractStatus(requestBody);

      this.setState({
        isModalVisible: false,
        remark: '',
        remarkMarkup: '',
      });
    }

    if (isManyAbstracts) {
      const requestBody = {
        status: newStatusCode,
        remark:
          this.state.newStatusCode == 99 ? 'Deleted' : this.state.remarkMarkup,
        abstractIds: this.state.selectedRows.map(elem => elem.id),
      };

      await this.props.changeManyAbstractsStatus(requestBody);

      this.setState({
        isModalVisible: false,
        remark: '',
        remarkMarkup: '',
      });
    }
  };

  /* ----------------- Start of abstract download function ----------------- */
  handleAbstractDownload = abstractList => {
    const dd = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [50, 80, 50, 40],
      content: abstractList.map(abstract => {
        return [
          {
            text: [
              { text: abstract.abstractTitle.toUpperCase() },
              { text: ` (${abstract.authors})`, style: 'authors' },
            ],
            style: ['title', 'segmentBottom'],
          },
          {
            text: `${abstract.organization}, ${abstract.organizationAddr}`,
            alignment: 'center',
            style: 'segmentBottom',
          },
          {
            text: `Authors' Email: ${abstract.email}`,
            alignment: 'center',
            style: 'segmentBottom',
          },
          { text: '', pageBreak: 'after' },
        ];
      }),
      styles: {
        title: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
        },
        authors: {
          italics: true,
        },
        h3: {
          bold: true,
        },
        segmentTop: {
          marginTop: 25,
        },
        segmentBottom: {
          marginBottom: 25,
        },
        uploadDate: {
          marginTop: 10,
          alignment: 'right',
          bold: true,
        },
        'html-p': {
          alignment: 'justify',
        },
        'html-li': {
          margin: [10, 0, 0, 0],
        },
      },
      defaultStyle: {
        fontSize: 11,
        lineHeight: 1.5,
      },
    };

    const finalContentProp = dd.content.map((item, idx) => {
      const markupDd = htmlToPdfmake(abstractList[idx].abstractDesc);
      const [a, b, c, ...d] = item;
      const updatedContentProp = [a, b, c, ...markupDd, d];
      return updatedContentProp;
    });

    dd.content = finalContentProp;
    pdfMake.createPdf(dd).download('abstract');
  };
  /* ----------------- End of abstract download function ----------------- */

  /* ----------------- Start of abstract preview function ----------------- */
  toggleAbstractPreview = () => {
    this.setState({
      isAbstractPreviewed: !this.state.isAbstractPreviewed,
      selectedRowKeys: [],
    });
  };
  /* ----------------- End of abstract preview function ----------------- */

  /* ----------------- Start of abstract filter function ----------------- */
  handleAbstractsFilter = status => {
    this.setState({
      filteredData:
        status === 'ALL'
          ? this.state.dataSource
          : this.state.dataSource.filter(item => item.status === status),
      selectedRowKeys: [],
      activeFilteredStatus: status,
    });
  };
  /* ----------------- End of abstract filter function ----------------- */

  /* ----------------- Start of table column declaration ----------------- */
  columns = [
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
      render: (text, record, index) => (
        <TitleColumn
          text={text}
          record={record}
          index={index}
          searchText={this.state.searchText}
          hoveredRowIndex={this.state.hoveredRowIndex}
          toggleAbstractPreview={this.toggleAbstractPreview}
        />
      ),
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
      render: text =>
        this.state.searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={this.state.searchText}
            textToHighlight={text}
          />
        ) : (
          text
        ),
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
        this.state.searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={this.state.searchText}
            textToHighlight={text}
          />
        ) : (
          text
        ),
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
        this.state.searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={this.state.searchText}
            textToHighlight={text}
          />
        ) : (
          text
        ),
    },
    {
      title: 'PHONE NUMBER',
      dataIndex: 'phone',
      key: 'phone',
      width: 185,
      sorter: (a, b) => {
        if (a.phone > b.phone) return 1;
        if (a.phone < b.phone) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
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
        this.state.searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={this.state.searchText}
            textToHighlight={text}
          />
        ) : (
          text
        ),
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
      render: text =>
        this.state.searchText.trim() ? (
          <SearchTextHighlighter
            searchWords={this.state.searchText}
            textToHighlight={text}
          />
        ) : (
          text
        ),
    },
    {
      title: 'UPLOAD DATE',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      width: 150,
      sorter: (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate),
      sortDirections: ['descend', 'ascend'],
      render: uploadDate => <UploadDateColumn uploadDate={uploadDate} />,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 220,
      sorter: (a, b) => {
        if (a.status > b.status) return 1;
        if (a.status < b.status) return -1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: status => <StatusColumn status={status} />,
    },
    {
      title: '',
      dataIndex: 'remark',
      key: 'remark',
      width: 150,
      render: remark => {
        const styles = {
          fontFamily: "'ibm_plex_sansregular', sans-serif",
          maxWidth: 450,
          fontSize: '1.6rem',
        };

        return (
          <Popover
            placement="left"
            trigger="click"
            title="Remark"
            content={
              remark ? (
                ReactHtmlParser(remark)
              ) : (
                <span style={{ fontStyle: 'italic', opacity: 0.4 }}>
                  Remark not available yet
                </span>
              )
            }
            overlayStyle={styles}
          >
            <a>View remark</a>
          </Popover>
        );
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      width: 100,
      render: (text, record) => (
        <ActionColumn
          text={text}
          record={record}
          onAbstractDownload={this.handleAbstractDownload}
          showModal={this.showModal}
        />
      ),
    },
  ];
  /* ----------------- End of table column declaration ----------------- */

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleRowSelection,
    };

    const search = this.state.searchText.trim()
      ? this.state.filteredData.filter(item => {
          return (
            item.abstractTitle
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            item.authors
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            item.organization
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            item.presenters
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            item.email
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            item.presentationCat
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          );
        })
      : this.state.filteredData;

    const dataSource = search.map((item, idx) => {
      return {
        key: idx,
        ...item,
        uploadDate: item.entryDate,
        actions: '...',
      };
    });

    const mapDatasourceToExcelData = () =>
      search.map(item => ({
        'ABSTRACT TITLE': item.abstractTitle,
        'ABSTRACT SUBTITLE': item.abstractSubTitle,
        AUTHORS: item.authors,
        ORGANIZATION: item.organization,
        EMAIL: item.email,
        'PHONE NUMBER': item.phone,
        'PRESENTATION CATEGORY': item.presentationCat,
        PRESENTERS: item.presenters,
        'UPLOAD DATE': dateFormatter(item.entryDate),
        STATUS: abstractStatus[item.status].value,
      }));

    const previewedAbstract = this.state.abstractToPreview;

    const dialogBoxStyles = {
      okButton: {
        color: '#fff',
        backgroundColor: '#52b9b8',
        border: '1px solid #52b9b8',
        fontSize: '1.5rem',
        fontFamily: "'ibm_plex_sansmedium', sans-serif",
      },
      cancelButton: {
        color: '#fff',
        border: '1px solid #dfe3e8',
        fontSize: '1.5rem',
        fontFamily: "'ibm_plex_sansmedium', sans-serif",
        backgroundColor: '#dfe3e8',
      },
    };

    return (
      <>
        {/* -------------------------------- Start of modal -------------------------------- */}
        <Modal
          title={
            this.state.newStatusCode != 99
              ? 'Submit a Remark'
              : 'Are you sure you want to delete these abstract(s)?'
          }
          width={this.state.newStatusCode != 99 ? 660 : 520}
          okText={this.state.okText}
          okButtonProps={{ style: dialogBoxStyles.okButton }}
          cancelButtonProps={{ style: dialogBoxStyles.cancelButton }}
          style={{ zIndex: 10000 }}
          visible={this.state.isModalVisible}
          destroyOnClose={true}
          confirmLoading={
            this.props.isChangingStatus || this.props.isChangingStatuses
          }
          onOk={() => this.handleAbstractStatusUpdate(this.state.newStatusCode)}
          onCancel={this.handleModalClose}
        >
          <>
            <section>
              <h3>Abstract Title(s):</h3>
              <ul
                style={{
                  listStyleType: 'disc',
                  margin: '10px 0 10px 0',
                  paddingLeft: 20,
                  fontSize: 16,
                }}
              >
                {this.state.isAbstractPreviewed ? (
                  <li>{this.state.abstractToPreview.abstractTitle}</li>
                ) : (
                  this.state.selectedRows.map((item, idx) => (
                    <li key={idx}>{item.abstractTitle}</li>
                  ))
                )}
              </ul>
            </section>
            {this.state.newStatusCode != 99 && (
              <div style={{ fontSize: '0.7rem', marginTop: '3rem' }}>
                <RichEditor
                  placeholder="Enter your remark here (Not more than 250 words)"
                  name="remark"
                  abstractMarkup={this.state.remarkMarkup}
                  getAbstractMarkup={this.handleRemarkMarkupChange}
                  getWordCount={this.handleRemarkWordCountChange}
                  setFieldValue={this.handleRemarkChange}
                />

                {!this.state.remark.trim() && (
                  <ErrorText content="This is a required field. Please enter a remark before continuing" />
                )}
              </div>
            )}
          </>
        </Modal>
        {/* -------------------------------- End of modal -------------------------------- */}

        {/* -------------- Start of admin abstract page main content -------------- */}
        <h2 className="Abstract__Count">
          Abstracts ({dataSource.length} abstracts)
        </h2>

        <div className="AbstractTabs__SearchForm__CSVExportBtn">
          <section className="AbstractTabs">
            <span
              data-view="ALL"
              className={
                this.state.activeFilteredStatus === 'ALL' && 'active-view'
              }
              onClick={() => this.handleAbstractsFilter('ALL')}
            >
              All Abstracts
            </span>
            <span
              data-view="UNDER_PROCESSING"
              className={this.state.activeFilteredStatus === 1 && 'active-view'}
              onClick={() => this.handleAbstractsFilter(1)}
            >
              Under Processing
            </span>
            <span
              data-view="REQUEST_FOR_MODIFICATION"
              className={this.state.activeFilteredStatus === 0 && 'active-view'}
              onClick={() => this.handleAbstractsFilter(0)}
            >
              Request for Modification
            </span>
            <span
              data-view="APPROVED"
              className={this.state.activeFilteredStatus === 3 && 'active-view'}
              onClick={() => this.handleAbstractsFilter(3)}
            >
              Approved
            </span>
            <span
              data-view="REJECTED"
              className={this.state.activeFilteredStatus === 9 && 'active-view'}
              onClick={() => this.handleAbstractsFilter(9)}
            >
              Rejected
            </span>
          </section>

          <section className="SearchForm">
            <Icon
              type="search"
              style={{
                color: '#171725',
                fontSize: '2em',
                padding: '1rem 0.6rem 1rem 1.2rem',
                backgroundColor: '#fbfdff',
                borderRadius: 6,
              }}
            />
            <input
              type="search"
              id="searchText"
              name="searchText"
              placeholder="Search Abstract"
              value={this.state.searchText}
              onChange={this.handleSearchTextChange}
            />
            {/* {this.state.searchText.trim() && (
              <Icon
                type="close"
                style={{
                  color: '#000',
                  fontSize: '1.7em',
                  fontFamily: "'ibm_plex_sansbold', sans-serif",
                  padding: '1.1rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
                title="Clear search"
                onClick={() => this.setState({ searchText: '' })}
              />
            )} */}
          </section>

          <section className="ExportCSVContainer">
            <ExportCSV
              csvData={mapDatasourceToExcelData()}
              fileName="abstracts-table"
            />
          </section>
        </div>

        {this.state.selectedRowKeys.length > 0 && (
          <ul className="ActionButtons">
            <li
              title="Approve"
              style={{ color: '#47b881' }}
              onClick={() => this.showModal(3)}
            >
              <ActionButtonIcon type="check-circle" color="#47b881" />
              Approve
            </li>
            <li
              title="Reject"
              style={{ color: '#ff8a8a' }}
              onClick={() => this.showModal(9)}
            >
              <ActionButtonIcon type="close-circle" color="#ff8a8a" />
              Reject
            </li>
            <li
              title="Request More Info"
              style={{ color: '#ffa97f' }}
              onClick={() => this.showModal(0)}
            >
              <ActionButtonIcon type="exclamation-circle" color="#ffa97f" />
              Request More Info
            </li>
            <li
              title="Delete"
              style={{ color: '#d0021b' }}
              onClick={() => this.showModal(99)}
            >
              <ActionButtonIcon type="delete" color="#d0021b" />
              Delete
            </li>
            <li
              title="Download"
              style={{ color: '#2e5bff' }}
              onClick={() =>
                this.handleAbstractDownload(this.state.selectedRows)
              }
            >
              <ActionButtonIcon type="download" color="#2e5bff" />
              Download
            </li>
          </ul>
        )}

        <section className="AbstractsTableContainer">
          <Table
            tableLayout="fixed"
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.state.dataSource ? dataSource : []}
            scroll={{ x: tableScrollWidthCalc(this.columns) }}
            loading={this.props.isFetching}
            pagination={{ defaultPageSize: 10 }}
            onRow={(record, rowIndex) => {
              return {
                onMouseEnter: event =>
                  this.setState({
                    hoveredRowIndex: rowIndex,
                    abstractToPreview: record,
                  }),
                onMouseLeave: event => this.setState({ hoveredRowIndex: null }),
              };
            }}
          />
        </section>
        {/* -------------- End of admin abstract page main content -------------- */}

        {/* ------------------ Start of abstract preview drawer  ----------------- */}
        <Drawer
          title="Preview Abstract"
          placement="right"
          closable={true}
          onClose={this.toggleAbstractPreview}
          visible={this.state.isAbstractPreviewed}
        >
          {this.state.abstractToPreview && (
            <>
              <section className="AbstractDetails">
                <section className="AbstractDateTime">
                  <p>Submitted: {dateFormatter(previewedAbstract.entryDate)}</p>
                  <p>{timeFormatter(previewedAbstract.entryDate)}</p>
                </section>

                <h2 className="title">{previewedAbstract.abstractTitle}</h2>

                <h3 className="subtitle">
                  {previewedAbstract.abstractSubTitle}
                </h3>

                <div className="body">
                  {ReactHtmlParser(previewedAbstract.abstractDesc)}
                </div>

                <div className="CategoryPlusAuthors">
                  <section>
                    <h3>Presentation Category</h3>
                    <p>{previewedAbstract.presentationCat}</p>
                  </section>
                  <section>
                    <h3>Authors</h3>
                    <p>{previewedAbstract.authors}</p>
                  </section>
                </div>

                <div className="Presenters">
                  <section>
                    <h3>Presenters</h3>
                    <p>{previewedAbstract.presenters}</p>
                  </section>
                </div>

                <div className="OrgNamePlusAddress">
                  <section>
                    <h3>Name of Organisation</h3>
                    <p>{previewedAbstract.organization}</p>
                  </section>
                  <section>
                    <h3>Address of Organisation</h3>
                    <p>{previewedAbstract.organizationAddr}</p>
                  </section>
                </div>
              </section>

              <ul className="ActionButtons--Fixed">
                <li
                  title="Approve"
                  style={{ color: '#47b881' }}
                  onClick={() =>
                    this.showModal(3, [this.state.abstractToPreview])
                  }
                >
                  <ActionButtonIcon type="check-circle" color="#47b881" />
                  Approve
                </li>
                <li
                  title="Reject"
                  style={{ color: '#ff8a8a' }}
                  onClick={() =>
                    this.showModal(9, [this.state.abstractToPreview])
                  }
                >
                  <ActionButtonIcon type="close-circle" color="#ff8a8a" />
                  Reject
                </li>
                <li
                  title="Request More Info"
                  style={{ color: '#ffa97f' }}
                  onClick={() =>
                    this.showModal(0, [this.state.abstractToPreview])
                  }
                >
                  <ActionButtonIcon type="exclamation-circle" color="#ffa97f" />
                  Request More Info
                </li>
                <li
                  title="Delete"
                  style={{ color: '#d0021b' }}
                  onClick={() =>
                    this.showModal(99, [this.state.abstractToPreview])
                  }
                >
                  <ActionButtonIcon type="delete" color="#d0021b" />
                  Delete
                </li>
                <li
                  title="Download"
                  style={{ color: '#2e5bff' }}
                  onClick={() =>
                    this.handleAbstractDownload([this.state.abstractToPreview])
                  }
                >
                  <ActionButtonIcon type="download" color="#2e5bff" />
                  Download
                </li>
              </ul>
            </>
          )}
        </Drawer>
        {/* ------------------ End of abstract preview drawer  ----------------- */}

        <style jsx>{`
          .Abstract__Count {
            font-family: 'ibm_plex_sansbold', sans-serif;
            font-size: 1.8em;
            color: #52b9b8;
            padding-left: 3rem;
            padding-right: 3rem;
            margin-bottom: 2rem;
          }

          ul {
            padding: 0;
            margin: 0;
            list-style-type: none;
          }

          .AbstractTabs__SearchForm__CSVExportBtn {
            margin-bottom: 2rem;
            padding-left: 3rem;
            padding-right: 3rem;
            display: flex;
          }

          .AbstractTabs {
            display: inline-block;
          }

          .AbstractTabs span {
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

          .AbstractTabs span:hover,
          .AbstractTabs span.active-view {
            color: #171725;
          }

          .AbstractTabs span::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2.5px;
            background-color: #171725;
            transition: all 500ms ease;
          }

          .AbstractTabs span:hover::before,
          .AbstractTabs span.active-view::before {
            width: 100%;
          }

          .ActionButtons {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            padding-left: 3rem;
            padding-right: 3rem;
          }

          .ActionButtons--Fixed {
            min-height: 6rem;
            margin: 0;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            padding-left: 2rem;
            background-color: rgba(46, 91, 255, 0.14);
            display: flex;
            align-items: center;
          }

          .ActionButtons li,
          .ActionButtons--Fixed li {
            margin-right: 8px;
            padding: 1rem 1.4rem;
            border-radius: 6px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
            border: solid 1px #e9edf0;
            background-color: #fbfdff;
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.6rem;
            text-align: center;
            cursor: pointer;
          }

          .SearchForm {
            position: relative;
            font-size: 1rem;
            border: 1px solid rgba(23, 23, 37, 0.5);
            border-radius: 6px;
            display: flex;
            align-items: center;
            margin-left: auto;
          }

          .SearchForm input {
            // flex-grow: 1;
            width: 20rem;
            background-color: #fbfdff;
            padding: 1rem;
            padding-left: 0.6rem;
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.5em;
            border-radius: inherit;
            color: #171725;
            // transition: width 200ms linear;
          }

          .SearchForm input:focus {
            // width: 50rem;
          }

          .SearchForm input::placeholder {
            opacity: 0.44;
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.5rem;
            color: #171725;
          }

          .ExportCSVContainer {
            display: inline-block;
            margin-left: 2rem;
          }

          .AbstractsTableContainer {
            width: calc(100vw - 30rem - 3rem);
            overflow: auto;
            padding-right: 1rem;
            margin-top: 3rem;
            font-size: 1rem;
          }

          .title {
            font-family: 'ibm_plex_sansbold', sans-serif;
            font-size: 2.1em;
            color: #212242;
            margin-bottom: 1rem;
            margin-top: 2rem;
          }

          .subtitle {
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.9rem;
            color: #5e6c84;
            margin-bottom: 3.2rem;
          }

          .body {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.7em;
            letter-spacing: 0.4px;
            line-height: 1.67;
            color: #212242;
          }

          .CategoryPlusAuthors,
          .Presenters,
          .OrgNamePlusAddress {
            width: 100%;
            padding-top: 2rem;
            padding-bottom: 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 1rem;
            border-bottom: 1px solid rgba(23, 23, 37, 0.2);
          }

          .OrgNamePlusAddress {
            border-bottom: none;
          }

          .CategoryPlusAuthors h3,
          .Presenters h3,
          .OrgNamePlusAddress h3 {
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.4em;
            color: #4a4a4a;
          }

          .CategoryPlusAuthors p,
          .Presenters p,
          .OrgNamePlusAddress p {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.7em;
            color: #171725;
            margin-bottom: 0;
          }

          .AbstractDateTime p {
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.5rem;
            text-align: right;
            color: #212242;
            margin-bottom: 0;
          }

          .AbstractDateTime p:nth-child(2) {
            font-family: 'ibm_plex_sansregular', sans-serif;
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    allAbstracts: state.allAbstracts,
    isFetching: state.isLoading[GET_ALL_ABSTRACTS],
    isChangingStatus: state.isLoading[CHANGE_ONE_ABSTRACT_STATUS],
    isChangingStatuses: state.isLoading[CHANGE_MANY_ABSTRACTS_STATUS],
  };
};

export default connect(mapStateToProps, {
  getAllAbstracts,
  changeOneAbstractStatus,
  changeManyAbstractsStatus,
})(AdminAbstracts);
