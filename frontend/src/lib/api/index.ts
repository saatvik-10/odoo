import axios, { Axios } from 'axios';
import { AuthAPI } from './auth';
import { RentalAPI } from './rental';
import { UserAPI } from './user';
import { ProductsAPI } from './products';
import { CouponAPI } from './coupon';
import { TransfersAPI } from './transfer';
import { VendorAPI } from './vendor';
import { AdminAPI } from './admin';
import Cookies from 'js-cookie';

class ApiSdk {
  private readonly _axios: Axios;
  auth: AuthAPI;
  rental: RentalAPI;
  user: UserAPI;
  product: ProductsAPI;
  coupon: CouponAPI;
  transfer: TransfersAPI;
  vendor: VendorAPI;
  admin: AdminAPI;

  constructor() {
    this._axios = this.createAxios();
    this.auth = new AuthAPI(this._axios);
    this.rental = new RentalAPI(this._axios);
    this.user = new UserAPI(this._axios);
    this.product = new ProductsAPI(this._axios);
    this.coupon = new CouponAPI(this._axios);
    this.transfer = new TransfersAPI(this._axios);
    this.vendor = new VendorAPI(this._axios);
    this.admin = new AdminAPI(this._axios);
  }

  private createAxios(): Axios {
    const ax = axios.create();
    ax.interceptors.request.use(async (config) => {
      let token = '';
      if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        token = cookieStore.get('token')?.value || '';
      } else {
        token = Cookies.get('token') || '';
      }
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      config.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      console.log('API Request:', config.method?.toUpperCase(), config.url, 'Token:', token ? 'Present' : 'Missing');

      return config;
    });
    return ax;
  }
  getAxios() {
    return this._axios;
  }
}

const api = new ApiSdk();
export default api;
