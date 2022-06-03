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

  contactUs = async data => {
    try {
      return http.post('/contactUs', data);
    } catch (e) {
      console.log(e);
    }
  };

  sendCode = async data => {
    try {
      return http.post('/user/send-code', data);
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

  changePassword = async data => {
    try {
      return http.put('/user/change-password', data);
    } catch (e) {
      console.log(e);
    }
  };

  updatePassword = async data => {
    try {
      let token = await getToken();

      return http.put('/user/updatePassword', data, {
        headers: {
          Authorization: token,
        },
      });
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

  getUserHistory = async () => {
    try {
      let token = await getToken();

      return http.get('/user/history', {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  deleteUserHistoryItem = async id => {
    try {
      let token = await getToken();

      return http.post('/user/deleteHistoryItem', id, {
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

  getServiceSellerFeedBacks = async id => {
    try {
      return http.get(`/user/getServiceSellerFeedBacks/${id}`);
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
