import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Table as AntTable, message } from 'antd';
import styled from 'styled-components';
import shortid from 'shortid';
import UserRoute from '../components/layout/UserRoute';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import { Select, TextArea } from '../components/commons/FormInputs';
import ErrorText from '../components/commons/ErrorText';
import EvergreenIcon from '../components/commons/Icons';
import { LoadingIcon } from '../components/commons/Icons';
import { createConferenceRegistration } from '../actions/conferenceRegistration';
import { nairaFormatter } from '../helpers/formatters';

const Table = styled(AntTable)`
  .ant-table-tbody > .ant-table-row:hover > td {
    background-color: inherit !important;
  }

  .ant-table-tbody > .clickRowStyl:hover > td {
    background-color: rgba(54, 163, 249, 0.7) !important;
  }

  .clickRowStyl > td {
    background-color: rgba(54, 163, 249, 0.7) !important;
    color: #fff !important;
  }

  .clickRowStyl > td {
    color: #fff !important;
  }

  .ant-table-thead {
    background-color: transparent;
  }

  th {
    font-family: 'ibm_plex_sansmedium', sans-serif;
    font-size: 2rem;
    color: #171725;
    background: transparent !important;
    border-bottom: none !important;
  }

  tr {
    cursor: default !important;
  }

  tr:last-of-type td {
    border-bottom: none !important;
  }

  td {
    font-family: 'ibm_plex_sansregular', sans-serif;
    font-size: 1.8rem !important;
    color: #4a4a4a;
    border-bottom: 1px solid #e9edf0 !important;
  }

  tr td:first-of-type {
    font-family: 'ibm_plex_sansregular', sans-serif;
    color: #4a4a4a;
  }
`;

const PageHeading = () => {
  return (
    <>
      <section className="Heading container-1360">
        <div className="Heading__inner">
          <section className="Title">
            <h1>Register to attend</h1>
            <Link href="/registration-status">
              <a className="btn">Already registered?</a>
            </Link>
          </section>

          <section className="Teaser">
            <h2>Registration instruction</h2>
            <p>
              Participants are invited to register to attend the conference
              using the form below. Note that the participant category you
              selected is applicable to all delegates. The final confirmation of
              your registration will only be received after payment.
            </p>
          </section>
        </div>
      </section>

      <style jsx>{`
        .Heading__inner {
          padding-top: 7rem;
          padding-bottom: 5rem;
        }

        .Title {
          margin-bottom: 5.3rem;
        }

        .Title h1 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.8em;
          color: #000;
          margin-right: 2rem;
          display: inline-block;
        }

        .Title .btn {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          color: #fff;
          font-size: 1.7em;
          padding: 0.9rem 2.5rem;
          background-color: #52b9b8;
          vertical-align: top;
        }

        .Title .btn:hover {
          background-color: #1e8493;
        }

        .Teaser {
          padding: 1.3rem;
          font-size: 2em;
          font-family: 'ibm_plex_sansregular', sans-serif;
          border-radius: 10px;
          line-height: 1.76;
          color: #2e5bff;
          background-color: rgba(46, 91, 255, 0.1);
        }

        .Teaser h2 {
          display: none;
        }

        .Teaser p {
          margin-bottom: 0;
        }

        @media (min-width: 769px) {
          .Teaser {
            padding: 2.3rem 3.3rem;
          }
        }
      `}</style>
    </>
  );
};

