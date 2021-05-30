import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';

export const getCarRequest = () => {
  return (dispatch) => {
    Axios({ method: "GET",url: "http://localhost:3000/api/cars"})
    .then((res) => {
      dispatch(getCar(res.data))
  })
}
}
const  getCar=(data)=>{
  return {
      type:ActionType.LIST_CAR,
      data
  }
}
export const postCarRequest = (data) => {
  return (dispatch) => {
    Axios({ method: "POST",url: "http://localhost:3000/api/cars",data 
   })
    .then((res) => {
      console.log(res.data)
      dispatch(postCar(res.data))
  }) .catch((error) =>{
    console.log(error.response.data.message)
  });
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
    Axios({ method: "PUT",url: "http://localhost:3000/api/cars/" + id,data})
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
    Axios({ method: "DELETE",url: "http://localhost:3000/api/cars/" + id})
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