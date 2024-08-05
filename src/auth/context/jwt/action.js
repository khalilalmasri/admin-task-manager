'use client';

import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY  } from './constant';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);
    // const res = await axios.post('https://todo.int-vision.com/api/login', params);

    // const { accessToken } = res.data;
    const { accessToken } = res.data.data;
    const { user } = res.data.data;
    console.log('1111111111111111111111', res.data.data);
    console.log('22222222accestoken222222222', accessToken);
    console.log('22222222user222222222', user);
    // console.log ('333333333', token.parts.length);
    // if (!accessToken) {
    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    // setSession(accessToken);
    setSession(accessToken, user);
    // setSession(user);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName }) => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
