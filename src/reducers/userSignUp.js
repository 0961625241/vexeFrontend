import *as ActionType from './../constants/ActionType'
let initialState = {
    getUserSignUp:{}
}
    



const userSignUp = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.POST_SIGNUP_REQUEST:
             state.getUserSignUp=action.data ;
             console.log(state.getUserSignUp)
            return {...state}
        default: return {...state} 
    }
}

export default userSignUp;