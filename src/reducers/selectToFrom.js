import *as ActionType from './../constants/ActionType';
import moment from 'moment';
let initialState = {
    selectFrom:'HCM',
    selectTo:'HaNoi',
    selectDate:moment().format("DD-MM-YYYY"),
    selectDateTo:moment().format("DD-MM-YYYY")
}
    

const selectToFrom = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.SELECT:
            state.selectFrom = action.selectFrom;
            state.selectTo=action.selectTo;
            state.selectDate=action.selectDate;
            state.selectDateTo=action.selectDateTo
            return {...state}
      
        default: return {...state} 
    }
}

export default selectToFrom;