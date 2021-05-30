import *as ActionType from '../constants/ActionType'
let initialState = {
    keyword:'',
}
    



const searchBusA1 = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SEARCH_BUSA1:
            console.log(action.keyword)
            return {
                keyword:action.keyword,
            }
        default: return {...state} 
    }
}

export default searchBusA1;