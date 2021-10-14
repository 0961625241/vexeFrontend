import *as ActionType from '../constants/ActionType'
import Axios from 'axios';
import callApi from './../utils/apiCaller';
export const getBusA1Request = () => {
    return (dispatch) => {
        return callApi('busA1s', 'GET', null)
        // Axios({ method: "GET", url: "http://localhost:3000/api/busA1s" })
        .then((res) => {
            dispatch(getBusA1(res.data))
        })
    }
}
const getBusA1 = (data) => {
    return {
        type: ActionType.LIST_BUSA1,
        data
    }
}

export const postBusA1Request = (data) => {
    return (dispatch) => {
      return callApi('busA1s', 'POST', data)
      // Axios({ method: "POST",url: "http://localhost:3000/api/busA1s",data })
      .then((res) => {
        console.log(res.data)
        dispatch(postBusA1(res.data))
    }) .catch((error) =>{
      console.log(error.response.data.message)
    });
  }
  }
  const  postBusA1=(data)=>{
    return {
        type:ActionType.ADD_BUSA1,
        data
    }
  }
  
  export const putBusA1Request = (id,data) => {
    return (dispatch) => {
      return callApi(`busA1s/${id}`, 'PUT', data)
      // Axios({ method: "PUT",url: "http://localhost:3000/api/busA1s/" + id,data})
      .then((res) => {
        console.log(res.data)
        dispatch(putBusA1(res.data))
    })
  }
  }
  const  putBusA1=(data)=>{
    return {
        type:ActionType.UPDATE_BUSA1,
        data
    }
  }
  

  export const deleteBusA1Request = (id) => {
    return (dispatch) => {
      return callApi(`busA1s/${id}`, 'DELETE', null)
      // Axios({ method: "DELETE",url: "http://localhost:3000/api/busA1s/" + id})
      .then((res) => {
        console.log(res.data)
        dispatch(deleteBusA1(res.data))
    })
  }
  }
  const  deleteBusA1=(data)=>{
    return {
        type:ActionType.DELETE_BUSA1,
        data
    }
  }