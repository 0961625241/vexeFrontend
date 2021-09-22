import *as ActionType from './../constants/ActionType';

let initialState = {
    notify: {}
}
    

const loading = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.NOTIFY:
            
            return {
                ...state,
                notify: action.payload
            };
      
        default: return {...state} 
    }
}

export default loading;