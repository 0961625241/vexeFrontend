import *as ActionType from  './../constants/ActionType'



export const loginAdminChatRequest = (data) => {
  return (dispatch) => {
      dispatch(loginAdminChat(data))
  }
}
const  loginAdminChat=(data)=>{
  return {
      type:ActionType.LOGIN_ADMIN_CHAT,
      data
  }
}


export const postOneUserChatRequest = (data) => {
  return (dispatch) => {
      dispatch(postOneUserChat(data))
  }
}
const  postOneUserChat=(data)=>{
  return {
      type:ActionType.ADD_ONE_USER,
      data
  }
}

export const deleteOneUserChatRequest = (data) => {
    return (dispatch) => {
        dispatch(deleteOneUserChat(data))
    }
  }
  const  deleteOneUserChat=(data)=>{
    return {
        type:ActionType.DELETE_ONE_USER,
        data
    }
  }