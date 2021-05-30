import *as ActionType from './../constants/ActionType'
let initialState = {
    tickets: []
}




const listTicket = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_TICKET:
            state.tickets = action.data;
            return { ...state }
        // case ActionType.DELETE_TICKET:
        //     var index = state.tickets.findIndex((item) => {
        //         return item._id === action.data._id
        //     })
        //     state.tickets.splice(index, 1)
        //     state.tickets = [...state.tickets]
        //     return { ...state }
        default: return { ...state }
    }
}


export default listTicket;