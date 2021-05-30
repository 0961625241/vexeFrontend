import *as ActionType from './../constants/ActionType'
let initialState = {
    user: [],
    getIDUser: {},
 
}




const listUser = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_USER:
            state.user = action.data;
            return { ...state }
        case ActionType.GET_USER_ID:
            state.getIDUser = action.data;
            return { ...state }
        case ActionType.DELETE_TICKET:
            console.log(state.getIDUser)
            console.log(action.data)
            var index = state.getIDUser.ticketId.findIndex((item) => {
                console.log(item._id === action.data._id)
                return item._id === action.data._id
            })
            state.getIDUser.ticketId.splice(index, 1)
            state.getIDUser = {...state.getIDUser}
           return { ...state }  
     
       



        case ActionType.DELETE_USER:
            var index = state.user.findIndex((item) => {
                return item._id === action.data._id
            })
            state.user.splice(index, 1)
            state.user = [...state.user]
            return { ...state }
        case ActionType.UPDATE_USER:
            var data = action.data;
            var index = state.user.findIndex((item) => {
                return item._id === data._id
            })
            console.log(state.user[index])
            state.user[index] = {
                _id: data._id,
                email: data.email,
                fullName: data.fullName,
                userType:data.userType,
                passWord:data.passWord,
                ticketId:data.ticketId
            }
            state.user = [...state.user]
            return { ...state }

        default: return { ...state }
    }
}

export default listUser;