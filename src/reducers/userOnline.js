import *as ActionType from './../constants/ActionType'
let initialState = {
    userClientOnline: [],
    inforUser: {
      id: '',
      conversation: ``,
      email: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).email : '',
      name: JSON.parse(localStorage.getItem("User")) !== null ? JSON.parse(localStorage.getItem("User")).fullName : '',
      sdt: '',
    },
}




const userOnline = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ADD_ONE_USER:
            let response=action.data;
            state.inforUser.conversation = response.conversation
            if (state.userClientOnline.includes(response.conversation) === false) {
                state.userClientOnline.push(response.conversation)
              if (state.userClientOnline.length === 3) {
                state.userClientOnline.splice(0, 1)
              }
            }
            return { ...state }
        case ActionType.DELETE_ONE_USER:
            let conversation =action.data;
            let index = state.userClientOnline.findIndex(x => x === conversation);
            state.userClientOnline.splice(index, 1)
            return { ...state }
        default: return { ...state }
    }
}

export default userOnline;