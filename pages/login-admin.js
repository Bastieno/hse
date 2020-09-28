import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import { loginAdmin } from '../actions/subscriber';
import Logo from '../components/layout/Logo';
import ErrorText from '../components/commons/ErrorText';
import { Alert } from 'antd';
import {
  EyeIcon,
  EyeInvisibleIcon,
  LoadingIcon,
} from '../components/commons/Icons';
import AdminRoute from '../components/layout/AdminRoute';
import { ADMIN_LOGIN } from '../constants/actionTypes';

class AdminLoginPage extends Component {
  state = {
    isHuman: null,
    isLoading: false,
    isPasswordVisible: false,
    hideLoginError: true,
  };

  async componentDidMount() {
    if (Object.keys(this.props.subscriber).length !== 0) {
      this.props.router.push('/');
    }

    if (this.props.subscriber.type === 'ADMIN') {
      this.props.router.push('/admin');
    }
  }

  initialValues = {
    email: '',
    password: '',
  };

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
    password: Yup.string().required('Please enter your password'),
  });

  recaptchaOnloadCallback = () => console.log('Google recaptcha loaded');
  recaptchaVerifyCallback = () => this.setState({ isHuman: true });
  recaptchaExpiredCallback = () => this.setState({ isHuman: false });

  handlePasswordVisibility = bool => {
    this.setState({ isPasswordVisible: bool });
  };

  handleLogin = async values => {
    if (this.state.isHuman) {
      this.setState({ isLoading: true });

      await this.props.loginAdmin(values);

      if (this.props.error) {
        return this.setState({ isLoading: false, hideLoginError: false });
      }

      this.props.router.push('/admin');
    } else {
      this.setState({ isHuman: false });
    }
  };

  render() {
    return (
      <>
        <AdminRoute>
          <main className="Main">
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <Logo pathname={this.props.router.pathname} />
            </div>

            <section className="LoginPage">
              <h1>Admin Login</h1>

              {this.state.isHuman === false && (
                <div style={{ padding: '1.7rem 6.4rem', paddingBottom: 0 }}>
                  <Alert
                    type="error"
                    message="Please kindly verify that you are a human, not a robot"
                  />
                </div>
              )}

              {this.props.error && (
                <div style={{ padding: '1.7rem 6.4rem', paddingBottom: 0 }}>
                  <Alert type="danger" message={this.props.error} />
                </div>
              )}

              <div className="LoginPage__Form">
                <Formik
                  initialValues={this.initialValues}
                  validationSchema={this.validationSchema}
                  onSubmit={this.handleLogin}
                >
                  {props => (
                    <form onSubmit={props.handleSubmit}>
                      <div className="form-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email address"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                        />
                        {props.errors.email && props.touched.email && (
                          <ErrorText content={props.errors.email} />
                        )}
                      </div>

                      <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                          <input
                            type={
                              this.state.isPasswordVisible ? 'text' : 'password'
                            }
                            id="password"
                            name="password"
                            placeholder="Enter password..."
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                          />

                          <span
                            title={
                              this.state.isPasswordVisible
                                ? 'Hide Password'
                                : 'Show Password'
                            }
                            className="eye-icon"
                          >
                            {this.state.isPasswordVisible ? (
                              <EyeInvisibleIcon
                                handlePasswordVisibility={
                                  this.handlePasswordVisibility
                                }
                              />
                            ) : (
                              <EyeIcon
                                handlePasswordVisibility={
                                  this.handlePasswordVisibility
                                }
                              />
                            )}
                          </span>
                        </div>

                        {props.errors.password && props.touched.password && (
                          <ErrorText content={props.errors.password} />
                        )}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Recaptcha
                          sitekey="6LcuWsIUAAAAAGofc6QE-ERiMnlObYP5ahsP4JhF"
                          render="explicit"
                          onloadCallback={this.recaptchaOnloadCallback}
                          verifyCallback={this.recaptchaVerifyCallback}
                          expiredCallback={this.recaptchaExpiredCallback}
                          size="normal"
                        />
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <button
                          type="submit"
                          className="btn btn--green"
                          disabled={this.state.isLoading}
                        >
                          {this.state.isLoading ? <LoadingIcon /> : 'Log In'}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </section>

            {/* <section className="LoginPage__Forgot-password">
              <h2>Forgot your password?</h2>
              <p>
                No worries, click <span className="link-in-p">here</span> to
                reset your password.
              </p>
            </section> */}
          </main>
        </AdminRoute>

        <style jsx>{`
          .Main {
            min-height: 100vh;
            background-color: #f6f9fc;
            font-size: 1rem;
          }

          .LoginPage {
            margin: 2.9rem auto;
            width: 100%;
            max-width: 556px;
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
            color: #fff;
            background-color: #36a3f9;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
          }

          .LoginPage__Form {
            padding: 3.4rem 6.4rem;
            padding-top: 2rem;
          }

          .form-field {
            margin-bottom: 1.6rem;
            position: relative;
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
          }

          .password-input-container {
            position: relative;
          }

          input#password {
            padding-right: 4rem;
          }

          .eye-icon {
            position: absolute;
            right: 10px;
            bottom: 25%;
          }

          button {
            padding: 0.8rem 4.2rem;
            margin-top: 2rem;
            margin-right: 2rem;
            font-size: 1.76em;
            min-width: 15rem;
          }

          .LoginPage__Forgot-password {
            width: 100%;
            max-width: 556px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            padding-bottom: 5.5rem;
          }

          .LoginPage__Forgot-password h2 {
            margin-bottom: 1rem;
            opacity: 0.89;
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.7em;
            color: #000;
          }

          .LoginPage__Forgot-password p {
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.6em;
            color: #000;
            opacity: 0.5;
          }

          .link-in-p {
            text-decoration: underline;
            color: #36a3f9;
          }

          .LoginPage__Forgot-password .link-in-p:hover {
            cursor: pointer !important;
            text-decoration: none;
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
    error: state.error[ADMIN_LOGIN],
  };
};

export default connect(mapStateToProps, { loginAdmin })(
  withRouter(AdminLoginPage)
);
