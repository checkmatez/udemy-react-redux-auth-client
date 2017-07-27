import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" className="form-control" type="password" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const ReduxForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
})(Signin);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(ReduxForm);
