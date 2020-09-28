import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Result, Icon } from 'antd';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';
import FullpageSpinner from '../components/commons/FullpageSpinner';
import subscriber from '../services/subscriber';

class SignupSuccessful extends Component {
  state = {
    isTokenAttached: false,
    isTokenValid: false,
    isVerifying: true,
  };

  async componentDidMount() {
    if (!this.props.router.query.q) {
      this.props.router.replace('/');
    } else {
      this.setState({ isTokenAttached: true });
      const token = this.props.router.query.q;
      const { data } = await subscriber.verifyAccount(token);

      this.setState({
        isVerifying: false,
        isTokenValid: data.code == '00' ? true : false,
      });
    }
  }

  render() {
    return (
      <>
        <UserRoute>
          <MainLayout>
            <main className="Main">
              {this.state.isVerifying ? (
                <FullpageSpinner tip="verifying account..." height="78vh" />
              ) : (
                <div className="Main__Inner container-940">
                  {this.state.isTokenAttached === false ? null : (
                    <section>
                      <Result
                        icon={
                          <Icon
                            type={
                              this.state.isTokenValid === true
                                ? 'check-circle'
                                : 'close-circle'
                            }
                            theme="twoTone"
                            twoToneColor={
                              this.state.isTokenValid === true
                                ? '#3dd598'
                                : '#d0021b'
                            }
                            style={{
                              fontSize: '7em',
                            }}
                          />
                        }
                      />

                      {this.state.isTokenValid === true ? (
                        <>
                          <h1>Welcome, Account Verified!</h1>
                          <p>
                            Kindly{' '}
                            <Link href="/login">
                              <a>login to your account</a>
                            </Link>{' '}
                            to continue
                          </p>
                        </>
                      ) : (
                        <>
                          <h1>Oops!</h1>
                          <p>
                            Your account was not successfully verified. Please
                            kindly ensure the verification link you copied in
                            the email sent to you is correct.
                          </p>
                        </>
                      )}
                    </section>
                  )}
                </div>
              )}
            </main>
          </MainLayout>
        </UserRoute>

        <style jsx>{`
          .Main {
            min-height: calc(100vh - 20rem);
            background-color: #fff;
          }

          .Main__Inner {
            padding-top: 9.9rem;
            padding-bottom: 9.9rem;
          }

          section {
            padding: 2rem 8rem;
            text-align: center;
            border-radius: 6px;
            // box-shadow: 0 0 4px 0 rgba(67, 90, 111, 0.47);
            background-color: #fff;
          }

          h1 {
            font-family: 'ibm_plex_sansbold', sans-serif;
            color: #007ace;
            font-size: 3em;
          }

          p {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 2em;
            color: #000;
          }
        `}</style>
      </>
    );
  }
}

export default connect(state => state)(withRouter(SignupSuccessful));
