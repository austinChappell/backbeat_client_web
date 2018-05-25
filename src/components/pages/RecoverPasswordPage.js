import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthAPI from '../../api/auth';
import Helpers from '../../assets/helpers';

const authAPI = new AuthAPI();
const helpers = new Helpers();

const { changePassword } = authAPI;
const { splitQueryParams } = helpers;

class RecoverPasswordPage extends Component {
  constructor(props) {
    super(props);

    // remove the question mark and only show the actual params
    const queryParams = props.location.search.split('?')[1];
    const { id, token } = splitQueryParams(queryParams);

    this.state = {
      confirmPassword: '',
      id,
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
    console.log('RESULTS', results);
  }

  submit = () => {
    console.log('SUBMIT');
    const {
      id,
      password,
      token,
    } = this.state;

    changePassword(id, password, token, this.handleRes);
  }

  render() {
    const { id, token } = this.state;

    if (!id || !token) {
      return <Redirect to="/" />;
    }

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
              value={this.state.password}
            />
          </div>
          <div>
            <label>Confirm Password</label>
          </div>
          <div>
            <input
              onChange={evt => this.handleChange(evt, 'confirmPassword')}
              type="password"
              value={this.state.confirmPassword}
            />
          </div>
          <div>
            <button
              onClick={this.submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverPasswordPage;
