import *as ActionType from '../constants/ActionType'
let initialState = {
    keyword:'',
}
    



const searchUser = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SEARCH_USER:
            console.log(action.keyword)
            return {
                keyword:action.keyword,
            }
        default: return {...state} 
    }
}

export default searchUser;