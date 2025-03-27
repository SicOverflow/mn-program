# 后端接口需求文档

本文档详细描述了微信小程序前端项目所需的所有后端接口。

## 目录

1. [用户认证相关接口](#用户认证相关接口)
2. [简历相关接口](#简历相关接口)
3. [商品相关接口](#商品相关接口)
4. [消息相关接口](#消息相关接口)
5. [其他功能接口](#其他功能接口)

## 用户认证相关接口

### 1. 发送验证码

**接口地址**：`/api/auth/sendVerificationCode`

**请求方式**：POST

**请求参数**：

```json
{
  "phone": "13800138000" // 手机号码
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "验证码发送成功",
  "data": {
    "expireTime": 300 // 验证码有效期（秒）
  }
}
```

### 2. 登录/注册

**接口地址**：`/api/auth/login`

**请求方式**：POST

**请求参数**：

```json
{
  "phone": "13800138000", // 手机号码
  "code": "123456", // 验证码
  "agreed": true // 是否同意用户协议
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // 用户令牌
    "userId": "12345", // 用户ID
    "isNewUser": false, // 是否新用户
    "userInfo": {
      "phone": "138****8000", // 脱敏手机号
      "nickname": "", // 昵称
      "avatar": "" // 头像URL
    }
  }
}
```

### 3. 获取用户信息

**接口地址**：`/api/user/info`

**请求方式**：GET

**请求头**：

```
Authorization: Bearer {token}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": "12345",
    "phone": "138****8000",
    "nickname": "用户昵称",
    "avatar": "https://example.com/avatar.jpg",
    "gender": "男",
    "hasResume": true, // 是否有简历
    "hasAttachmentResume": false // 是否有附件简历
  }
}
```

### 4. 退出登录

**接口地址**：`/api/auth/logout`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "退出成功",
  "data": null
}
```

## 简历相关接口

### 1. 上传头像

**接口地址**：`/api/resume/uploadAvatar`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**请求参数**：

```
file: [二进制文件]
```

**响应参数**：

```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "avatarUrl": "https://example.com/avatars/user_12345.jpg"
  }
}
```

### 2. 创建/更新简历

**接口地址**：`/api/resume/save`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```json
{
  "avatar": "https://example.com/avatars/user_12345.jpg",
  "name": "张三",
  "gender": "男",
  "birthYear": "1995",
  "education": "本科",
  "workExperience": "3-5年",
  "expectedPosition": "前端开发工程师",
  "expectedSalary": "15k-20k",
  "jobLocation": "北京"
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "简历保存成功",
  "data": {
    "resumeId": "67890"
  }
}
```

### 3. 获取简历信息

**接口地址**：`/api/resume/info`

**请求方式**：GET

**请求头**：

```
Authorization: Bearer {token}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "resumeId": "67890",
    "avatar": "https://example.com/avatars/user_12345.jpg",
    "name": "张三",
    "gender": "男",
    "birthYear": "1995",
    "education": "本科",
    "workExperience": "3-5年",
    "expectedPosition": "前端开发工程师",
    "expectedSalary": "15k-20k",
    "jobLocation": "北京",
    "createTime": "2023-05-20 14:30:00",
    "updateTime": "2023-05-21 10:15:00"
  }
}
```

### 4. 上传附件简历

**接口地址**：`/api/resume/uploadAttachment`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**请求参数**：

```
file: [二进制文件]
```

**响应参数**：

```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "attachmentUrl": "https://example.com/attachments/resume_67890.pdf",
    "fileName": "个人简历.pdf"
  }
}
```

## 商品相关接口

### 1. 获取商品分类列表

**接口地址**：`/api/product/categories`

**请求方式**：GET

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "pottery",
      "name": "陶艺与黏土类"
    },
    {
      "id": "fabric",
      "name": "布艺类"
    },
    {
      "id": "bamboo",
      "name": "木竹藤艺类"
    },
    {
      "id": "paper",
      "name": "纸艺类"
    },
    {
      "id": "other",
      "name": "其他类"
    }
  ]
}
```

### 2. 获取商品列表

**接口地址**：`/api/product/list`

**请求方式**：GET

**请求参数**：

```
category: pottery  // 商品分类ID，可选
page: 1            // 页码，默认1
pageSize: 10       // 每页数量，默认10
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "pages": 10,
    "currentPage": 1,
    "list": [
      {
        "id": 1,
        "name": "陶艺作品1",
        "price": 59.9,
        "sales": 25,
        "image": "https://example.com/images/products/pottery/1.jpg",
        "category": "pottery",
        "description": "精美陶艺作品，手工制作",
        "stock": 50
      },
      // 更多商品...
    ]
  }
}
```

### 3. 获取商品详情

**接口地址**：`/api/product/detail`

**请求方式**：GET

**请求参数**：

