import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.auth.message,
});

export default connect(mapStateToProps, actions)(Feature);
