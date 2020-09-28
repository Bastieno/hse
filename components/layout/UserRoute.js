import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

export class UserRoute extends Component {
  async componentDidMount() {
    if (this.props.subscriber.type === 'ADMIN') {
      this.props.router.replace('/admin');
    }
  }

  render() {
    return this.props.subscriber.type === 'ADMIN' ? null : (
      <>{this.props.children}</>
    );
  }
}

const mapStateToProps = state => {
  return { subscriber: state.subscriber };
};

export default connect(mapStateToProps, null)(withRouter(UserRoute));
