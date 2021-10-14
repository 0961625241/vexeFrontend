import *as ActionType from  './../constants/ActionType'



export const getSelectChatRequest = (inforChat1,inforChat2) => {
  return (dispatch) => {
      dispatch(getSelectChat(inforChat1,inforChat2))
  }
}

const  getSelectChat=(inforChat1,inforChat2)=>{
  return {
      type:ActionType.SELECT_CHAT,
      inforChat1,inforChat2
  }
}

