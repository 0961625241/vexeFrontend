import *as ActionType from '../constants/ActionType'
let initialState = {
    keyword:'',
}
    



const searchTrip = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SEARCH_TRIP:
            console.log(action.keyword)
            return {
                keyword:action.keyword,
            }
        default: return {...state} 
    }
}

export default searchTrip;