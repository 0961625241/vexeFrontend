import *as ActionType from './../constants/ActionType';
import moment from 'moment';
let initialState = {
    inforChat1: true,
    inforChat2: false,
}
    

const selectChat = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SELECT_CHAT:
            console.log(action.inforChat1,'-',action.inforChat2)
            state.inforChat1 = action.inforChat1;
            state.inforChat2=action.inforChat2;
            return {...state}
      
        default: return {...state} 
    }
}

export default selectChat;