const PageSubheading = ({ currentPage }) => {
  return (
    <>
      <section className="Subheading container-1360">
        <div className="Subheading__inner">
          <section className="Subtitle">
            {currentPage === 0 && (
              <>
                <h2>Registration Form</h2>
                <p>
                  Your information will never be shared. Required fields are
                  marked <span className="asterisk">*</span>
                </p>
              </>
            )}

            {currentPage === 1 && (
              <>
                <h2>Participation category details</h2>
                <p>
                  The table below shows registration fees for the different
                  category of participants.
                </p>
              </>
            )}

            {currentPage === 2 && <h2>Conference registration details</h2>}
          </section>

          <section className="ProgressTracker">
            <h2>Progress Tracker</h2>
            <p>
              <span
                className="stages stage-0"
                data-active={currentPage === 0 && true}
              >
                Registration
              </span>
              <span
                className="stages stage-1"
                data-active={currentPage === 1 && true}
              >
                Fee
              </span>
              <span
                className="stages stage-2"
                data-active={currentPage === 2 && true}
              >
                Preview
              </span>
            </p>
          </section>
        </div>
      </section>

      <style jsx>{`
        .Subheading__inner {
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        p {
          margin-bottom: 1rem;
        }

        .Subtitle h2 {
          font-family: 'ibm_plex_sansbold', sans-serif;
          font-size: 2.5em;
          color: #000;
          margin-bottom: 1rem;
        }

        .Subtitle p {
          font-family: 'ibm_plex_sansregular', sans-serif;
          font-size: 2em;
          line-height: 1.76;
          color: #4a4a4a;
        }

        .asterisk {
          color: #d0021b;
        }

        .ProgressTracker {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.74em;
          line-height: 1.33;
          color: #b5b5b5;
          text-align: right;
        }

        .ProgressTracker h2 {
          display: none;
        }

        .ProgressTracker .stages {
          margin-right: 3.5rem;
          padding-left: 3rem;
          position: relative;
          user-select: none;
          transition: all 100ms linear;
        }

        .ProgressTracker .stages:last-child {
          margin-right: 0;
        }

        .ProgressTracker .stages::before {
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
          background-color: rgba(181, 181, 181, 0.5);
          transition: all 100ms linear;
        }

        .ProgressTracker .stage-0::before {
          content: '1';
        }

        .ProgressTracker .stage-1::before {
          content: '2';
        }

        .ProgressTracker .stage-2::before {
          content: '3';
        }

        // .ProgressTracker .stages:hover {
        //   cursor: pointer;
        //   color: #52b9b8;
        // }

        // .ProgressTracker .stages:hover::before {
        //   cursor: pointer;
        //   background-color: #52b9b8;
        // }

        .ProgressTracker span[data-active='true'] {
          color: #52b9b8;
        }

        .ProgressTracker span[data-active='true']::before {
          background-color: #52b9b8;
        }

        @media (min-width: 768px) {
          .Subheading__inner {
            padding-top: 5rem;
            display: grid;
            grid-template-columns: auto auto;
            column-gap: 1rem;
            align-items: end;
          }
        }
      `}</style>
    </>
  );
};

class RegistrationForm extends Component {
  state = {
    delegateName: '',
    isDelegateNameValid: false,
  };

  handleDelagateNameChange = e => {
    if (e.target.value.trim().length)
      this.setState({ isDelegateNameValid: true });
    else this.setState({ isDelegateNameValid: false });

    this.setState({ delegateName: e.target.value.trimLeft() });
  };

  handleDelegateNameAdd = () => {
    if (!this.state.delegateName.length) return null;

    this.props.delegates.push({
      id: shortid.generate(),
      value: this.state.delegateName,
    });

    this.props.setDelegates(this.props.delegates);

    this.setState({ delegateName: '' });
    this.props.errors.nameOfDelegates = '';
    this.setState({ isDelegateNameValid: false });
  };

  handleDelagateNameClose = delegate => {
    const { delegates, setDelegates } = this.props;
    const delegateIdx = delegates.findIndex(elem => elem.id === delegate.id);

    if (delegateIdx == -1) return null;
    delegates.splice(delegateIdx, 1);
    setDelegates(delegates);

    this.forceUpdate();
  };

