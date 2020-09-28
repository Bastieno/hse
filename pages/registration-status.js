import React, { Component } from 'react';
import Link from 'next/link';
import { Empty, Modal } from 'antd';
import { connect } from 'react-redux';
import UserRoute from '../components/layout/UserRoute';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import {
  dateFormatter,
  timeFormatter,
  nairaFormatter,
} from '../helpers/formatters';
import * as conferenceRegistration from '../services/conferenceRegistration';
import { getUserRegistrations } from '../actions/conferenceRegistration';
import paymentStatus from '../constants/paymentStatus';
import FullpageSpinner from '../components/commons/FullpageSpinner';
import ConferencePayment from '../components/commons/ConferencePayment';
import { GET_USER_REGISTRATIONS, APPROVE_USER_PAYMENT } from '../constants/labels';
import { LoadingIcon } from '../components/commons/Icons';
import { toaster } from 'evergreen-ui';

class TicketCard extends Component {
  state = {
    isConferencePaymentVisible: false,
    firstName: '',
    lastName: '',
    isDeleting: false,
  };

  showConferencePaymentPage = participant => {
    this.setState({
      isConferencePaymentVisible: true,
    });

    this.participantNameParts(participant.participants[0].fullName);
  };

  closeConferencePaymentPage = () => {
    this.setState({
      isConferencePaymentVisible: false,
    });
  };

  deleteRegistration = async () => {
    try {
      this.setState({ isDeleting: true });

      const {
        registration: { id },
        fetchRegistrationEntries,
      } = this.props;

      const { data } = await conferenceRegistration.deleteUserRegistration(id);

      if (data.code === '00') {
        fetchRegistrationEntries();
        toaster.success(
          `Your registration entry with id: ${id} was successfully deleted`,
          {
            id: 'forbidden-action',
            duration: 5,
          }
        );
      }
    } catch (error) {
      this.setState({ isDeleting: false });
      console.log('Delete User Registration: ', error);
    }
  };

  participantNameParts = fullName => {
    const nameParts = fullName.split(' ').reduce((pv, cv) => {
      const arrayOfTitles = [
        'Arch.',
        'Chief.',
        'Dr.',
        'Engr.',
        'Mr.',
        'Mrs.',
        'Ms.',
        'Prof.',
      ];

      if (!arrayOfTitles.includes(cv)) pv.push(cv);

      return pv;
    }, []);

    this.setState({ firstName: nameParts[0], lastName: nameParts[1] });
  };

  render() {
    const { registration } = this.props;

    return (
      <>
        <section className="TicketCard">
          <h2 className="FullName">{registration.participants[0].fullName}</h2>
          {/* <p className="Address">Somewhere around the globe</p> */}

          <div className="EmailPlusPhone">
            <section>
              <h4>Email Address</h4>
              <p>{registration.email}</p>
            </section>
            <section>
              <h4>Phone Number</h4>
              <p>{registration.phoneNumber}</p>
            </section>
          </div>

          <div className="Organisation">
            <section>
              <h4>Name of Organisation</h4>
              <p>{registration.organisation}</p>
            </section>
            <section>
              <h4>Address of Organisation</h4>
              <p>{registration.organisationAddr}</p>
            </section>
          </div>

          {registration.additionalInfo && (
            <div className="AdditionalInfo">
              <h4>Additional Information</h4>
              <p>{registration.additionalInfo}</p>
            </div>
          )}

          {registration.participants.length > 1 && (
            <div className="OtherParticipants">
              <h4>Other Participants</h4>
              <ul>
                {registration.participants.slice(1).map((elem, idx) => (
                  <li key={idx}>{elem.fullName}</li>
                ))}
              </ul>
            </div>
          )}

          <hr />

          <div className="CategoryPlusDelegate">
            <section>
              <h4>Selected Category</h4>
              <p>{registration.category}</p>
            </section>
            <section>
              <h4>Number of Tickets</h4>
              <p>{registration.participants.length}</p>
            </section>
          </div>

          <div className="FeeSummary">
            <section>
              <h4>Category Fee</h4>
              <p>{nairaFormatter(registration.participants[0].amount)}</p>
            </section>
            <section>
              <h4>Total Amount Due</h4>
              <p>{nairaFormatter(registration.amount)}</p>
            </section>
          </div>

          <hr />

          <div className="RegDatePlusStatus">
            <section>
              <h4>Registered On</h4>
              <p>{`${dateFormatter(registration.entryDate)} - ${timeFormatter(
                registration.entryDate
              )}`}</p>
            </section>
            <section>
              <h4>Payment Status</h4>
              <p
                style={{
                  color: paymentStatus[registration.paymentStatus].color,
                }}
              >
                {paymentStatus[registration.paymentStatus].value}
              </p>
            </section>
          </div>

          <div className={`btn-container ${registration.paymentStatus !== 1 ? 'hidden' : ''}`}>
            <button
              className="btn btn--green btn--proceed-payment"
              onClick={() => this.showConferencePaymentPage(registration)}
              disabled={registration.paymentStatus !== 1}
            >
              Proceed to make payment
            </button>

            <button
              className="btn btn--ash btn--proceed-payment"
              onClick={() => this.deleteRegistration(registration.id)}
              disabled={registration.paymentStatus !== 1}
            >
              {this.state.isDeleting ? <LoadingIcon /> : 'Delete'}
            </button>
          </div>
        </section>

        <Modal
          visible={this.state.isConferencePaymentVisible}
          onCancel={this.closeConferencePaymentPage}
          centered={true}
          footer={null}
          width={720}
          zIndex={50}
        >
          <ConferencePayment
            details={{
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: registration.email,
              amount: registration.amount,
              transactionId: registration.tranxId,
            }}
            closeConferencePaymentPage={this.closeConferencePaymentPage}
            onSuccessfulApproval={this.props.fetchRegistrationEntries}
          />
        </Modal>

        <style jsx>{`
          .TicketCard {
            margin-bottom: 5rem;
            font-size: 1rem;
            padding: 3.7rem;
            background-color: #f6f9fc;
            border-radius: 10px;
            position: relative;
          }

          h4 {
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.6em;
            color: #4a4a4a;
            margin-top: 2.9rem;
            margin-bottom: 1rem;
          }

          h4 + p,
          li {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.7em;
            color: #000;
            margin-bottom: 1rem;
          }

          .FullName {
            font-family: 'ibm_plex_sansbold', sans-serif;
            font-size: 2em;
            color: #212242;
            margin-bottom: 1rem;
            margin-top: 2rem;
          }

          .Address {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.8rem;
            color: #5e6c84;
            margin-bottom: 2rem;
          }

          hr {
            height: 1px;
            overflow: visible;
            background-color: rgba(23, 23, 37, 0.2);
            margin-top: 2rem;
            width: 90%;
            margin-left: 0;
          }

          .btn {
            margin-bottom: 2rem;
            width: 100%;
          }

          @media (min-width: 769px) {
            .EmailPlusPhone,
            .Organisation,
            .CategoryPlusDelegate,
            .FeeSummary,
            .RegDatePlusStatus {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 2rem;
            }
          }

          .btn-container {
            margin-top: 3.7rem;
            font-size: 1.7rem;
            display: flex;
          }

          .btn-container.hidden {
            display: none;
          }

          .btn {
            padding: 0.5rem 3rem;
            width: unset;
            min-width: 15rem;
            font-family: 'ibm_plex_sansmedium', sans-serif;
          }
        `}</style>
      </>
    );
  }
}

