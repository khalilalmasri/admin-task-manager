// import { paths } from 'src/routes/paths';

// import axios from 'src/utils/axios';

// import { STORAGE_KEY } from './constant';

// // ----------------------------------------------------------------------
// // function jwtDecode(token) {
// //   const base64Url = token.split('.')[1];
// //   const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
// //   const jsonPayload = decodeURIComponent(
// //     window
// //       .atob(base64)
// //       .split('')
// //       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
// //       .join('')
// //   );

// //   return JSON.parse(jsonPayload);
// // }

// export function jwtDecode(token) {
//   try {
//     if (!token) return null;

//     const parts = token.split('.');
//     if (parts.length < 1) {
//       throw new Error('Invalid token!');
//     }

//     const base64Url = parts[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const decoded = JSON.parse(atob(base64));

//     return decoded;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------------------

// export function isValidToken(accessToken) {
//   if (!accessToken) {
//     return false;
//   }

//   try {
//     const decoded = jwtDecode(accessToken);

//     if (!decoded || !('exp' in decoded)) {
//       return false;
//     }

//     const currentTime = Date.now() / 1000;

//     return decoded.exp > currentTime;
//   } catch (error) {
//     console.error('Error during token validation:', error);
//     return false;
//   }
// }

// // ----------------------------------------------------------------------

// export function tokenExpired(exp) {
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;

//   setTimeout(() => {
//     try {
//       alert('Token expired!');
//       sessionStorage.removeItem(STORAGE_KEY);
//       window.location.href = paths.auth.jwt.signIn;
//     } catch (error) {
//       console.error('Error during token expiration:', error);
//       throw error;
//     }
//   }, timeLeft);
// }

// // ----------------------------------------------------------------------

// export async function setSession(accessToken) {
//   try {
//     if (accessToken) {
//       sessionStorage.setItem(STORAGE_KEY, accessToken);

//       axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//       const decodedToken = jwtDecode(accessToken); // ~3 days by minimals server

//       if (decodedToken && 'exp' in decodedToken) {
//         tokenExpired(decodedToken.exp);
//       } else {
//         throw new Error('Invalid access token!');
//       }
//     } else {
//       sessionStorage.removeItem(STORAGE_KEY);
//       delete axios.defaults.headers.common.Authorization;
//     }
//   } catch (error) {
//     console.error('Error during set session:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------------------

import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';

import { STORAGE_KEY } from './constant';

export function isValidSession(token) {
  return !!token;
}

export function refreshSession() {
  setTimeout(
    async () => {
      try {
        await axios.get('/api/refresh'); // استبدل هذا بنقطة النهاية الصحيحة للتحديث
      } catch (error) {
        console.error('Error refreshing session:', error);
        sessionStorage.removeItem(STORAGE_KEY);
        window.location.href = paths.auth.login;
      }
    },
    300 * 60 * 1000
  ); // تحديث كل 15 دقيقة، يمكنك تعديل هذه القيمة
}

export async function setSession(token) {
  try {
    console.log('async function setSession(token)', token);
    if (token) {
      sessionStorage.setItem(STORAGE_KEY, token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      refreshSession();
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
