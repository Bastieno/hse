import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';

class SignupSuccessful extends Component {
  componentDidMount() {
    if (!this.props.signupEmail) this.props.router.replace('/');
  }

  render() {
    if (!this.props.signupEmail) return null;

    return (
      <>
        <UserRoute>
          <MainLayout>
            <main className="Main">
              <div className="Main__Inner container-940">
                <section>
                  <h1>Account Successfully Created!</h1>

                  <p>
                    Kindly confirm your account using the verification link sent
                    to your email address:{' '}
                    <em style={{ fontStyle: 'italic' }}>
                      {this.props.signupEmail}
                    </em>
                  </p>
                </section>
              </div>
            </main>
          </MainLayout>
        </UserRoute>

        <style jsx>{`
          .Main {
            min-height: calc(100vh - 45rem);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
          }

          .Main__Inner {
            padding-top: 9.9rem;
            padding-bottom: 9.9rem;
          }

          section {
            padding: 2rem;
            text-align: center;
            border-radius: 6px;
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

          @media (min-width: 940px) {
            .Main {
              min-height: calc(100vh - 25rem);
            }

            section {
              padding: 2rem 10rem;
            }
          }
        `}</style>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    signupEmail: state.signupEmail,
  };
};

export default connect(mapStateToProps, null)(withRouter(SignupSuccessful));
