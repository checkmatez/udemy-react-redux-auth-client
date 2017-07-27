import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const require_auth = (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

export default require_auth;
