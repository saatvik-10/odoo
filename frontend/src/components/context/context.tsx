'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import api from '../../lib/api';
import { Vendor } from '../../validators/vendor.validator';
import { User } from '../../validators/user.validator';
import { admin } from '../../validators/admin.validator';

type UserRole = 'admin' | 'vendor' | 'user';

interface AuthContextType {
  authenticated: boolean;
  checkAuth: () => Promise<void>;
  user: User | Vendor | admin | null;
  role: UserRole | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  user: null,
  role: null,
  checkAuth: async () => {},
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};

export const useIsAdmin = (): boolean => {
  const { role } = useAuth();
  return role === 'admin';
};

export const useIsVendor = (): boolean => {
  const { role } = useAuth();
  return role === 'vendor';
};

export const useIsUser = (): boolean => {
  const { role } = useAuth();
  return role === 'user';
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | Vendor | admin | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      const authToken = Cookies.get('token');
      const userRole = Cookies.get('role') as UserRole;

      console.log(authToken, 'token', userRole, 'role');
      console.log(authToken)

      if (authToken && userRole) {
        let userData = null;

        switch (userRole) {
          case 'admin':
            userData = await api.admin.getMe();
            break;
          case 'vendor':
            userData = await api.vendor.getMe();
            break;
          case 'user':
            userData = await api.user.getMe();
            break;
          default:
            throw new Error('Invalid role');
        }

        setUser(userData);
        setRole(userRole);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setUser(null);
        setRole(null);
      }
    } catch (err) {
      console.log('Authentication Failed', err);
      setAuthenticated(false);
      setUser(null);
      setRole(null);
      Cookies.remove('token');
      Cookies.remove('role');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, checkAuth, user, role, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
