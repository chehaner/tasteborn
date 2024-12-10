import request from "@/utils/request";

export const getBlog = () => {
  return request.get('/getBlog')
}

export const getBlogDetail = (blog_id) => {
  return request.get('/getBlogDetail', {
    params: { blog_id }
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
