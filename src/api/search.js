import request from "@/utils/request"

// 搜索小说
export const getSearch = (name) => {
  return request.get('/getSearch', {
    params: {
      name
    }
  })
}
