import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class JoblyApi {
  static async request(endpoint, params = {}, verb = 'get') {
    // for now, hardcode a token for user "testuser"
    let _token = localStorage.getItem('token');

    console.debug('API Call:', endpoint, params, verb);

    let q;

    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params }
      });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === 'patch') {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(search = '') {
    let res = await this.request(`companies?search=${search}`);
    return res.companies;
  }

  static async getJobs(search = '') {
    let res = await this.request(`jobs?search=${search}`);
    return res.jobs;
  }

  static async apply(id) {
    let res = await this.request(
      `jobs/${id}/apply`,
      { state: 'applied' },
      'post'
    );
    return res.message;
  }

  static async signUp(userData) {
    let res = await this.request('users', userData, 'post');
    return res.token;
  }

  static async login(loginData) {
    let res = await this.request('login', loginData, 'post');
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(userData, username) {
    let res = await this.request(`users/${username}`, userData, 'patch');
    return res.user;
  }
}

export default JoblyApi;