```
id: 1  // 商品ID
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "陶艺作品1",
    "price": 59.9,
    "originalPrice": 69.9,
    "sales": 25,
    "images": [
      "https://example.com/images/products/pottery/1_1.jpg",
      "https://example.com/images/products/pottery/1_2.jpg",
      "https://example.com/images/products/pottery/1_3.jpg"
    ],
    "category": "pottery",
    "description": "精美陶艺作品，手工制作，材质优良...",
    "specifications": [
      {
        "name": "尺寸",
        "value": "10cm x 15cm"
      },
      {
        "name": "材质",
        "value": "优质陶土"
      }
    ],
    "stock": 50,
    "createTime": "2023-05-01 10:00:00"
  }
}
```

### 4. 商品购买接口

**接口地址**：`/api/order/create`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```json
{
  "productId": 1,
  "quantity": 2,
  "addressId": 123
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "订单创建成功",
  "data": {
    "orderId": "202305270001",
    "totalAmount": 119.8,
    "paymentUrl": "https://example.com/payment/202305270001"
  }
}
```

## 消息相关接口

### 1. 获取消息列表

**接口地址**：`/api/message/list`

**请求方式**：GET

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```
type: system  // 消息类型：system(系统通知)、my(我的消息)、replies(回复我的)、likes(收到的赞)
page: 1       // 页码，默认1
pageSize: 20  // 每页数量，默认20
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 50,
    "pages": 3,
    "currentPage": 1,
    "unreadCount": 5,
    "list": [
      {
        "id": "msg001",
        "type": "system",
        "sender": "系统",
        "content": "您的简历已被查看10次",
        "time": "2023-05-26 14:30:00",
        "isRead": false
      },
      // 更多消息...
    ]
  }
}
```

### 2. 发送消息

**接口地址**：`/api/message/send`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```json
{
  "receiverId": "user002", // 接收者ID
  "content": "您好，我对您的简历很感兴趣，请问您方便聊一下吗？"
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "发送成功",
  "data": {
    "messageId": "msg123",
    "sendTime": "2023-05-27 15:45:00"
  }
}
```

### 3. 标记消息已读

**接口地址**：`/api/message/read`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```json
{
  "messageIds": ["msg001", "msg002"] // 消息ID数组
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "标记成功",
  "data": null
}
```

### 4. 获取未读消息数量

**接口地址**：`/api/message/unreadCount`

**请求方式**：GET

**请求头**：

```
Authorization: Bearer {token}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 8,
    "system": 2,
    "my": 1,
    "replies": 3,
    "likes": 2
  }
}
```

## 其他功能接口

### 1. 投递简历

**接口地址**：`/api/job/apply`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```json
{
  "jobId": "job001",
  "resumeId": "67890",
  "coverLetter": "我对贵公司的职位很感兴趣，希望能有机会加入贵公司..." // 可选
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "投递成功",
  "data": {
    "applicationId": "app001",
    "applyTime": "2023-05-27 16:00:00"
  }
}
```

### 2. 获取投递进度

**接口地址**：`/api/job/applicationProgress`

**请求方式**：GET

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```
page: 1       // 页码，默认1
pageSize: 10  // 每页数量，默认10
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 15,
    "pages": 2,
    "currentPage": 1,
    "list": [
      {
        "applicationId": "app001",
        "jobId": "job001",
        "jobTitle": "前端开发工程师",
        "companyName": "ABC科技有限公司",
        "applyTime": "2023-05-27 16:00:00",
        "status": "已查看", // 状态：已投递、已查看、面试邀请、不合适
        "statusTime": "2023-05-28 10:30:00",
        "feedback": "" // 反馈信息
      },
      // 更多投递记录...
    ]
  }
}
```

### 3. 意见反馈

**接口地址**：`/api/feedback/submit`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
```

**请求参数**：

```json
{
  "content": "希望能增加更多的职位分类",
  "contactInfo": "13800138000", // 联系方式，可选
  "images": [ // 图片URL数组，可选
    "https://example.com/feedback/img1.jpg",
    "https://example.com/feedback/img2.jpg"
  ]
}
```

**响应参数**：

```json
{
  "code": 200,
  "message": "反馈提交成功",
  "data": {
    "feedbackId": "fb001",
    "submitTime": "2023-05-27 17:15:00"
  }
}
```

### 4. 上传图片

**接口地址**：`/api/common/uploadImage`

**请求方式**：POST

**请求头**：

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**请求参数**：

```
file: [二进制文件]
type: feedback  // 图片类型：avatar(头像)、feedback(反馈)、other(其他)
```

**响应参数**：

```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "imageUrl": "https://example.com/images/upload/20230527/img123.jpg"
  }
}
```

### 5. 获取用户协议和隐私政策

**接口地址**：`/api/common/agreement`

**请求方式**：GET

**请求参数**：

```
type: user  // 协议类型：user(用户协议)、privacy(隐私政策)
```

**响应参数**：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "title": "用户服务协议",
    "content": "协议内容...",
    "updateTime": "2023-01-01 00:00:00"
  }
}
```
