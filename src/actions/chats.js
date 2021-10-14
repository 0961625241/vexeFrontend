import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
// import  { getUser,setUser} from "./../method/gobal";
import callApi from './../utils/apiCaller';

export const getChatRequest = () => {
  return (dispatch) => {
    return callApi(`chats`, 'GET', null)
    .then((res) => {
      dispatch(getChat(res.data))
  })
}
}
const  getChat=(data)=>{
  return {
      type:ActionType.LIST_CHAT,
      data
  }
}

export const postChatRequest = (data) => {
  return (dispatch) => {
      dispatch(postChat(data))
  }
}
const  postChat=(data)=>{
  return {
      type:ActionType.ADD_CHAT,
      data
  }
}