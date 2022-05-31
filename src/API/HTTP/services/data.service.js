import http from '../http-common';
import {getToken} from '../../../asyncStorage/token';

class DataService {
  login = async data => {
    try {
      return http.post('/auth', data);
    } catch (e) {
      console.log(e);
    }
  };

  logout = async () => {
    try {
      let token = await getToken();

      return http.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  register = async data => {
    try {
      return http.post('/user', data);
    } catch (e) {
      console.log(e);
    }
  };

  getUserData = async () => {
    try {
      let token = await getToken();

      return http.get('/user', {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCategories = async () => {
    try {
      return http.get('/categories');
    } catch (e) {
      console.log(e);
    }
  };

  subscribe = async () => {
    try {
      let token = await getToken();

      return http.get('/feed/user/getOffers', {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export default new DataService();
