import {
  RegisterVendorValidator,
  LoginVendorValidator,
} from '@/validators/vendor.validator';
import { Axios } from 'axios';

export class VendorAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getMe() {
    const { data: res } = await this.axios.get('/me');
    return res;
  }

  async getVendorById(id: string) {
    const { data: res } = await this.axios.get(`/${id}`);
    return res;
  }
}
