import Cookies from 'js-cookie';

/**
 * Cookie utility functions for secure token management using js-cookie
 */

const COOKIE_OPTIONS = {
  expires: 7, 
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export const authCookies = {
  setToken: (token: string): void => {
    Cookies.set('auth_token', token, COOKIE_OPTIONS);
  },
  
  getToken: (): string | undefined => {
    return Cookies.get('auth_token');
  },
  
  setProvider: (provider: string): void => {
    Cookies.set('auth_provider', provider, COOKIE_OPTIONS);
  },
  
  getProvider: (): string | undefined => {
    return Cookies.get('auth_provider');
  },
  
  clear: (): void => {
    Cookies.remove('auth_token', { path: '/' });
    Cookies.remove('auth_provider', { path: '/' });
  },
  
  isAuthenticated: (): boolean => {
    return !!Cookies.get('auth_token');
  }
};

export const cookieUtils = {
  set: Cookies.set,
  get: Cookies.get,
  remove: Cookies.remove,
};
