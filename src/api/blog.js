import request from "@/utils/request";

export const getBlog = () => {
  return request.get('/getBlog')
}

export const getBlogDetail = (blog_id) => {
  return request.get('/getBlogDetail', {
    params: { blog_id }
  });
};
