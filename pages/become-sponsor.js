import React, { Component } from 'react';
import { Formik } from 'formik';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';
import { TextArea } from '../components/commons/FormInputs';

class BecomeSponsor extends Component {
  state = {};

  initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    orgName: '',
    orgAddress: '',
    phone: '',
    additionalInfo: '',
  };

  handleSubmit = e => e.preventDefault();

  render() {
    return (
      <UserRoute>
        <MainLayout>
          <>
            <main className="BecomeSponsor">
              <div className="BecomeSponsor__Inner container-1220">
                <h1>Sponsor request form</h1>

                <p className="Instruction">
                  Companies are invited to be sponsors during the conference
                  using the form below. Upon receipt of your request, we will
                  advise you of the sponsorship categories and their prices. You
                  will receive a final confirmation only after payment.
                </p>

                <p>
                  Your information will never be shared. Required fields are
                  marked <span className="asterisk">*</span>
                </p>

                <div className="SponsorFormContainer">
                  <Formik
                    initialValues={this.initialValues}
                    enableReinitialize
                    onSubmit={e => this.handleSubmit}
                  >
                    {props => (
                      <form
                        className="SponsorForm"
                        onSubmit={props.handleSubmit}
                      >
                        <div className="form-field">
                          <label htmlFor="email">
                            First Name <span className="asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.firstName}
                          />
                          {props.errors.firstName && props.touched.firstName ? (
                            <ErrorText content={props.errors.firstName} />
                          ) : null}
                        </div>

                        <div className="form-field">
                          <label htmlFor="email">
                            Last Name <span className="asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.lastName}
                          />
                          {props.errors.lastName && props.touched.lastName ? (
                            <ErrorText content={props.errors.lastName} />
                          ) : null}
                        </div>

                        <div className="form-field">
                          <label htmlFor="email">
                            Email Address <span className="asterisk">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                          />
                          {props.errors.email && props.touched.email ? (
                            <ErrorText content={props.errors.email} />
                          ) : null}
                        </div>

                        <div className="form-field">
                          <label htmlFor="phone">
                            Phone Number <span className="asterisk">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.phone}
                          />
                          {props.errors.phone && props.touched.phone && (
                            <ErrorText content={props.errors.phone} />
                          )}
                        </div>

                        <div className="form-field">
                          <label htmlFor="orgName">
                            Name of Organization{' '}
                            <span className="asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            id="orgName"
                            name="orgName"
                            placeholder="Enter your organization name"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.orgName}
                          />
                          {props.errors.orgName && props.touched.orgName && (
                            <ErrorText content={props.errors.orgName} />
                          )}
                        </div>

                        <div className="form-field">
                          <label htmlFor="orgAddress">
                            Address of Organization{' '}
                            <span className="asterisk">*</span>
                          </label>
                          <input
                            type="text"
                            id="orgAddress"
                            name="orgAddress"
                            placeholder="Enter your organization name"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.orgAddress}
                          />
                          {props.errors.orgAddress &&
                            props.touched.orgAddress && (
                              <ErrorText content={props.errors.orgAddress} />
                            )}
                        </div>

                        <div className="form-field textarea">
                          <label htmlFor="additionalInfo">
                            Additional Information
                          </label>
                          <TextArea
                            placeholder="Please state any information that describes more about your organization"
                            id="additionalInfo"
                            name="additionalInfo"
                            width="100%"
                            value={props.values.additionalInfo}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                        </div>

                        <div className="form-field btnContainer">
                          <button className="btn btn--dark-green btn--sponsor-request">
                            Submit sponsorship request
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </main>

            <style jsx>{`
              .BecomeSponsor {
                padding-left: 1rem;
                padding-right: 1rem;
                min-height: calc(100vh - 8.5rem);
                background-color: #f6f9fc;
                font-size: 1rem;
                font-family: 'ibm_plex_sansregular', sans-serif;
              }

              .BecomeSponsor__Inner {
                padding-top: 7rem;
                padding-bottom: 10rem;
              }

              h1 {
                margin-bottom: 6rem;
                font-size: 2.8em;
                color: #212242;
                font-family: 'ibm_plex_sansbold', sans-serif;
              }

              .Instruction {
                position: relative;
                font-size: 2em;
                padding: 1.5rem;
                padding-left: 3rem;
                margin-bottom: 5rem;
                line-height: 1.76;
                color: #4a4a4a;
                font-family: 'ibm_plex_sansregular', sans-serif;
                background-color: rgba(71, 193, 191, 0.03);
              }

              .Instruction::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background-color: rgb(71, 193, 191);
              }

              p:nth-of-type(2) {
                font-size: 2em;
                margin-bottom: 1rem;
                line-height: 1.76;
                color: #4a4a4a;
                font-family: 'ibm_plex_sansregular', sans-serif;
              }

              .SponsorFormContainer {
                border-radius: 6px;
                box-shadow: 0 0 1px 0 rgba(67, 90, 111, 0.47);
                background-color: #fff;
                padding: 3rem 1.5rem;
              }

              @media (min-width: 769px) {
                .SponsorFormContainer {
                  padding: 4rem 10rem;
                }
              }

              @media (min-width: 1025px) {
                .FormArea__Inner {
                  padding: 4rem 20rem;
                }
              }

              @media (min-width: 1225px) {
                .FormArea__Inner {
                  padding: 6rem 25rem;
                }
              }

              .form-field {
                margin-bottom: 2rem;
              }

              .form-field label {
                display: block;
                margin-bottom: 0.5rem;
                font-family: 'ibm_plex_sansmedium', sans-serif;
                font-size: 1.8em;
                color: #000;
              }

              .asterisk {
                color: #d0021b;
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

              .btnContainer {
                margin-top: 3rem;
              }

              .btn--sponsor-request {
                font-size: 1.8em;
                padding: 0.8rem 2.5rem;
                min-width: 100%;
              }

              @media (min-width: 559px) {
                .btnContainer {
                  margin-top: 1rem;
                }

                .btn--sponsor-request {
                  min-width: 20rem;
                }
              }

              @media (min-width: 769px) {
                .SponsorForm {
                  display: grid;
                  grid-gap: 2.5rem 4rem;
                  grid-template-columns: repeat(2, 1fr);
                }

                .form-field.textarea {
                  grid-column: 1/3;
                }
              }
            `}</style>
          </>
        </MainLayout>
      </UserRoute>
    );
  }
}

export default BecomeSponsor;
