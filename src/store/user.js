import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api, setToken, clearToken } from '../utils/api';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null);
  const isLoggedIn = ref(false);

  // 发送验证码
  const sendVerificationCode = async (phone) => {
    try {
      const res = await api.user.sendCode(phone);
      return true;
    } catch (error) {
      console.error('发送验证码失败:', error);
      return false;
    }
  };

  // 手机号登录
  const phoneLogin = async (phone, code, agreed) => {
    try {
      const res = await api.user.phoneLogin(phone, code, agreed);
      setToken(res.data.token);
      userInfo.value = res.data.userInfo;
      isLoggedIn.value = true;
      return true;
    } catch (error) {
      console.error('登录失败:', error);
      return false;
    }
  };

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const res = await api.user.getUserInfo();
      userInfo.value = res.data;
      isLoggedIn.value = true;
      return res.data;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return null;
    }
  };

  // 获取手机号
  const getPhoneNumber = async (code) => {
    try {
      const res = await api.user.getPhoneNumber(code);
      return res.data.phone;
    } catch (error) {
      console.error('获取手机号失败:', error);
      return null;
    }
  };

  // 退出登录
  const logout = () => {
    userInfo.value = null;
    isLoggedIn.value = false;
    clearToken();
  };

  return {
    userInfo,
    isLoggedIn,
    sendVerificationCode,
    phoneLogin,
    getUserInfo,
    getPhoneNumber,
    logout
  };
});