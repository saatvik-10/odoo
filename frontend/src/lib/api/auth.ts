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

export class AuthAPI {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async loginUser(data: LoginUserValidator) {
    const { data: res } = await this.axios.post('/login', data);
    return res;
  }

  async registerUser(data: RegisterUserValidator) {
    const { data: res } = await this.axios.post('/register', data);
    return res;
  }

  async registerAdmin(data: RegisterAdminValidator) {
    const { data: res } = await this.axios.post('/auth/admin/register', data);
    return res;
  }

  async loginVendor(data: LoginVendorValidator) {
    const { data: res } = await this.axios.post('/vendor/login', data);
    return res;
  }

  async registerVendor(data: RegisterVendorValidator) {
    const { data: res } = await this.axios.post('/vendor/register', data);
    return res;
  }
}
