import *as ActionType from './../constants/ActionType'
let initialState = {
    getUserLogin:{},
    err:null,
}
    



const userLogin = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.POST_LOGIN_REQUEST:
                state.getUserLogin = {};
                state.err = null;
                return { ...state };
        case ActionType.POST_LOGIN_SUCCESS:
             state.getUserLogin=action.data ;
             state.err = null;
            return {...state}
            case ActionType.POST_LOGIN_FAILED:
                state.getUserLogin = {};
                state.err = action.err;
                return { ...state };
         
        default: return {...state} 
    }
}

export default userLogin;