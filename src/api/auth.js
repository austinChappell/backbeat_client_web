import { post } from './main';
import data from '../assets/data';

const api = data.apiURL;

class AuthAPI {
  checkFBToken = (user, cb) => {
    return fetch(`${api}/fblogin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        cb(results);
      })
      .catch((err) => {
        console.error('CHECK FB TOKEN ERROR', err);
      });
  };

  createUser = (user, cb, cbError) => {
    return fetch(`${api}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        cb(results);
      })
      .catch(err => cbError('An account with this email already exists.', false));
  };

  changePassword = (id, password, token, cb) => {
    const body = {
      id,
      password,
      token,
    };
    const url = `${api}/change_password`;

    return post(url, token, body, cb)
  };

  registerFB = (user, cb) => fetch(`${api}/signup_fb`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      cb(results);
    })
    .catch((err) => {
      console.error('REGISTER ROUTE ERROR', err);
    });

  validateZip = (zipCode, cb) => {
    const client = new XMLHttpRequest();
    client.open('GET', `http://api.zippopotam.us/us/${zipCode}`, true);
    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        cb(client.responseText);
      }
    };

    client.send();
  };
}

export default AuthAPI;
