import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

export class AdminRoute extends Component {
  async componentDidMount() {
    if (this.props.subscriber.type === 'USER') {
      this.props.router.replace('/');
    }
  }

  render() {
    return this.props.subscriber.type === 'USER' ? null : (
      <>{this.props.children}</>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
  };
};

export default connect(mapStateToProps, null)(withRouter(AdminRoute));
