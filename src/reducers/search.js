import *as ActionType from '../constants/ActionType'
let initialState = {
    keyword:'',
}
    



const search = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SEARCH:
            console.log(action.keyword)
            return {
                keyword:action.keyword,
            }
        default: return {...state} 
    }
}

export default search;