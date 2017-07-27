import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = (field) => (
  <fieldset className="form-group">
    <label>{field.text}</label>
    <input {...field.input} className={field.className} type={field.type} />
    {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
  </fieldset>
);

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, errors } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={renderInput} className="form-control" text="Email:" />
        <Field name="password" component={renderInput} className="form-control" text="Password:" type="password" />
        <Field name="passwordConfirm" component={renderInput} className="form-control" text="Confirm Password:" type="password" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match.';
  }

  return errors;
}

const ReduxForm = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
})(Signup);

const mapStateToProps = (state) => ({
  errors: getFormSyncErrors('signup')(state),
  errorMessage: state.auth.error,
});

export default connect(mapStateToProps, actions)(ReduxForm);
