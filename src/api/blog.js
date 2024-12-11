import request from "@/utils/request";

export const getBlog = (user_id) => {
  return request.get('/getBlog',{
    params:{ user_id}
  })
}

export const getBlogDetail = (blog_id, user_id) => {
  return request.get('/getBlogDetail', {
    params: { blog_id, user_id }
  });
};

// 获取评论
export const getComment = (blog_id) => {
  return request.get('/getBlogComment', {
    params: {
      blog_id,
    }
  })
}

// 发表评论
export const addComment = (blog_id, user_id, content) => {
  return request.post('/addBlogComment', {
    blog_id,
    user_id,
    content
    },
  )
}

// 获取回复评论
export const getReplyComment = (comment_id) => {
  return request.get('/getBlogReply', {
    params: {
      comment_id,
    }
  })
}

// 评论回复
export const replyComment = (comment_id, user_id, content) => {
  return request.post('addBlogReply', {
    comment_id,
    user_id, 
    content
  })
}

export const getUserCollect = (blog_id, user_id) => {
  return request.get('/getCollectBlog', {
    params: {
      blog_id,
      user_id
    }
  })
}

export const updateCollect = (user_id, blog_id, flag) => { 
  return request.post('/updateCollectBlog', { 
    params: {
     user_id, 
     blog_id,
     flag 
    },
  })
}