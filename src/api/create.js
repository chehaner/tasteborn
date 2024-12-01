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