import React, { Component } from 'react';
import { Empty } from 'antd';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import UserAbstracts from '../components/UserAbstracts';
import FullpageSpinner from '../components/commons/FullpageSpinner';
import {
  getSubscriberAbstracts,
  removeAbstractCompletely,
} from '../actions/abstract';

const modalBoxStyles = {
  okButton: {
    color: '#fff',
    backgroundColor: '#dd573b',
    border: '1px solid #dd573b',
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

class MyAbstracts extends Component {
  state = {
    abstracts: null,
    isFetchingAbstracts: false,
    isDeletingAbstract: false,
    isModalVisible: false,
    abstractId: null,
  };

  fetchAbstracts = async () => {
    const { dispatch, subscriber, myAbstracts } = this.props;
    await dispatch(getSubscriberAbstracts(subscriber.userId));
    this.setState({ isFetchingAbstracts: false, abstracts: myAbstracts });
  };

  async componentDidMount() {
    this.setState({ isFetchingAbstracts: true });

    const { dispatch, subscriber, myAbstracts } = this.props;
    const isMyAbstractsNotAvailable = !myAbstracts.abstracts.length;

    if (subscriber && isMyAbstractsNotAvailable)
      await dispatch(getSubscriberAbstracts(subscriber.userId));

    this.setState({ isFetchingAbstracts: false, abstracts: myAbstracts });
  }

  async componentDidUpdate(prevProps, prevState) {
    const isComponentUpdated =
      (prevProps.subscriber === null && this.props.subscriber) ||
      this.props.createAbstract ||
      prevProps.myAbstracts.length != this.props.myAbstracts.length;

    if (isComponentUpdated) await this.fetchAbstracts();
  }

  handleAbstractDelete = async () => {
    this.setState({ isDeletingAbstract: true });
    await this.props.dispatch(removeAbstractCompletely(this.state.abstractId));
    this.setState({ isDeletingAbstract: false, isModalVisible: false });

    await this.props.dispatch(
      getSubscriberAbstracts(this.props.subscriber.userId)
    );
  };

  handleModalOpen = abstractId => {
    console.log(abstractId);
    this.setState({ isModalVisible: true, abstractId });
  };

  handleModalClose = () => this.setState({ isModalVisible: false });

  render() {
    return (
      <>
        <Modal
          title={null}
          okText="Remove Abstract"
          okButtonProps={{ style: modalBoxStyles.okButton }}
          cancelButtonProps={{ style: modalBoxStyles.cancelButton }}
          style={{ zIndex: 5000 }}
          bodyStyle={{
            fontFamily: "'ibm_plex_sansregular', sans-serif",
            fontSize: '1.4em',
          }}
          visible={this.state.isModalVisible}
          confirmLoading={this.state.isDeletingAbstract}
          onOk={this.handleAbstractDelete}
          onCancel={this.handleModalClose}
        >
          <p>Do you want to remove this abstract?</p>
        </Modal>
        <UserRoute>
          <ProtectedRoute>
            <MainLayout>
              <main className="Main">
                <div className="Main__header container-1220">
                  <p className="greeting-msg ">
                    Welcome{' '}
                    {this.props.subscriber
                      ? this.props.subscriber.firstName
                      : null}
                    ,
                  </p>

                  {/* <ul className="TabList">
                    <li className="TabItem">Abstracts</li>
                  </ul> */}
                </div>

                {this.state.isFetchingAbstracts === true ||
                !this.props.myAbstracts.status ? (
                  <FullpageSpinner
                    tip="fetching your abstracts..."
                    height="45vh"
                  />
                ) : this.props.myAbstracts.abstracts.length === 0 &&
                  this.props.myAbstracts.status == 'completed' ? (
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
                      description="You have not submitted any abstract"
                      style={{
                        fontFamily: 'ibm_plex_sansregular',
                        fontSize: 17,
                      }}
                    >
                      <Link href="/submit-abstract">
                        <a>Submit an abstract</a>
                      </Link>
                    </Empty>
                  </div>
                ) : (
                  <UserAbstracts
                    abstracts={this.props.myAbstracts.abstracts}
                    user={this.props.subscriber}
                    onDelete={this.handleModalOpen}
                  />
                )}
              </main>
            </MainLayout>
          </ProtectedRoute>
        </UserRoute>

        <style jsx>{`
          .Main {
            min-height: calc(100vh - 8.5rem);
            background-color: #fff;
          }

          .Main__header {
            padding-top: 3.9rem;
          }

          .greeting-msg {
            font-family: 'ibm_plex_sansbold', sans-serif;
            font-size: 2.5rem;
            letter-spacing: -0.27px;
            color: #171725;
            margin-bottom: 2.7rem;
          }

          .TabList {
            margin: 0;
            padding: 0;
            list-style-type: none;
            padding-bottom: 3.4rem;
            display: none;
          }

          .TabItem {
            display: inline-block;
            margin-right: 1.6rem;
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
            opacity: 1;
            box-shadow: 0 1px 2px 0 rgba(67, 90, 111, 0.3);
          }

          a {
            padding: 0.8rem 2.9rem;
            border-radius: 24px;
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.6rem;
            color: #fff;
            background-color: #36a3f9;
            display: inline-block;
          }

          a:hover {
            cursor: pointer;
            background-color: #0f92fa;
          }

          @media (min-width: 769px) {
            .TabList {
              display: block;
              padding-bottom: 3.4rem;
            }
          }
        `}</style>
      </>
    );
  }
}

export default connect(state => state)(withRouter(MyAbstracts));
