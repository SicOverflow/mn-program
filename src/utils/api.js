import { ref } from 'vue';

// 基础配置
const BASE_URL = 'http://your-api-domain.com/api'; // 需要替换为实际的后端API地址
const TOKEN_KEY = 'user_token';

// 获取存储的token
const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY);
};

// 设置token
const setToken = (token) => {
  uni.setStorageSync(TOKEN_KEY, token);
};

// 清除token
const clearToken = () => {
  uni.removeStorageSync(TOKEN_KEY);
};

// 请求封装
const request = async (options) => {
  const token = getToken();
  
  const defaultOptions = {
    url: `${BASE_URL}${options.url}`,
    header: {
      'Content-Type': 'application/json',
      ...options.header,
    },
    method: options.method || 'GET',
    data: options.data,
  };

  // 如果有token，添加到header
  if (token) {
    defaultOptions.header.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await uni.request(defaultOptions);
    const { statusCode, data } = response;

    if (statusCode === 200) {
      if (data.code === 200) {
        return data;
      } else {
        throw new Error(data.message || '请求失败');
      }
    } else if (statusCode === 401) {
      // token过期或无效
      clearToken();
      uni.navigateTo({ url: '/pages/login/index' });
      throw new Error('登录已过期，请重新登录');
    } else {
      throw new Error('网络请求失败');
    }
  } catch (error) {
    uni.showToast({
      title: error.message,
      icon: 'none'
    });
    throw error;
  }
};

// API接口封装
export const api = {
  // 用户相关接口
  user: {
    // 发送验证码
    sendCode: (phone) => request({
      url: '/auth/code',
      method: 'POST',
      data: { phone }
    }),

    // 手机号登录
    phoneLogin: (phone, code, agreed) => request({
      url: '/auth/login',
      method: 'POST',
      data: { phone, code, agreed }
    }),

    // 获取用户信息
    getUserInfo: () => request({
      url: '/user/info',
      method: 'GET'
    }),

    // 获取手机号
    getPhoneNumber: (code) => request({
      url: '/wx/phone',
      method: 'POST',
      data: { code }
    })
  },

  // 简历相关接口
  resume: {
    // 获取简历信息
    getResume: () => request({
      url: '/resume/info',
      method: 'GET'
    }),

    // 更新简历
    updateResume: (data) => request({
      url: '/resume/update',
      method: 'POST',
      data
    }),

    // 上传文件
    uploadFile: (filePath) => {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: `${BASE_URL}/resume/upload`,
          filePath,
          name: 'file',
          header: {
            Authorization: `Bearer ${getToken()}`
          },
          success: (res) => {
            if (res.statusCode === 200) {
              const data = JSON.parse(res.data);
              if (data.code === 200) {
                resolve(data);
              } else {
                reject(new Error(data.message));
              }
            } else {
              reject(new Error('上传失败'));
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    }
  }
};

export { getToken, setToken, clearToken };