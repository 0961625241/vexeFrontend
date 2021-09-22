import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
// import  { getUser,setUser} from "./../method/gobal";
import {getTripRequest} from './trips';

export const getTicketRequest = () => {
  return (dispatch) => {
    Axios({ method: "GET",url: "http://localhost:3000/api/tickets"})
    .then((res) => {
      dispatch(getTicket(res.data))
  })
}
}
const  getTicket=(data)=>{
  return {
      type:ActionType.LIST_TICKET,
      data
  }
}


export const postTicketRequest = (data) => {
  return (dispatch) => {
    Axios({ method: "POST",url: "http://localhost:3000/api/tickets/booking" , data})
    .then((res) => {
      console.log(res.data)
      dispatch(getTripRequest())
      // dispatch(postTicket(res.data))
  }).catch((error) =>{
    console.log(error.response)
  });
}
}

// const  postTicket=(data)=>{
//   return {
//       type:ActionType.LIST_TICKET,
//       data
//   }
// }

export const deleteTicketRequest = (id,data) => {
  return (dispatch) => {
    Axios({ method: "DELETE",url: `http://localhost:3000/api/tickets/` + id ,data})
    .then((res) => {
      dispatch(deleteTicket(res.data))
  }).catch((error) =>{
    console.log(error.response)
  });
}
}
const  deleteTicket=(data)=>{
  return {
      type:ActionType.DELETE_TICKET,
      data
  }
}


export const postTicketEmailRequest = (data) => {
  console.log(data)
  return (dispatch) => {
    Axios({ method: "POST",url: "http://localhost:3000/api/tickets/history/email" , data:data}).then((res) => {
      console.log(res.data)
      dispatch(postTicketEmail(res.data))
    })
 
}
}
const  postTicketEmail=(data)=>{
  return {
      type:ActionType.GET_TICKET_EMAIL,
      data
  }
}