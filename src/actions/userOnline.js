import *as ActionType from  './../constants/ActionType'




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