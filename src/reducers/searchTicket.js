import *as ActionType from '../constants/ActionType'
let initialState = {
    keyword:'',
}
    



const searchTicket = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SEARCH_TICKET:
            console.log(action.keyword)
            return {
                keyword:action.keyword,
            }
        default: return {...state} 
    }
}

export default searchTicket;