import *as ActionType from '../constants/ActionType'
let initialState = {
    keyword:'',
}
    



const searchDriver = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SEARCH_DRIVER:
            console.log(action.keyword)
            return {
                keyword:action.keyword,
            }
        default: return {...state} 
    }
}

export default searchDriver;