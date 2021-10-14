import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import callApi from './../utils/apiCaller';
export const getCarMFGRequest = () => {
  return (dispatch) => {
    return callApi(`carMFGs`, 'GET', null)
    // Axios({ method: "GET",url: "http://localhost:3000/api/carMFGs"})
    .then((res) => {
      dispatch(getCarMFG(res.data))
  })
}
}
const  getCarMFG=(data)=>{
  return {
      type:ActionType.LIST_CARMFG,
      data
  }
}
export const postCarRequest = (data) => {
  return (dispatch) => {
    return callApi('cars', 'POST', data)
    // Axios({ method: "POST",url: "http://localhost:3000/api/cars",data })
    .then((res) => {
      console.log(res.data)
      dispatch(postCar(res.data))
  })
}
}
const  postCar=(data)=>{
  return {
      type:ActionType.ADD_CAR,
      data
  }
}

export const putCarRequest = (id,data) => {
  return (dispatch) => {
    return callApi(`cars/${id}`, 'PUT', data)
    // Axios({ method: "PUT",url: "http://localhost:3000/api/cars/" + id,data})
    .then((res) => {
      console.log(res.data)
      dispatch(putCar(res.data))
  })
}
}
const  putCar=(data)=>{
  return {
      type:ActionType.UPDATE_CAR,
      data
  }
}


export const deleteCarRequest = (id) => {
  return (dispatch) => {
    return callApi(`cars/${id}`, 'DELETE', null)
    // Axios({ method: "DELETE",url: "http://localhost:3000/api/cars/" + id})
    .then((res) => {
      console.log(res.data)
      dispatch(deleteCar(res.data))
  })
}
}
const  deleteCar=(data)=>{
  return {
      type:ActionType.DELETE_CAR,
      data
}
}