  render() {
    return (
      <>
        <section className="RegForm">
          <div className="RegForm__Field">
            <label htmlFor="participantCategory">
              Participant Category <span className="asterisk">*</span>
            </label>
            <Select
              width="100%"
              height={'5.2rem'}
              id="participantCategory"
              name="participantCategory"
              value={this.props.values.participantCategory}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            >
              <option value="Select Category" disabled>
                Select Category
              </option>
              {this.props.registrationCategories.map(elem => (
                <option key={elem.code} value={elem.category}>
                  {elem.category}
                </option>
              ))}
            </Select>
            {this.props.errors.participantCategory &&
              this.props.touched.participantCategory && (
                <ErrorText content={this.props.errors.participantCategory} />
              )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="title">
              Title <span className="asterisk">*</span>
            </label>
            <Select
              width="100%"
              height={'5.2rem'}
              id="title"
              name="title"
              value={this.props.values.title}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            >
              <option value="Select Title" disabled>
                Select Title
              </option>
              {this.props.honorifics.map((elem, idx) => (
                <option key={elem.valueField} value={elem.displayField}>
                  {elem.displayField}
                </option>
              ))}
            </Select>
            {this.props.errors.title && this.props.touched.title && (
              <ErrorText content={this.props.errors.title} />
            )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="firstName">
              First Name <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter first name"
              id="firstName"
              name="firstName"
              value={this.props.values.firstName}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.firstName && this.props.touched.firstName && (
              <ErrorText content={this.props.errors.firstName} />
            )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="lastName">
              Last Name <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter last name"
              id="lastName"
              name="lastName"
              value={this.props.values.lastName}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.lastName && this.props.touched.lastName && (
              <ErrorText content={this.props.errors.lastName} />
            )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="emailAddress">
              Email Address <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter your email address"
              id="emailAddress"
              name="emailAddress"
              value={this.props.values.emailAddress}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.emailAddress &&
              this.props.touched.emailAddress && (
                <ErrorText content={this.props.errors.emailAddress} />
              )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="phoneNumber">
              Phone Number <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter phone number"
              id="phoneNumber"
              name="phoneNumber"
              value={this.props.values.phoneNumber}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.phoneNumber &&
              this.props.touched.phoneNumber && (
                <ErrorText content={this.props.errors.phoneNumber} />
              )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="homeAddress">
              Address <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter your address here"
              id="homeAddress"
              name="homeAddress"
              value={this.props.values.homeAddress}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.homeAddress &&
              this.props.touched.homeAddress && (
                <ErrorText content={this.props.errors.homeAddress} />
              )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="nameOfDelegates">
              Name of Delegates{' '}
              <span style={{ fontSize: '0.9em' }}>
                (Enter name and press 'add' button)
              </span>
            </label>
            <div className="RegForm__Field__Inner">
              <input
                placeholder="Enter delegate full name here"
                id="nameOfDelegates"
                name="nameOfDelegates"
                value={this.state.delegateName}
                onChange={this.handleDelagateNameChange}
              />
              <button
                className="btn--dark-green btn--add-tag"
                disabled={!this.state.isDelegateNameValid}
                type="button"
                onClick={this.handleDelegateNameAdd}
              >
                Add
              </button>
            </div>

            {this.props.errors.nameOfDelegates &&
              this.props.touched.nameOfDelegates && (
                <ErrorText content={this.props.errors.nameOfDelegates} />
              )}

            <div className="Input__Tags">
              {this.props.delegates.map(elem => (
                <span className="Input__Tag" key={elem.id}>
                  {elem.value}
                  <EvergreenIcon
                    type="cross"
                    marginLeft={10}
                    size={14}
                    hovercolor="red"
                    verticalalign="text-bottom"
                    onClick={() => this.handleDelagateNameClose(elem)}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="RegForm__Field">
            <label htmlFor="organisationName">
              Name of Organisation <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter name here"
              id="organisationName"
              name="organisationName"
              value={this.props.values.organisationName}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.organisationName &&
              this.props.touched.organisationName && (
                <ErrorText content={this.props.errors.organisationName} />
              )}
          </div>

          <div className="RegForm__Field">
            <label htmlFor="organisationAddress">
              Address of Organisation <span className="asterisk">*</span>
            </label>
            <input
              placeholder="Enter address here"
              id="organisationAddress"
              name="organisationAddress"
              value={this.props.values.organisationAddress}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.errors.organisationAddress &&
              this.props.touched.organisationAddress && (
                <ErrorText content={this.props.errors.organisationAddress} />
              )}
          </div>

          <div className="RegForm__Field textarea">
            <label htmlFor="additionalInfo">Additional Information</label>
            <TextArea
              placeholder="Please state any information you envisage may be relevant to your registration"
              id="additionalInfo"
              name="additionalInfo"
              width="100%"
              value={this.props.values.additionalInfo}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
          </div>
        </section>

        <style jsx>{`
          .RegForm__Field {
            margin-bottom: 2rem;
          }

          .RegForm__Field label {
            display: block;
            margin-bottom: 0.5rem;
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.8em;
            color: #000;
          }

          .asterisk {
            color: #d0021b;
          }

          .RegForm__Field__Inner {
            display: flex;
          }

          input {
            font-family: 'ibm_plex_sansregular', sans-serif;
            border-radius: 4px;
            border: solid 1px #979797;
            background-color: #fff;
            color: #4a4a4a;
            padding: 1rem;
            font-size: 1.6em;
            display: block;
            width: 100%;
            height: 5.2rem;
            flex-grow: 1;
          }

          .btn--add-tag {
            display: inline-block;
            border-radius: 4px;
            margin-left: 1rem;
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.7rem;
            padding: 1rem 2rem;
            cursor: pointer;
          }

          .btn--add-tag:disabled {
            pointer-events: none;
            border-color: rgba(128, 128, 128, 0.4);
            background-color: rgba(128, 128, 128, 0.4);
          }

          .Input__Tag {
            margin-right: 1rem;
            margin-top: 1rem;
            padding: 0.7rem 1rem;
            display: inline-block;
            position: relative;
            color: #4a4a4a;
            font-size: 1.6em;
            font-family: 'ibm_plex_sansregular', sans-serif;
            background-color: rgba(71, 193, 191, 0.2);
          }

          @media (min-width: 769px) {
            .RegForm {
              display: grid;
              grid-gap: 2.5rem 4rem;
              grid-template-columns: repeat(2, 1fr);
            }

            .RegForm__Field.textarea {
              grid-column: 1/3;
            }
          }
        `}</style>
      </>
    );
  }
}

class ParticipationCategory extends Component {
  state = { selectedRow: this.props.values.participantCategory || null };

  columns = [
    { title: 'Category', dataIndex: 'category' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Price', dataIndex: 'price' },
  ];

  categoryDesc = {
    IND:
      'Individual or delegates from an organisation. Price is for each person.',
    CPC: 'Conference Planning Committee member.',
    PAT:
      'During accreditation, your status as a presenting author will be verified.',
    STD:
      'If you are a student, be ready to present your school ID card during verification.',
  };

  dataSource = this.props.registrationCategories.map((elem, i) => ({
    key: i,
    category: elem.category,
    description: this.categoryDesc[elem.code],
    price: nairaFormatter(elem.amount),
  }));

  render() {
    return (
      <>
        <section className="PartCat">
          <Table
            columns={this.columns}
            dataSource={this.dataSource}
            pagination={false}
            // onRow={(record, rowIndex) => ({
            //   onClick: event => {
            //     this.setState({ selectedRow: record.category });
            //     this.props.setFieldValue(
            //       'participantCategory',
            //       record.category
            //     );
            //   },
            // })}
            rowClassName={(record, rowIndex) =>
              this.state.selectedRow === record.category ? 'clickRowStyl' : ''
            }
          />
        </section>
      </>
    );
  }
}

class PreviewPage extends Component {
  state = { categoryFee: 0 };

  componentDidMount() {
    this.props.onConfFeeChange(this.calcConfFee());
    this.getCategoryFee();
  }

  getCategoryFee = () => {
    const categoryFee = this.props.registrationCategories.find(
      elem => elem.category == this.props.values.participantCategory
    ).amount;

    this.setState({ categoryFee });
  };

  calcConfFee = () => {
    const amount = this.props.registrationCategories.find(
      elem => elem.category == this.props.values.participantCategory
    ).amount;
    return amount + amount * this.props.delegates.length;
  };

  render() {
    const { participant } = this.props;

    return (
      <>
        <section className="ParticipantInfo">
          <h3>Participant Information (Primary)</h3>

          <div className="NamePlusAddress">
            <section className="FullName">
              <h4>Full Name</h4>
              <p>{`${participant.title} ${participant.firstName} ${participant.lastName}`}</p>
            </section>

            <section className="HomeAddress">
              <h4>Home Address</h4>
              <p>{participant.homeAddress}</p>
            </section>
          </div>

          <div className="EmailPlusPhone">
            <section>
              <h4>Phone Number</h4>
              <p>{participant.phoneNumber}</p>
            </section>
            <section>
              <h4>Email Address</h4>
              <p>{participant.emailAddress}</p>
            </section>
          </div>

          <div className="Organisation">
            <section>
              <h4>Name of Organisation</h4>
              <p>{participant.organisationName}</p>
            </section>
            <section>
              <h4>Address of Organisation</h4>
              <p>{participant.organisationAddress}</p>
            </section>
          </div>

          {participant.additionalInfo && (
            <section className="AdditionalInfo">
              <h4>Additional Information</h4>
              <p>{participant.additionalInfo}</p>
            </section>
          )}
        </section>

        {this.props.delegates.length > 0 && (
          <section className="OtherDelegates">
            <h3>Other Participants</h3>
            <ul>
              {this.props.delegates.map((elem, idx) => (
                <li key={idx}>{elem.value}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="PaymentInfo">
          <h3>Conference Fee Information</h3>

          <div className="CategoryPlusTickets">
            <section>
              <h4>Participation Category</h4>
              <p>{this.props.values.participantCategory}</p>
            </section>
            <section>
              <h4>Number of Tickets</h4>
              <p>{1 + this.props.delegates.length}</p>
            </section>
          </div>

          <div className="FeeSummary">
            <section>
              <h4>Category Fee</h4>
              <p>{nairaFormatter(this.state.categoryFee)}</p>
            </section>
            <section>
              <h4>Total Amount Due</h4>
              <p>{nairaFormatter(this.props.confFee)}</p>
            </section>
          </div>
        </section>

        <style jsx>{`
          .ParticipantInfo,
          .OtherDelegates,
          .PaymentInfo {
            border-bottom: 1px solid rgba(151, 151, 151, 0.3);
            margin-bottom: 3rem;
          }

          .PaymentInfo {
            border-bottom: none;
          }

          h3 {
            color: #000;
            font-size: 2.1em;
            font-family: 'ibm_plex_sansbold', sans-serif;
          }

          h4 {
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.7em;
            color: #4a4a4a;
            margin-top: 2.9rem;
            margin-bottom: 1.2rem;
          }

          h4 + p {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.9em;
            color: #000;
            margin-bottom: 2rem;
          }

          .CategoryPlusTickets,
          .FeeSummary {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
          }

          .OtherDelegates ul {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.98em;
            color: #000;
            margin-bottom: 2rem;
            margin-top: 2.9rem;
            line-height: 2;
          }

          @media (min-width: 768px) {
            .NamePlusAddress,
            .EmailPlusPhone,
            .Organisation,
            .CategoryPlusTickets,
            .FeeSummary {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 2rem;
            }
          }
        `}</style>
      </>
    );
  }
}

const ConfRegBtns = ({ isLoading, currentPage, onPreviousPage }) => {
  return (
    <>
      <div className="ConfRegBtns">
        {currentPage === 0 && (
          <button type="submit" className="btn btn--dark-green">
            Next
          </button>
        )}

        {currentPage === 1 && (
          <>
            <button
              type="button"
              className="btn btn--ash"
              onClick={onPreviousPage}
            >
              Go Back
            </button>
            <button type="submit" className="btn btn--dark-green">
              Preview
            </button>
          </>
        )}

        {currentPage === 2 && (
          <>
            <button
              type="button"
              className="btn btn--ash"
              onClick={onPreviousPage}
            >
              Edit
            </button>

            <div className="float">
              <button
                type="submit"
                className="btn btn--dark-green save-place-hold"
                disabled={isLoading}
              >
                {isLoading ? <LoadingIcon /> : 'Save'}
              </button>
            </div>

            <div style={{ clear: 'both' }}></div>
          </>
        )}
      </div>

      <style jsx>{`
        .ConfRegBtns {
          margin-top: 3rem;
        }

        .ConfRegBtns button {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.8em;
          min-width: ${currentPage === 2 ? '100%' : '15rem'};
          padding: 0.6rem 2.5rem;
          margin-bottom: 2rem;
        }

        .ConfRegBtns .save-proceed {
          min-width: 100%;
        }

        @media (min-width: 559px) {
          .ConfRegBtns button {
            min-width: 15rem;
          }

          .ConfRegBtns .save-proceed,
          .ConfRegBtns .save-place-hold {
            min-width: 15rem;
          }

          .float {
            float: right;
          }
        }
      `}</style>
    </>
  );
};

const pages = [RegistrationForm, ParticipationCategory, PreviewPage];

class ConferenceRegistration extends Component {
  state = {
    currentPage: 0,
    delegates: [],
    initialValues:
      process.env.NODE_ENV === 'production'
        ? {
          participantCategory: 'Select Category',
          title: 'Select Title',
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          homeAddress: '',
          nameOfDelegates: '',
          organisationName: '',
          organisationAddress: '',
          additionalInfo: '',
        }
        : {
          participantCategory: 'CPC Members',
          title: 'Mr.',
          firstName: this.props.subscriber.firstName,
          lastName: this.props.subscriber.lastName,
          emailAddress: this.props.subscriber.emailAddress,
          phoneNumber: '08123456789',
          homeAddress: '25, Mushin, Lagos',
          organisationName: 'Opendesk Consult',
          organisationAddress: '21, Military Street, Onikan, Lagos',
          additionalInfo:
            'This is an additional information to be used solely for registration purposes',
        },
    isLoading: false,
    confFee: 0,
  };

  subheadingRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.subheadingRef.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'start',
      });
    }

    if (prevProps.subscriber !== this.props.subscriber) {
      this.setState(({ initialValues }) => ({
        initialValues: {
          ...initialValues,
          firstName: this.props.subscriber.firstName,
          lastName: this.props.subscriber.lastName,
          emailAddress: this.props.subscriber.emailAddress,
        },
      }));
    }
  }

  validationSchema = yup.object().shape({
    participantCategory: yup
      .mixed()
      .oneOf(
        ['Individual', 'CPC Members', 'Presenting Authors', 'Student'],
        'Please select a valid category'
      ),
    title: yup
      .mixed()
      .oneOf(
        ['Arch.', 'Chief.', 'Dr.', 'Engr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.'],
        'Please select one of the titles'
      ),
    firstName: yup
      .string()
      .min(2, 'Name should be a minimum of 2 characters')
      .max(50, 'Name should be a maximum of 50 characters')
      .required('Please enter your first name'),
    lastName: yup
      .string()
      .min(2, 'Name should be a minimum of 2 characters')
      .max(50, 'Name should be a maximum of 50 characters')
      .required('Please enter your last name'),
    emailAddress: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
    phoneNumber: yup
      .string()
      .max(15, 'Phone number should not exceed 15 characters')
      .required('Please enter your email address'),
    homeAddress: yup
      .string()
      .max(255, 'Phone number should not exceed 255 characters')
      .required('Please enter your email address'),
    nameOfDelegates: yup.array().of(yup.string()),
    organisationName: yup
      .string()
      .required('Please enter name of your organisation'),
    organisationAddress: yup
      .string()
      .required('Please enter address of your organisation'),
    additionalInfo: yup.string(),
  });

  handleDelegates = delegates => this.setState({ delegates });

  handleConfFee = fee => this.setState({ confFee: fee });

  handlePreviousPage = () =>
    this.setState(({ currentPage }) => ({
      currentPage: currentPage == 2 ? 0 : currentPage - 1,
    }));

  handleSubmit = async values => {
    if ([0, 1].includes(this.state.currentPage))
      return this.setState(({ currentPage }) => ({
        currentPage: currentPage + 1,
      }));

    this.setState({ isLoading: true });

    const participantCategoryObject = this.props.registrationCategories.find(
      elem => elem.category == values.participantCategory
    );

    const delegatesToParticipantMapping = this.state.delegates.map(elem => ({
      fullName: elem.value,
      amount: participantCategoryObject.amount,
    }));

    const participants = [
      {
        fullName: `${values.title} ${values.firstName} ${values.lastName}`,
        amount: participantCategoryObject.amount,
      },
      ...delegatesToParticipantMapping,
    ];

    const requestObjectMapping = {
      participants,
      categoryCode: participantCategoryObject.code,
      category: participantCategoryObject.category,
      organisation: values.organisationName,
      organisationAddr: values.organisationAddress,
      amount: this.state.confFee,
      email: values.emailAddress,
      phoneNumber: values.phoneNumber,
      userId: this.props.subscriber.userId,
      submitStatus: 0,
      paymentMethod: 22,
      additionalInfo: values.additionalInfo,
    };

    await this.props.createConferenceRegistration(requestObjectMapping);

    if (this.props.conferenceRegistrationStatus) {
      return this.props.router.push('/registration-status');
    } else {
      message.error(
        'Sorry, we can not save your registration details now. Try again later or contact the admin'
      );
      this.setState({ isLoading: false });
    }
  };

  render() {
    const RenderedPage = pages[this.state.currentPage];

    return (
      <>
        <UserRoute>
          <ProtectedRoute>
            <MainLayout>
              <main className="Main">
                <PageHeading currentPage={this.state.currentPage} />
                <div ref={this.subheadingRef}>
                  <PageSubheading currentPage={this.state.currentPage} />
                </div>

                <section className="FormArea container-1360">
                  <div className="FormArea__Inner">
                    <Formik
                      initialValues={this.state.initialValues}
                      enableReinitialize
                      validationSchema={this.validationSchema}
                      onSubmit={this.handleSubmit}
                    >
                      {props => (
                        <form onSubmit={props.handleSubmit}>
                          <RenderedPage
                            {...props}
                            registrationCategories={
                              this.props.registrationCategories
                            }
                            honorifics={this.props.honorifics}
                            participant={props.values}
                            delegates={this.state.delegates}
                            confFee={this.state.confFee}
                            setDelegates={this.handleDelegates}
                            onConfFeeChange={this.handleConfFee}
                          />

                          <ConfRegBtns
                            currentPage={this.state.currentPage}
                            isLoading={this.state.isLoading}
                            onPreviousPage={this.handlePreviousPage}
                          />
                        </form>
                      )}
                    </Formik>
                  </div>
                </section>
              </main>
            </MainLayout>
          </ProtectedRoute>
        </UserRoute>

        <style jsx>{`
          .Main {
            min-height: calc(100vh - 8.5rem);
            background-color: #f9f9f9;
            padding-bottom: 10rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .FormArea {
            border-radius: 6px;
            box-shadow: 0 0 1px 0 rgba(67, 90, 111, 0.47);
            background-color: #fff;
          }

          .FormArea__Inner {
            padding: 3em 0rem;
          }

          @media (min-width: 769px) {
            .FormArea__Inner {
              padding: 3rem;
            }
          }

          @media (min-width: 1025px) {
            .FormArea__Inner {
              padding: 3.8rem
                ${this.state.currentPage === 1
            ? '3.8rem'
            : this.state.currentPage === 3
              ? '20rem'
              : '10rem'};
            }
          }

          @media (min-width: 1225px) {
            .FormArea__Inner {
              padding: 5.2rem
                ${this.state.currentPage === 1
            ? '5rem'
            : this.state.currentPage === 3
              ? '25rem'
              : '15rem'};
            }
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
    registrationCategories: Object.values(state.registrationCategories),
    honorifics: Object.values(state.honorifics),
    conferenceRegistrationStatus: state.conferenceRegistration,
  };
};

export default connect(mapStateToProps, { createConferenceRegistration })(
  withRouter(ConferenceRegistration)
);