class RegStatus extends Component {
  headingRef = React.createRef();

  componentDidMount() {
    this.fetchRegistrationEntries();
  }

  fetchRegistrationEntries = async () => {
    await this.props.getUserRegistrations(this.props.subscriber.userId);

    this.headingRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  render() {
    return (
      <>
        <UserRoute>
          <ProtectedRoute>
            <MainLayout>
              <main className="RegStatus">
                <div className="RegStatus__Inner container-1220">
                  <section className="RegStatus__Header" ref={this.headingRef}>
                    <h1 className="RegStatus__Header__Content">
                      Registration Details
                    </h1>
                  </section>

                  {(() => {
                    if (this.props.isLoading) {
                      return (
                        <FullpageSpinner
                          tip="Fetching your registration details"
                          height="45vh"
                        />
                      );
                    }

                    if (this.props.isApprovalLoading) {
                      return (
                        <FullpageSpinner
                          tip="Your transaction is being processed"
                          height="45vh"
                        />
                      );
                    }

                    if (this.props.registrations.length === 0) {
                      return (
                        <div
                          style={{
                            width: '100%',
                            height: '45vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Empty
                            description="You have not registered for the conference"
                            style={{
                              fontFamily: "'ibm_plex_sansregular', sans-serif",
                              fontSize: 17,
                            }}
                          >
                            <Link href="/conference-registration">
                              <a>Register now</a>
                            </Link>
                          </Empty>
                        </div>
                      );
                    }

                    return this.props.registrations.sort((a, b) => a.paymentStatus - b.paymentStatus).map(reg => (
                      <TicketCard
                        key={reg.id}
                        registration={reg}
                        fetchRegistrationEntries={this.fetchRegistrationEntries}
                      />
                    ));
                  })()}
                </div>
              </main>
            </MainLayout>
          </ProtectedRoute>
        </UserRoute>

        <style jsx>{`
          main {
            min-height: calc(100vh - 8.5rem);
            background-color: #fff;
          }

          .RegStatus__Inner {
            padding-top: 4.9rem;
            padding-bottom: 3.9rem;
          }

          .RegStatus__Header {
            padding-bottom: 3.4rem;
          }

          .RegStatus__Header__Content {
            display: inline-block;
            width: 16.66rem;
            height: 11.54rem;
            border-radius: 3px;
            font-family: 'ibm_plex_sansbold', sans-serif;
            font-size: 1.6rem;
            line-height: 11.54rem;
            letter-spacing: -0.16px;
            text-align: center;
            color: #fff;
            background-color: #50b5ff;
            box-shadow: 0 1px 2px 0 rgba(67, 90, 111, 0.3);
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
    registrations: state.myRegistrations,
    isLoading: state.isLoading[GET_USER_REGISTRATIONS],
    isApprovalLoading: state.isLoading[APPROVE_USER_PAYMENT],
  };
};

export default connect(mapStateToProps, { getUserRegistrations })(RegStatus);
