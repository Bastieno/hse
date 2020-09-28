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

const SuccessTitle = () => (
  <span>
    Your password was successfully reset. Please{' '}
    <Link href="/login">
      <a>log in to your account</a>
    </Link>{' '}
    with the new password
  </span>
);

class ResetPassword extends Component {
  state = {
    isSubscriberExist: null,
    isUserVerified: null,
    isRequestSuccessful: false,
    isLoading: false,
    isError: false,
    requestToken: '',
    requestEmail: '',
  };

  async componentDidMount() {
    await this.props.dispatch(getCurrentSubscriber());
    if (Object.entries(this.props.subscriber).length > 0) {
      this.props.router.push('/');
      this.setState({ isSubscriberExist: true });
    } else {
      this.setState({ isSubscriberExist: false });
    }

    if (!this.props.router.query.email && !this.props.router.query.q) {
      this.props.router.push('/');
    } else {
      this.setState({
        requestToken: this.props.router.query.q,
        requestEmail: this.props.router.query.email,
      });
    }
  }

  validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Please enter your new password')
      .min(8, 'Password should be a minimum of 8 characters')
      .max(254, 'Password should not be more than 254 characters'),
    confirmPassword: Yup.string().when('newPassword', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Your passwords do not match'
      ),
    }),
  });

  recaptchaLoaded = () => console.log('Google Recaptcha loaded');

  verifyCallback = () => this.setState({ isUserVerified: true });

  handlePasswordReset = async values => {
    if (this.state.isUserVerified) {
      this.setState({ isLoading: true });
      const requestData = {
        newPassword: values.newPassword,
        emailAddress: this.state.requestEmail,
        token: this.state.requestToken.replace(' ', '+'),
      };

      try {
        const httpResponse = await subscriber.resetPassword(requestData);

        if (httpResponse.data.code == '00') {
          this.setState({
            isLoading: false,
            isRequestSuccessful: true,
            isError: false,
          });
        }

        if (httpResponse.data.code == '04') {
          this.setState({
            isLoading: false,
            isRequestSuccessful: false,
            isError: true,
          });
        }
      } catch (error) {
        console.log('Error resetting password', error);
        this.setState({
          isLoading: false,
          isError: true,
          isRequestSuccessful: false,
        });
      }
    } else {
      this.setState({ isUserVerified: false });
    }
  };

  render() {
    return (
      <>
        <UserRoute>
          {this.state.isSubscriberExist === null || !this.state.requestToken
            ? null
            : !this.state.isSubscriberExist && (
                <main className="Main">
                  <div style={{ textAlign: 'center', paddingTop: 70 }}>
                    <Logo pathname={this.props.router.pathname} />
                  </div>

                  <section className="ResetRequest">
                    <h1>Reset password</h1>

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
                          title="We could not reset your password at the moment. Kindly ensure the link you copied is correct and try again later"
                        />
                      </div>
                    )}

                    {this.state.isRequestSuccessful === true && (
                      <div className="AlertContainer">
                        <Alert intent="success" title={<SuccessTitle />} />
                      </div>
                    )}

                    <div className="PasswordReset__Form">
                      <Formik
                        validationSchema={this.validationSchema}
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        onSubmit={this.handlePasswordReset}
                      >
                        {props => (
                          <form onSubmit={props.handleSubmit}>
                            <div className="form-field">
                              <label htmlFor="newPassword">New Password</label>
                              <input
                                type="password"
                                placeholder="Enter your new password here"
                                id="newPassword"
                                name="newPassword"
                                value={props.values.newPassword}
                                disabled={this.state.isRequestSuccessful}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                              />
                              {props.errors.newPassword &&
                                props.touched.newPassword && (
                                  <ErrorText
                                    content={props.errors.newPassword}
                                  />
                                )}
                            </div>

                            <div className="form-field">
                              <label htmlFor="confirmPassword">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                placeholder="Enter your new password again"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={props.values.confirmPassword}
                                disabled={this.state.isRequestSuccessful}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                              />
                              {props.errors.confirmPassword &&
                                props.touched.confirmPassword && (
                                  <ErrorText
                                    content={props.errors.confirmPassword}
                                  />
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
                            </div>
                          </form>
                        )}
                      </Formik>
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

          .PasswordReset__Form {
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

          button:disabled,
          button[disabled] {
            border: 1px solid #999999;
            background-color: #cccccc;
            color: #666666;
            cursor: not-allowed;
          }

          @media (min-width: 321px) {
            .AlertContainer,
            .PasswordReset__Form {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          @media (min-width: 557px) {
            .AlertContainer,
            .PasswordReset__Form {
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

export default connect(state => state)(withRouter(ResetPassword));
