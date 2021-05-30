import *as ActionType from '../constants/ActionType'
let initialState = {
    filterName:'',
}
    



const filterSeat = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.FILTER_SEAT:
            
            return {
                filterName:action.filterOfSeat,
            }
        default: return {...state} 
    }
}

export default filterSeat;