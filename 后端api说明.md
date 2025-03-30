# 后端接口需求文档

## 目录
1. [用户认证相关接口](#用户认证相关接口)
2. [微信小程序接口](#微信小程序接口)
3. [简历相关接口](#简历相关接口)
4. [通用接口规范](#通用接口规范)

## 用户认证相关接口

### 1. 发送验证码
**接口地址**：`/api/auth/code`  
**请求方式**：POST  
**请求参数**：
```json
{
  "phone": "13812345678"  // 手机号
}
```

**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "expireTime": 300  // 验证码有效期（秒）
  }
}
```

### 2. 手机号登录/注册
**接口地址**：`/api/auth/login`  
**请求方式**：POST  
**请求参数**：
```json
{
  "phone": "13812345678",  // 手机号
  "code": "123456",        // 验证码
  "agreed": true          // 是否同意用户协议和隐私政策
}
```

**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhb...",           // JWT token
    "userInfo": {
      "id": "12345",               // 用户ID
      "phone": "13812345678",      // 手机号
      "nickname": "用户昵称",       // 昵称
      "avatar": "https://...",     // 头像URL
      "hasResume": false           // 是否已创建简历
    }
  }
}
```

### 3. 获取用户信息
**接口地址**：`/api/user/info`  
**请求方式**：GET  
**请求头**：需要携带 token  
**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "12345",               // 用户ID
    "phone": "13812345678",      // 手机号
    "nickname": "用户昵称",       // 昵称
    "avatar": "https://...",     // 头像URL
    "hasResume": false           // 是否已创建简历
  }
}
```

## 微信小程序接口

### 1. 微信登录
**接口地址**：`/api/wx/login`  
**请求方式**：POST  
**请求参数**：
```json
{
  "code": "abc123",           // 微信登录code
  "userInfo": {              // 微信用户信息
    "nickName": "用户昵称",
    "avatarUrl": "https://...",
    "gender": 1,
    "country": "China",
    "province": "Guangdong",
    "city": "Shenzhen"
  }
}
```

**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhb...",           // JWT token
    "userInfo": {
      "id": "12345",               // 用户ID
      "phone": "13812345678",      // 手机号（如果已绑定）
      "nickname": "用户昵称",       // 昵称
      "avatar": "https://...",     // 头像URL
      "hasResume": false           // 是否已创建简历
    }
  }
}
```

### 2. 获取手机号
**接口地址**：`/api/wx/phone`  
**请求方式**：POST  
**请求头**：需要携带 token  
**请求参数**：
```json
{
  "code": "abc123"  // 手机号获取凭证
}
```

**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "phone": "13812345678"  // 解密后的手机号
  }
}
```

## 简历相关接口

### 1. 获取简历信息
**接口地址**：`/api/resume/info`  
**请求方式**：GET  
**请求头**：需要携带 token  
**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "12345",                // 简历ID
    "name": "张三",               // 姓名
    "phone": "13812345678",       // 手机号
    "email": "example@mail.com",  // 邮箱
    "education": {                // 教育经历
      "school": "XX大学",
      "major": "计算机科学",
      "degree": "本科",
      "graduationYear": 2024
    },
    "workExperience": [          // 工作经历
      {
        "company": "XX公司",
        "position": "前端开发",
        "startDate": "2020-01",
        "endDate": "2022-12",
        "description": "工作描述..."
      }
    ],
    "skills": ["JavaScript", "Vue", "小程序开发"],  // 技能标签
    "attachments": [             // 附件列表
      {
        "id": "file123",
        "name": "个人简历.pdf",
        "url": "https://..."
      }
    ],
    "updateTime": "2024-03-30 12:00:00"  // 最后更新时间
  }
}
```

### 2. 更新简历
**接口地址**：`/api/resume/update`  
**请求方式**：POST  
**请求头**：需要携带 token  
**请求参数**：
```json
{
  "name": "张三",               // 姓名
  "phone": "13812345678",       // 手机号
  "email": "example@mail.com",  // 邮箱
  "education": {                // 教育经历
    "school": "XX大学",
    "major": "计算机科学",
    "degree": "本科",
    "graduationYear": 2024
  },
  "workExperience": [          // 工作经历
    {
      "company": "XX公司",
      "position": "前端开发",
      "startDate": "2020-01",
      "endDate": "2022-12",
      "description": "工作描述..."
    }
  ],
  "skills": ["JavaScript", "Vue", "小程序开发"]  // 技能标签
}
```

**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 返回更新后的完整简历信息，格式同"获取简历信息"接口
  }
}
```

### 3. 上传简历附件
**接口地址**：`/api/resume/upload`  
**请求方式**：POST  
**请求头**：需要携带 token  
**请求格式**：multipart/form-data  
**请求参数**：
- file: 文件对象（支持格式：pdf、doc、docx）

**响应参数**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "file123",
    "name": "个人简历.pdf",
    "url": "https://...",
    "uploadTime": "2024-03-30 12:00:00"
  }
}
```

## 通用接口规范

### 1. 请求规范
- 所有请求都应该使用 HTTPS
- API 版本号通过 URL 路径区分，当前版本为 v1
- 请求头中的 token 格式：`Authorization: Bearer <token>`

### 2. 响应规范
所有接口响应格式统一为：
```json
{
  "code": 200,           // 状态码：200成功，其他表示失败
  "message": "success",  // 状态描述
  "data": {             // 响应数据
    // 具体数据字段
  }
}
```

### 3. 错误码说明
- 200: 成功
- 400: 请求参数错误
- 401: 未登录或 token 失效
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

### 4. 安全要求
1. 所有接口必须使用 HTTPS
2. 用户密码等敏感信息传输时必须加密
3. 防止 SQL 注入和 XSS 攻击
4. 实现接口访问频率限制
5. 敏感操作需要验证码或短信验证

### 5. 性能要求
1. 接口响应时间不超过 1 秒
2. 文件上传大小限制：10MB
3. 图片上传格式限制：jpg、png、gif
4. 文档上传格式限制：pdf、doc、docx
5. 需要支持并发请求处理
