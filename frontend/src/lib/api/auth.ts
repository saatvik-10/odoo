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

export class Auth {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async LoginUser(data: LoginUserValidator) {
    const { data: res } = await this.axios.post('/login', data);
    return res;
  }

  async RegisterUser(data: RegisterUserValidator) {
    const { data: res } = await this.axios.post('/register', data);
    return res;
  }

  async RegisterAdmin(data: RegisterAdminValidator) {
    const { data: res } = await this.axios.post('/auth/admin/register', data);
    return res;
  }

  async LoginVendor(data: LoginVendorValidator) {
    const { data: res } = await this.axios.post('/vendor/login', data);
    return res;
  }

  async RegisterVendor(data: RegisterVendorValidator) {
    const { data: res } = await this.axios.post('/vendor/register', data);
    return res;
  }
}
