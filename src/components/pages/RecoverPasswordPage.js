import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Helpers from '../../assets/helpers';

const helpers = new Helpers();

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

  submit = () => {
    console.log('SUBMIT');
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
