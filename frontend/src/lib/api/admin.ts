import { RegisterAdminValidator, admin } from '@/validators/admin.validator';
import { Axios } from 'axios';

export class AdminAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getMe() {
    const { data: res } = await this.axios.get('/me');
    return res;
  }
}
