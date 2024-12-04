import request from "@/utils/request";
// 添加菜谱
export const addRecipe = ( img, recipe_name, content, ingredients, ingredients_count, steps, steps_count, tags, user_id) => {
    return request.post('/addRecipe', {
        img, 
        recipe_name, 
        content, 
        ingredients, 
        ingredients_count, 
        steps, 
        steps_count,
        tags,
        user_id
    })
  }
  // 添加菜谱
export const addBlog = ( user_id, content, images, refer_id ) => {
    return request.post('/addBlog', {
        user_id, 
        content, 
        images,
        refer_id
    })
  }

  export const getHomeWork = (recipe_id) => {
    return request.get('/getHomeWork', {
      params: { recipe_id }  // 将 recipe_id 作为查询参数传递
    });
  }
  