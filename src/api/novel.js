import request from "@/utils/request"

// 获取菜谱信息
export const getRecipeInfo = (recipe_id) => {
  return request.get('/recipeInfo', {
    params: {
      recipe_id
    }
  })
}

// 更新收藏 
export const updateCollect = (user_id, recipe_id, flag) => { 
  return request.post('/updateCollect', { 
    params: {
     user_id, 
     recipe_id,
     flag 
    },
  })
}
// 获取用户收藏
export const getUserCollect = (recipe_id, user_id) => {
  return request.get('/getCollect', {
    params: {
      recipe_id,
      user_id
    }
  })
}
// 获取评论
export const getComment = (recipe_id) => {
  return request.get('/getComment', {
    params: {
      recipe_id,
    }
  })
}

// 发表评论
export const addComment = (recipe_id, user_id, content) => {
  return request.post('/addComment', {
    recipe_id,
    user_id,
    content
    },
  )
}

// 获取回复评论
export const getReplyComment = (comment_id) => {
  return request.get('/getReply', {
    params: {
      comment_id,
    }
  })
}

// 评论回复
export const replyComment = (comment_id, user_id, content) => {
  return request.post('addReply', {
    comment_id,
    user_id, 
    content
  })
}

export const updateLike = (tableName, targetId, increment) => {
  return request.post('updateLike', {
    tableName,
    targetId,
    increment
  })
}
// 添加历史记录
export const addHistory = (novel_id) => {
  return request.get('/addHistory', {
    params: {
      novel_id
    }
  })
}
// 添加评分
export const addRate = ( user_id, recipe_id, rate ) => {
  return request.post('/addRate', {
    user_id,      // 用户ID
    recipe_id,    // 菜谱ID
    rate          // 评分
  })
}

export const deleteRecipe = ( recipe_id ) => {
  return request.post('/deleteRecipe', {
    recipe_id
  })
}

export const getReferBlog = ( recipe_id ) => {
  return request.post('/getReferBlog', {
    recipe_id
  })
}
