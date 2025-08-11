import {
  CreateTransfer,
  // UpdateTransfer,
  Transfer,
} from '@/validators/transfer.validator';
import { Axios } from 'axios';

export class Transfers {
  axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getTransfers(): Promise<Transfer[]> {
    const { data: res } = await this.axios.get('/transfers');
    return res;
  }

  async getTransferById(transferId: string): Promise<Transfer> {
    const { data: res } = await this.axios.get(`/transfer/${transferId}`);
    return res;
  }

  async createTransfer(data: CreateTransfer): Promise<Transfer> {
    const { data: res } = await this.axios.post('/transfer', data);
    return res;
  }

  // async updateTransfer(transferId: string, data: UpdateTransfer): Promise<Transfer> {
  //   const { data: res } = await this.axios.put(`/transfer/${transferId}`, data);
  //   return res;
  // }

  async deleteTransfer(transferId: string): Promise<void> {
    await this.axios.delete(`/transfer/${transferId}`);
  }
}
