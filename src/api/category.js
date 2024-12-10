import request from "@/utils/request";
// 通过标签查询菜谱
export const getRecipeByTag = ( tag_id ) => {
    return request.get('/getRecipeByTag', {
        params: { tag_id }
    })
}
export const getCollectRank = () => {
    return request.get('/getCollectRank')
}
export const getRateRank = () => {
    return request.get('/getRateRank')
}
export const getFollowRank = () => {
    return request.get('/getFollowRank')
}