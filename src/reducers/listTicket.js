import *as ActionType from './../constants/ActionType'
let initialState = {
    tickets: [],
    postTicketEmail:[],
}




const listTicket = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_TICKET:
            state.tickets = action.data;
            return { ...state }
        case ActionType.GET_TICKET_EMAIL:
            state.postTicketEmail = action.data;
            return { ...state }    
        case ActionType.DELETE_TICKET:
            var index = state.postTicketEmail.findIndex((item) => {
                return item._id === action.data._id
            })
            state.postTicketEmail.splice(index, 1)
            state.postTicketEmail = [...state.postTicketEmail]
            return { ...state }
        default: return { ...state }
    }
}


export default listTicket;