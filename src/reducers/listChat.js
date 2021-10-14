import *as ActionType from './../constants/ActionType'
let initialState = {
    chats:[]
}
    



const listChat = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.LIST_CHAT:
             state.chats=action.data ;
            return {...state}
        case ActionType.ADD_CHAT:
            let m = action.data;
            let index = state.chats.findIndex(item => item._id === m._id)
            if (index === -1) {
                state.chats.push(m)
            } else {
                state.chats[index].listContent = m.listContent;
            }
            return {...state}        
        default: return {...state} 
    }
}

export default listChat;