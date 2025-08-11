import {
  CreateTransfer,
  UpdateTransfer,
  Transfer,
} from '@/validators/transfer.validator';
import { Axios } from 'axios';

export class TransfersAPI {
  axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getTransferByRentalID(rentalId: string): Promise<Transfer[]> {
    const { data: res } = await this.axios.get(`/transfer/rental/${rentalId}`);
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

  async getTransferByUserID(userId: string): Promise<Transfer[]> {
    const { data: res } = await this.axios.get(`/transfer/user/${userId}`);
    return res;
  }

  async getTransferByVendorID(vendorId: string): Promise<Transfer[]> {
    const { data: res } = await this.axios.get(`/transfer/vendor/${vendorId}`);
    return res;
  }

  async updateTransferByID(
    transferId: string,
    data: UpdateTransfer
  ): Promise<UpdateTransfer> {
    const { data: res } = await this.axios.put(`/transfer/${transferId}`, data);
    return res;
  }

  async updateTransferStatus(transferId: string): Promise<void> {
    await this.axios.patch(`/transfer/${transferId}/status`);
  }
}
