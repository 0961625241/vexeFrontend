import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';

export const getTripRequest = () => {
  return (dispatch) => {
    Axios({ method: "GET",url: "http://localhost:3000/api/trips"})
    .then((res) => {
      dispatch(getTrip(res.data))
  })
}
}
const  getTrip=(data)=>{
  return {
      type:ActionType.LIST_TRIP,
      data
  }
}

export const getTripIdRequest = (id) => {
  return (dispatch) => {
    Axios({ method: "GET",url: "http://localhost:3000/api/trips/" + id })
    .then((res) => {
      dispatch(getTripId(res.data))
  })
}
}
const  getTripId=(data)=>{
  return {
      type:ActionType.GET_ID_TRIP,
      data
  }
}


export const postTripRequest = (data) => {
  return (dispatch) => {
    Axios({ method: "POST",url: "http://localhost:3000/api/trips",data})
    .then((res) => {
      console.log(res.data)
      dispatch(postTrip(res.data))
  })
}
}
const  postTrip=(data)=>{
  return {
      type:ActionType.ADD_TRIP,
      data
  }
}

export const putTripRequest = (id,data) => {
  return (dispatch) => {
    Axios({ method: "PUT",url: "http://localhost:3000/api/trips/" + id,data})
    .then((res) => {
      dispatch(putTrip(res.data))
  })
}
}
const  putTrip=(data)=>{
  return {
      type:ActionType.UPDATE_TRIP,
      data
  }
}

export const deleteTripRequest = (id) => {
  return (dispatch) => {
    Axios({ method: "DELETE",url: "http://localhost:3000/api/trips/" + id})
    .then((res) => {
      dispatch(deleteTrip(res.data))
  })
}
}
const  deleteTrip=(data)=>{
  return {
      type:ActionType.DELETE_TRIP,
      data
  }
}



// export const getIdTripRequest = (id) => {
//   return (dispatch) => {
//     Axios({ method: "DELETE",url: "http://localhost:3000/api/trips/" + id})
//     .then((res) => {
//       console.log(res.data)
//       // dispatch(deleteTrip(res.data))
//   })
// }
// }

