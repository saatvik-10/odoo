import {
  Coupon,
  CreateCoupon,
  UpdateCoupon,
} from '@/validators/coupon.validator';
import { Axios } from 'axios';

export class CouponAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async createCoupon(data: CreateCoupon) {
    const { data: res } = await this.axios.post('/', data);
    return res;
  }

  async getCoupons() {
    const { data: res } = await this.axios.get('/');
    return res;
  }

  async getCouponByID(code: string) {
    const { data: res } = await this.axios.get(`/code/${code}`);
    return res;
  }

  async getCouponByCode(couponCode: string) {
    const { data: res } = await this.axios.get(`/code/${couponCode}`);
    return res;
  }
}
