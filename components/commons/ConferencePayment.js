import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Tabs as AntTabs } from 'antd';
import styled from 'styled-components';
import { toaster } from 'evergreen-ui';
import { createConferenceRegistration, approveUserPayment } from '../../actions/conferenceRegistration';
import { LoadingIcon } from './Icons';

const Tabs = styled(AntTabs)`
  .ant-tabs-bar {
    border-bottom: none !important;
    margin-bottom: 6rem;
  }

  .ant-tabs-nav .ant-tabs-tab {
    font-size: 1.4rem !important;
    font-family: 'ibm_plex_sansbold', sans-serif;
  }

  .ant-tabs-nav .ant-tabs-tab:hover {
    color: #000 !important;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    color: #000 !important;
  }

  .ant-tabs-ink-bar {
    background-color: #000 !important;
    height: 0.3rem !important;
  }

  .ant-tabs-content {
    padding: 5.5rem 4.5rem !important;
    padding-bottom: 3.5rem !important;
    font-size: 1.7rem !important;
    line-height: 1.7;
    font-family: 'ibm_plex_sansregular', sans-serif;
    border: 1px solid rgba(151, 151, 151, 0.3) !important;
  }
`;

const { TabPane } = AntTabs;

class ConferencePayment extends Component {
  state = {
    isLoading: false,
  };

  payWithPaystack = ({ email, amount }) => {
    const handler = PaystackPop.setup({
      key: 'pk_live_79c9d1a4a48ae867a069c1f89c387f4fc1c7129c',
      email,
      amount: `${amount}00`,
      currency: 'NGN',

      callback: async (response) => {
        console.log('Paystack Response', response);
        const {
          details: { transactionId },
          userId,
          approveUserPayment,
          closeConferencePaymentPage,
          onSuccessfulApproval
        } = this.props;

        const { reference, message, transaction, status } = response;

        const paymentInfo = {
          referenceNo: reference,
          transactionId,
          message,
          amount,
          processorId: transaction,
          status: status === 'success' ? true : false,
          userId
        };

        closeConferencePaymentPage();
        await approveUserPayment(paymentInfo);
        onSuccessfulApproval();
        toaster.success(
          `Your transaction was successfully completed`,
          {
            duration: 7,
          }
        );
      },

      onClose: () => {
        this.props.closeConferencePaymentPage();
      },
    });

    handler.openIframe();
  };

  payWithRemita = ({ firstName, lastName, email, amount, transactionId }) => {
    const paymentEngine = RmPaymentEngine.init({
      key:
        'U0hFTEx8MTUwOTM3MTg1NDczOXwyNjdjNDBiZmI5ZjMzMjg5M2I3MWI2YzEzZWUxYTQ5YjUxOTRhMjY5ZDljOWUzNmI0MWUxOTgyYzI1NDUyYTMxM2NlM2QxYTdmZjQxMTExN2M5MTU1NjgxNWYyYmEwMTI3ZWY3MmU4M2MxNmE2ZjBmNjE3Y2Q2OTNlYzA1ODA4Nw==',
      customerId: email,
      firstName,
      lastName,
      narration: 'DPRO HSE Biennial Conference Registration Payment',
      email,
      amount,
      transactionId,

      onSuccess: response => {
        console.log('callback Successful Response', response);
      },

      onError: response => {
        console.log('callback Error Response', response);
      },

      onClose: () => {
        this.props.closeConferencePaymentPage();
      },
    });

    paymentEngine.showPaymentWidget();
  };

  handleFinalSubmission = async paymentMethod => {
    this.setState({ isLoading: true });

    if (paymentMethod === 13) {
      await this.props.dispatch(
        createConferenceRegistration({
          ...this.props.fullParticipantDetails,
          paymentMethod,
        })
      );

      this.props.router.push('/registration-status');
    } else {
      this.payWithRemita(this.props.details);
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <>
        <Tabs animated={false}>
          <TabPane tab="PAYSTACK" key="1" disabled={this.state.isLoading}>
            <p>
              Click on the button below to complete your conference registration
              and pay for your registration fees.
            </p>

            <div className="btnContainer">
              <button
                className="btn btn--dark-green btn--make-payment"
                onClick={() => this.payWithPaystack(this.props.details)}
              >
                {this.state.isLoading ? <LoadingIcon /> : 'Pay with Paystack'}
              </button>
            </div>
          </TabPane>

          <TabPane tab="REMITA" key="2" disabled={this.state.isLoading}>
            <p>
              Click on the button below to complete your conference registration
              and pay for your registration fees.
            </p>

            <div className="btnContainer">
              <button
                className="btn btn--dark-green btn--make-payment"
                onClick={() => this.payWithRemita(this.props.details)}
              >
                {this.state.isLoading ? <LoadingIcon /> : 'Pay with Remita'}
              </button>
            </div>
          </TabPane>

          <TabPane tab="BANK DEPOSIT" key="3" disabled={this.state.isLoading}>
            <div className="Instructions">
              <p>
                Kindly proceed to the bank to make payment (deposit) or transfer
                to the account details below. Once payment (deposit/transfer)
                has been made, send an email with your details to confirm your
                payment and registration.
              </p>
            </div>

            <div className="AccountInfo">
              <h4>Account Information:</h4>
              <p>
                Name: The Conference, International Oil & Gas HSE
                <br />
                Number: 1014003045
                <br />
                Bank: Zenith Bank Plc.
              </p>
            </div>

            <div className="ContactInfo">
              <h4>Contact:</h4>
              <p>+234 817 365 4981, +234 802 140 3475</p>

              <h4>Contact Email:</h4>
              <p>enquiries@oghseconf.com.ng</p>
            </div>
          </TabPane>
        </Tabs>

        <style jsx>
          {`
            .btnContainer {
              text-align: center;
              margin-top: 5rem;
            }

            .btn--make-payment {
              padding: 0.5rem 6rem;
              min-width: 15rem;
              font-family: 'ibm_plex_sansmedium', sans-serif;
            }

            .AccountInfo,
            .ContactInfo {
              margin-top: 3rem;
            }

            h4 {
              margin-bottom: 0.1em;
              font-family: 'ibm_plex_sansmedium', sans-serif;
            }
          `}
        </style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.subscriber.userId,
  };
};

export default connect(mapStateToProps, { approveUserPayment })(withRouter(ConferencePayment));
