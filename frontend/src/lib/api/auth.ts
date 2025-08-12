import { RegisterAdminValidator } from '@/validators/admin.validator';
import {
  RegisterUserValidator,
  LoginUserValidator,
} from '@/validators/user.validator';
import {
  RegisterVendorValidator,
  LoginVendorValidator,
} from '@/validators/vendor.validator';
import { Axios } from 'axios';
import Cookies from 'js-cookie';

const cookieOpts = {
  expires: 5, // days
  sameSite: 'lax' as const,
  path: '/',
};

export class AuthAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async loginUser(data: LoginUserValidator) {
    const { data: res } = await this.axios.post('/auth/login', data);
    if (res?.token) {
      Cookies.set('token', res.token, cookieOpts);
    }
    if (res?.role) {
      Cookies.set('role', res.role, cookieOpts);
    } else {
      Cookies.set('role', 'user', cookieOpts);
    }
    return res;
  }

  async registerUser(data: RegisterUserValidator) {
    const { data: res } = await this.axios.post('/auth/register', data);
    if (res?.token) {
      Cookies.set('token', res.token, cookieOpts);
    }
    Cookies.set('role', 'user', cookieOpts);
    return res;
  }

  async registerAdmin(data: RegisterAdminValidator) {
    const { data: res } = await this.axios.post('/auth/admin/register', data);
    if (res?.token) {
      Cookies.set('token', res.token, cookieOpts);
    }
    Cookies.set('role', 'admin', cookieOpts);
    return res;
  }

  async loginVendor(data: LoginVendorValidator) {
    const { data: res } = await this.axios.post('/auth/vendor/login', data);
    if (res?.token) {
      Cookies.set('token', res.token, cookieOpts);
    }
    Cookies.set('role', 'vendor', cookieOpts);
    return res;
  }

  async registerVendor(data: RegisterVendorValidator) {
    const { data: res } = await this.axios.post('/auth/vendor/register', data);
    if (res?.token) {
      Cookies.set('token', res.token, cookieOpts);
    }
    Cookies.set('role', 'vendor', cookieOpts);
    return res;
  }
}
