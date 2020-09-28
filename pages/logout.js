import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { logout } from '../actions/subscriber';

class Logout extends Component {
  state = {
    isAdmin: this.props.admin ? true : false,
  };

  async componentDidMount() {
    this.props.logout();

    if (this.props.subscriber.type === 'ADMIN') {
      this.props.router.replace('/login-admin');
    }

    if (this.props.subscriber.type === 'USER') {
      this.props.router.replace('/login');
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
  };
};

export default connect(mapStateToProps, { logout })(withRouter(Logout));
