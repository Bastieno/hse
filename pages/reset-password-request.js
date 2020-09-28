import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Alert as EgAlert } from 'evergreen-ui';
import UserRoute from '../components/layout/UserRoute';
import Logo from '../components/layout/Logo';
import ErrorText from '../components/commons/ErrorText';
import { LoadingIcon } from '../components/commons/Icons';
import { getCurrentSubscriber } from '../actions/subscriber';
import subscriber from '../services/subscriber';

const Alert = styled(EgAlert)`
  font-size: 1.65rem !important;
  font-family: 'ibm_plex_sansregular', sans-serif !important;
  padding: 1rem !important;
  font-weight: normal !important;

  .📦pr_16px {
    padding-right: 1rem !important;
  }

  .📦pl_16px {
    padding-left: 1rem !important;
  }

  .📦pt_12px {
    padding-top: 1rem !important;
  }

  .📦pb_12px {
    padding-bottom: 1rem !important;
  }

  .📦fnt-sze_14px {
    font-size: inherit;
    font-family: inherit;
  }

  .📦f-wght_600 {
    font-weight: inherit;
  }
`;

class ResetPasswordRequest extends Component {
  state = {
    isSubscriberExist: null,
    isUserVerified: null,
    isRequestSuccessful: false,
    isLoading: false,
    isError: false,
  };

  async componentDidMount() {
    await this.props.dispatch(getCurrentSubscriber());
    if (Object.entries(this.props.subscriber).length > 0) {
      this.props.router.push('/');
      this.setState({ isSubscriberExist: true });
    } else {
      this.setState({ isSubscriberExist: false });
    }
  }

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
  });

  recaptchaLoaded = () => console.log('Google Recaptcha loaded');

  verifyCallback = () => this.setState({ isUserVerified: true });

  handleResetRequest = async values => {
    if (this.state.isUserVerified) {
      this.setState({ isLoading: true });

      try {
        const httpResponse = await subscriber.sendResetPasswordRequest(values);
        if (httpResponse.data.code == '00') {
          this.setState({
            isLoading: false,
            isRequestSuccessful: true,
            isError: false,
          });
        }
      } catch (error) {
        console.log('Error sending reset password request', error);
        this.setState({ isLoading: false, isError: true });
      }
    } else {
      this.setState({ isUserVerified: false });
    }
  };

  render() {
    return (
      <>
        <UserRoute>
          {this.state.isSubscriberExist === null
            ? null
            : !this.state.isSubscriberExist && (
                <main className="Main">
                  <div style={{ textAlign: 'center', paddingTop: 70 }}>
                    <Logo pathname={this.props.router.pathname} />
                  </div>

                  <section className="ResetRequest">
                    <h1>Reset password request</h1>

                    {this.state.isUserVerified === false && (
                      <div className="AlertContainer">
                        <Alert
                          intent="danger"
                          title="Please kindly verify that you are a human, not a robot"
                        />
                      </div>
                    )}

                    {this.state.isError === true && (
                      <div className="AlertContainer">
                        <Alert
                          intent="danger"
                          title="Your password reset request was not successful. Please try again later"
                        />
                      </div>
                    )}

                    <div className="ResetRequest__Form">
                      {this.state.isRequestSuccessful ? (
                        <p className="RequestSuccessful">
                          Your password reset request is successful. You should
                          soon receive an email allowing you to reset your
                          password. Please make sure to check your spam if you
                          can't find the email.
                        </p>
                      ) : (
                        <Formik
                          validationSchema={this.validationSchema}
                          initialValues={{ email: '' }}
                          onSubmit={this.handleResetRequest}
                        >
                          {props => (
                            <form onSubmit={props.handleSubmit}>
                              <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <input
                                  placeholder="Enter your email here"
                                  id="email"
                                  name="email"
                                  value={props.values.email}
                                  disabled={this.state.isRequestSuccessful}
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                />
                                {props.errors.email && props.touched.email && (
                                  <ErrorText content={props.errors.email} />
                                )}
                              </div>

                              <div className="RecaptchaContainer">
                                <Recaptcha
                                  sitekey="6LcuWsIUAAAAAGofc6QE-ERiMnlObYP5ahsP4JhF"
                                  render="explicit"
                                  onloadCallback={this.recaptchaLoaded}
                                  verifyCallback={this.verifyCallback}
                                  size="normal"
                                />
                              </div>

                              <div style={{ textAlign: 'center' }}>
                                <button
                                  type="submit"
                                  className="btn btn--green"
                                  disabled={this.state.isRequestSuccessful}
                                >
                                  {this.state.isLoading ? (
                                    <LoadingIcon />
                                  ) : (
                                    'Reset Password'
                                  )}
                                </button>

                                <Link href="/login">
                                  <span className="CustomLink">
                                    {' '}
                                    or login to your account
                                  </span>
                                </Link>
                              </div>
                            </form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </section>
                </main>
              )}
        </UserRoute>

        <style jsx>{`
          .Main {
            padding-left: 1rem;
            padding-right: 1rem;
            min-height: 100vh;
            background-color: #f6f9fc;
            font-size: 1rem;
            font-family: 'ibm_plex_sansregular', sans-serif;
          }

          .ResetRequest {
            width: 100%;
            max-width: 556px;
            margin: 2.9rem auto;
            border-radius: 6px;
            box-shadow: 0 0 2px 0 rgba(67, 90, 111, 0.47);
            background-color: #fff;
          }

          h1 {
            font-family: 'ibm_plex_sansbold', sans-serif;
            font-size: 2em;
            text-align: center;
            padding-top: 2rem;
            padding-bottom: 2rem;
            color: #007ace;
            background-color: rgba(74, 144, 226, 0.1);
          }

          .AlertContainer {
            padding: 1.7rem 1.5rem;
            padding-bottom: 0;
          }

          .RequestSuccessful {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 2.1rem;
            color: #171725;
            line-height: 1.5;
          }

          .ResetRequest__Form {
            padding: 3.4rem 1.5rem;
            padding-top: 2rem;
          }

          .form-field {
            margin-bottom: 2rem;
            width: 100%;
          }

          label {
            font-family: 'ibm_plex_sansmedium', sans-serif;
            font-size: 1.8em;
            color: #000;
            display: block;
            margin-bottom: 0.5rem;
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

          .RecaptchaContainer {
            display: flex;
            justify-content: center;
            transform: scale(0.6);
            margin-top: 3rem;
          }

          button {
            padding: 0.8rem 4.2rem;
            margin-top: 2rem;
            margin-right: 2rem;
            font-size: 1.7em;
            min-width: 21rem;
          }

          .CustomLink {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.7em;
            color: #36a3f9;
            cursor: pointer;
            text-decoration: underline;
          }

          .CustomLink:hover {
            text-decoration: none;
          }

          @media (min-width: 321px) {
            .AlertContainer,
            .ResetRequest__Form {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          @media (min-width: 557px) {
            .AlertContainer,
            .ResetRequest__Form {
              padding-left: 6.4rem;
              padding-right: 6.4rem;
            }
          }

          @media (min-width: 321px) {
            .RecaptchaContainer {
              transform: scale(0.85);
            }
          }

          @media (min-width: 568px) {
            .RecaptchaContainer {
              transform: scale(0.95);
            }
          }

          @media (min-width: 769px) {
            .RecaptchaContainer {
              transform: scale(1);
            }
          }
        `}</style>
      </>
    );
  }
}

export default connect(state => state)(withRouter(ResetPasswordRequest));
