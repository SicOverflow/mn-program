import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../utils/api';

export const useResumeStore = defineStore('resume', () => {
  const resumeInfo = ref(null);

  // 获取简历信息
  const getResume = async () => {
    try {
      const res = await api.resume.getResume();
      resumeInfo.value = res.data;
      return res.data;
    } catch (error) {
      console.error('获取简历信息失败:', error);
      return null;
    }
  };

  // 更新简历
  const updateResume = async (data) => {
    try {
      const res = await api.resume.updateResume(data);
      resumeInfo.value = res.data;
      return true;
    } catch (error) {
      console.error('更新简历失败:', error);
      return false;
    }
  };

  // 上传简历附件
  const uploadResumeFile = async (filePath) => {
    try {
      const res = await api.resume.uploadFile(filePath);
      if (resumeInfo.value) {
        resumeInfo.value.attachments = [
          ...(resumeInfo.value.attachments || []),
          res.data
        ];
      }
      return res.data;
    } catch (error) {
      console.error('上传简历文件失败:', error);
      return null;
    }
  };

  return {
    resumeInfo,
    getResume,
    updateResume,
    uploadResumeFile
  };
});