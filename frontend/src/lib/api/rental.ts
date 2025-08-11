import {
  Rental,
  RentalStatus,
  CreateRental,
} from '@/validators/rental.validator';
import { Axios } from 'axios';

export class RentalAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async createRental(data: CreateRental) {
    const { data: res } = await this.axios.post('/', data);
    return res;
  }

  async getRentalsForUser() {
    const { data: res } = await this.axios.get('/');
    return res;
  }

  async getRentalByID(id: string) {
    const { data: res } = await this.axios.get(`/${id}`);
    return res;
  }

  async getRentalsByVendorId(id: string) {
    const { data: res } = await this.axios.get(`/vendor/${id}`);
    return res;
  }

  async updateRentalStatus(id: string, data: Partial<Rental>) {
    const { data: res } = await this.axios.patch(`/status/${id}`, data);
    return res;
  }

  async cancelRental(id: string) {
    const { data: res } = await this.axios.delete(`/status/${id}`, {
      data: { status: 'cancelled' },
    });
    return res;
  }

  async deleteRental(id: string) {
    const { data: res } = await this.axios.delete(`/${id}`);
    return res;
  }
}
