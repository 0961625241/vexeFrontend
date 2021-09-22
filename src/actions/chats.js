import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
// import  { getUser,setUser} from "./../method/gobal";


export const getChatRequest = () => {
  return (dispatch) => {
    Axios({ method: "GET",url: "http://localhost:3000/api/chats"})
    .then((res) => {
      console.log(res.data)
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