import *as ActionType from './../constants/ActionType'
let initialState = {
    chats:[]
}
    



const listChat = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.LIST_CHAT:
            console.log(action.data)
             state.chats=action.data ;
            return {...state}
        default: return {...state} 
    }
}

export default listChat;