'use client';

import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import { STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
// import { setSession, isValidToken } from './utils';

import { setSession } from './utils';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      // if (accessToken && isValidToken(accessToken)) {
      if (accessToken) {
        setSession(accessToken);
        // router.replace('https://localhost:3032/dashboard');
        // const res = await axios.get(endpoints.auth.me);

        // const res = await axios.get(endpoints.auth.me);
        // const { user } = res.data;
        const { user } = {
          id: '8864c717-587d-472a-929a-8e5f298024da-0',
          displayName: 'طلال البراك',
          about:
            'خبرة 10 سنوات في ادارة المشاريع.',
          address: 'الرياض المملكة العربية السعودية',
          city: 'الرياض',
          country: 'المملكة العربية السعودية',
          email: 'demo@minimals.cc',
          isPublic: true,
          password: '@demo1',
          phoneNumber: '+1124456654874',
          photoURL: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-25.webp',
          role: 'admin',
          state: 'الرياض',
          zipCode: '94116',
        };
        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? 'admin',
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
