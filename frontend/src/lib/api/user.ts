import {
  CreateAddress,
  Address,
  UpdateAddress,
} from '@/validators/address.validator';
import { Axios } from 'axios';

export class UserAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getMe() {
    const { data: res } = await this.axios.get('/me');
    return res;
  }

  async getUserById(id: string) {
    const { data: res } = await this.axios.get(`/${id}`);
    return res;
  }

  async createAddress(data: CreateAddress) {
    const { data: res } = await this.axios.post('/address', data);
    return res;
  }

  async updateAddress(id: string, data: UpdateAddress) {
    const { data: res } = await this.axios.put(`/address/${id}`, data);
    return res;
  }

  async getAddresses() {
    const { data: res } = await this.axios.get('/address');
    return res;
  }
}
