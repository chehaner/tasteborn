import request from "@/utils/request";

// 发起登录请求
export const getLogin = (username, password ) => {
  return request.post('/login', {
    username,
    password,
  })
}

// 发起注册请求
export const getReg = (regInfo) => {
  return request.post('/register', regInfo)
}

// 获取用户信息
export const getUserInfo = (user_id) => {
  return request.get(`/userInfo?user_id=${user_id}`)
}

// 修改用户信息
export const updateNickname = (user_id, nickname) => {
  return request.post('/updateNickname', {
    user_id,
    nickname,
  })
}

// 修改用户头像
export const updateAvatar = (user_id, url) => {
  return request.post('/updateAvatar', {
    user_id,
    url
  })
}

// 修改用户密码
export const updatePwd = (user_id, historyPwd, password) => {
  return request.post('/updatePwd', {
    user_id,
    historyPwd,
    password
  })
}

// 获取用户收藏
export const getUserCollect = (user_id) => {
  return request.get('/getUserCollect', {
    params: {
      user_id
    }
  })
}

// 获取用户历史浏览
export const getUserHistory = (user_id) => {
  return request.get('/getUserHistory', {
    params: {
      user_id
    }
  })
}
// 获取用户创建
export const getUserCreate = ( user_id, create_type ) => {
  return request.get('/getUserCreate', {
    params: {
      user_id,
      create_type
    }
  })
}
// // 发送邮箱验证码
// export const sendCode = (email) => {
//   return request.get('/getEmailCode', {
//     params: {
//       email
//     }
//   })
// }

// // 忘记密码
// export const forgetPassword = (email, newPwd, emailCode) => {
//   return request.post('/forget', {
//     email,
//     newPwd,
//     emailCode
//   })
// }
