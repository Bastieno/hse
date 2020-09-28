import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import { Alert } from 'antd';
import { signup } from '../actions/subscriber';
import UserRoute from '../components/layout/UserRoute';
import Logo from '../components/layout/Logo';
import ErrorText from '../components/commons/ErrorText';
import {
  EyeIcon,
  EyeInvisibleIcon,
  LoadingIcon,
} from '../components/commons/Icons';
import { SIGNUP } from '../constants/actionTypes';

class SignupPage extends Component {
  state = {
    isHuman: null,
    isLoading: false,
    isPasswordVisible: false,
    hideSignupError: true,
  };

  async componentDidMount() {
    // if you are logged in, you don't have business with signup page
    if (Object.keys(this.props.subscriber).length !== 0) {
      this.props.router.push('/');
    }
  }

  initialValues = {
    firstName: '',
    lastName: '',
    phoneNum: '',
    email: '',
    password: '',
  };

  validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Please enter your first name')
      .min(2, 'First name should be a minimum of 2 characters')
      .max(20, 'First name should not be more that 50 characters')
      .test(
        'test-name',
        'First name should not contain numbers and/or special characters',
        value => {
          if (/[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?0-9]/.test(value))
            return false;
          return true;
        }
      ),
    lastName: Yup.string()
      .required('Please enter your last name')
      .min(2, 'Last name should be a minimum of 2 characters')
      .max(20, 'Last name should not be more that 50 characters')
      .test(
        'test-name',
        'Last name should not contain numbers and/or special characters',
        value => {
          if (/[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?0-9]/.test(value))
            return false;
          return true;
        }
      ),
    phoneNum: Yup.string().max(
      15,
      'Phone number should not be more that 15 characters'
    ),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required')
      .max(254, 'Email should not be more than 254 characters'),
    password: Yup.string()
      .required('Please enter a password')
      .min(8, 'Password should be a minimum of 8 characters')
      .max(254, 'Password should not be more than 254 characters'),
  });

  recaptchaOnloadCallback = () => console.log('Google recaptcha loaded');
  recaptchaVerifyCallback = () => this.setState({ isHuman: true });
  recaptchaExpiredCallback = () => this.setState({ isHuman: false });

  handlePasswordVisibility = bool => {
    this.setState({ isPasswordVisible: bool });
  };

  handleSignup = async values => {
    if (this.state.isHuman) {
      this.setState({ isLoading: true });

      await this.props.signup({
        ...values,
        firstName: values.firstName.trimRight(),
        lastName: values.lastName.trimRight(),
      });

      if (this.props.error) {
        return this.setState({ isLoading: false, hideSignupError: false });
      }

      this.props.router.push('/account-creation-successful');
    } else {
      this.setState({ isHuman: false });
    }
  };

  render() {
    return (
      <>
        <UserRoute>
          <main className="Main">
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <Logo pathname={this.props.router.pathname} />
            </div>

            <section className="SignupPage">
              <h1>Sign up for an account</h1>

              {this.state.isHuman === false && (
                <div className="AlertContainer">
                  <Alert
                    type="error"
                    message="Please kindly verify that you are a human, not a robot"
                  />
                </div>
              )}

              {this.props.error && !this.state.hideSignupError && (
                <div className="AlertContainer">
                  <Alert type="error" message={this.props.error} />
                </div>
              )}

              <div className="SignupPage__Form">
                <Formik
                  initialValues={this.initialValues}
                  validationSchema={this.validationSchema}
                  onSubmit={this.handleSignup}
                >
                  {props => (
                    <form onSubmit={props.handleSubmit}>
                      <div className="form-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="firstName"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={
                            props.values.firstName
                              .trimLeft()
                              .charAt(0)
                              .toUpperCase() +
                            props.values.firstName.trimLeft().slice(1)
                          }
                        />
                        {props.errors.firstName && props.touched.firstName && (
                          <ErrorText content={props.errors.firstName} />
                        )}
                      </div>

                      <div className="form-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="lastName"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={
                            props.values.lastName
                              .trimLeft()
                              .charAt(0)
                              .toUpperCase() +
                            props.values.lastName.trimLeft().slice(1)
                          }
                        />
                        {props.errors.lastName && props.touched.lastName && (
                          <ErrorText content={props.errors.lastName} />
                        )}
                      </div>

                      <div className="form-field">
                        <label htmlFor="phoneNum">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNum"
                          name="phoneNum"
                          placeholder="Enter your phone number"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.phoneNum}
                        />
                        {props.errors.phoneNum && props.touched.phoneNum && (
                          <ErrorText content={props.errors.phoneNum} />
                        )}
                      </div>

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

                        {props.errors.password && props.touched.password ? (
                          <ErrorText content={props.errors.password} />
                        ) : null}
                      </div>

                      <div className="RecaptchaContainer">
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
                          {this.state.isLoading ? <LoadingIcon /> : 'Sign Up'}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </section>

            <section className="SignupPage__have-account">
              <h2>Already have an account?</h2>
              <Link href="/login">
                <a className="link-in-p">Log in instead</a>
              </Link>
            </section>
          </main>
        </UserRoute>

        <style jsx>{`
          .Main {
            padding-left: 1rem;
            padding-right: 1rem;
            min-height: 100vh;
            background-color: #f6f9fc;
            font-size: 1rem;
          }

          @media (min-width: 568px) {
            .Main {
              padding-left: 0;
              padding-right: 0;
            }
          }

          .SignupPage {
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

          .SignupPage__Form {
            padding: 3.4rem 1.5rem;
            padding-top: 2rem;
          }

          @media (min-width: 321px) {
            .AlertContainer,
            .SignupPage__Form {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          @media (min-width: 557px) {
            .AlertContainer,
            .SignupPage__Form {
              padding-left: 6.4rem;
              padding-right: 6.4rem;
            }
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

          .RecaptchaContainer {
            display: flex;
            justify-content: center;
            transform: scale(0.6);
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

          button {
            padding: 0.8rem 4.2rem;
            margin-top: 2rem;
            margin-right: 2rem;
            font-size: 1.76em;
            min-width: 15rem;
          }

          .SignupPage__have-account {
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            max-width: 556px;
            padding-bottom: 5.5rem;
          }

          .SignupPage__have-account h2 {
            margin-bottom: 1rem;
            text-align: center;
            opacity: 0.89;
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.7em;
            color: #171725;
          }

          .SignupPage__have-account a {
            display: block;
            text-align: center;
            font-family: 'ibm_plex_sansregular', sans-serif;
            font-size: 1.6em;
            color: #36a3f9;
            opacity: 0.5;
          }

          .link-in-p {
            text-decoration: underline;
            color: #36a3f9;
          }

          .link-in-p:hover {
            cursor: pointer;
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
    error: state.error[SIGNUP],
  };
};

export default connect(mapStateToProps, { signup })(withRouter(SignupPage));
