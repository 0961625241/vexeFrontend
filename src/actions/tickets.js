import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
// import  { getUser,setUser} from "./../method/gobal";


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
    //   Axios({ method: "GET",url: "http://localhost:3000/api/trips"})
    //   .then((res) => {
    //      dispatch(getTrip(res.data))
    //      console.log(res.data)
    // })
      // dispatch(postTicket(res.data))
  }).catch((error) =>{
    console.log(error.response)
  });
}
}
const  getTrip=(data)=>{
  return {
      type:ActionType.LIST_TRIP,
      data
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
