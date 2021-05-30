import *as ActionType from '../constants/ActionType'
let initialState = {
    by:'',
    value:1
}
    



const sortPrice = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SORT_PRICE:
            return {
                by:action.sortPrice.by,
                value:action.sortPrice.value
            }
        default: return {...state} 
    }
}

export default sortPrice;