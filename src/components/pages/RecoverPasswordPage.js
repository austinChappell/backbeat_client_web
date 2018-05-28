import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthAPI from '../../api/auth';
import Helpers from '../../assets/helpers';
import ErrorMessage from '../shared/ErrorMessage';
import SuccessMessage from '../shared/SuccessMessage';
import Button from '../shared/Button';

const authAPI = new AuthAPI();
const helpers = new Helpers();

const { changePassword } = authAPI;
const { splitQueryParams } = helpers;

class RecoverPasswordPage extends Component {
  constructor(props) {
    super(props);

    // remove the question mark and only show the actual params
    const queryParams = props.location.search.split('?')[1];
    const { id, token } = queryParams ? splitQueryParams(queryParams) : {};

    this.state = {
      confirmPassword: '',
      error: null,
      id,
      loading: false,
      success: false,
      token,
      password: '',
    };
  }

  handleChange = (evt, key) => {
    const o = {};
    o[key] = evt.target.value;
    this.setState(o);
  }

  handleRes = (results) => {
    const { error } = results;
    if (error) {
      this.setState({
        error,
        loading: false,
      });
    } else {
      this.setState({
        confirmPassword: '',
        loading: false,
        password: '',
        success: true,
      });
    }
  }

  submit = () => {
    const {
      id,
      password,
      token,
    } = this.state;

    this.setState({
      error: null,
      loading: true,
      success: false,
    }, () => {
      changePassword(id, password, token, this.handleRes);
    });
  }

  render() {
    const {
      confirmPassword,
      error,
      id,
      loading,
      password,
      success,
      token,
    } = this.state;

    if (!id || !token) {
      return <Redirect to="/" />;
    }

    const errorMessage = error ?
      (
        <ErrorMessage
          message={error}
        />
      ) : null;

    const successMessage = success ?
      (
        <SuccessMessage
          message="Password updated. Please open the app to login."
        />
      ) : null;

    return (
      <div className="RecoverPasswordPage">
        <div>
          <div>
            <label>Password</label>
          </div>
          <div>
            <input
              onChange={evt => this.handleChange(evt, 'password')}
              type="password"
              value={password}
            />
          </div>
          <div>
            <label>Confirm Password</label>
          </div>
          <div>
            <input
              onChange={evt => this.handleChange(evt, 'confirmPassword')}
              type="password"
              value={confirmPassword}
            />
          </div>
          <div>
            <Button
              disabled={password !== confirmPassword || password.trim().length < 5}
              loading={loading}
              onClick={this.submit}
              title="Submit"
            />
          </div>
          {errorMessage || successMessage}
        </div>
      </div>
    );
  }
}

export default RecoverPasswordPage;
