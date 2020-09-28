import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

export class ProtectedRoute extends Component {
  async componentDidMount() {
    if (Object.keys(this.props.subscriber).length === 0) {
      this.props.router.replace(
        `/login?redirect_url=${this.props.router.route}`
      );
    }
  }

  render() {
    return Object.keys(this.props.subscriber).length === 0 ? null : (
      <>{this.props.children}</>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
  };
};

export default connect(mapStateToProps, null)(withRouter(ProtectedRoute));
