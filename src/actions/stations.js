import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
// import  { getUser,setUser} from "./../method/gobal";
import {getSelectNotify} from './loading';
import callApi from './../utils/apiCaller';
export const getStationRequest = () => {
  return (dispatch) => {
    return callApi(`stations`, 'GET', null)
    // Axios({ method: "GET",url: "http://localhost:3000/api/stations"})
    .then((res) => {
      dispatch(getSelectNotify({}));
      dispatch(getStation(res.data))
  })
}
}
const  getStation=(data)=>{
  return {
      type:ActionType.LIST_STATION,
      data
  }
}


export const postStationRequest = (data) => {
  return (dispatch) => {
    return callApi('stations', 'POST', data)
    // Axios({ method: "POST",url: "http://localhost:3000/api/stations",data})
    .then((res) => {
      console.log(res.data)
      dispatch(postStation(res.data))
  }).catch((error) =>{
    console.log(error.response.data)
  });
}
}
const  postStation=(data)=>{
  return {
      type:ActionType.ADD_STATION,
      data
  }
}

export const putStationRequest = (id,data) => {
  return (dispatch) => {
    return callApi(`stations/${id}`, 'PUT', data)
    // Axios({ method: "PUT",url: "http://localhost:3000/api/stations/" + id,data})
    .then((res) => {
      console.log(res.data)
      dispatch(putStation(res.data))
  })
}
}
const  putStation=(data)=>{
  return {
      type:ActionType.UPDATE_STATION,
      data
  }
}

export const deleteStationRequest = (id) => {
  return (dispatch) => {
    return callApi(`stations/${id}`, 'DELETE', null)
    // Axios({ method: "DELETE",url: "http://localhost:3000/api/stations/" + id})
    .then((res) => {
      console.log(res.data)
      dispatch(deleteStation(res.data))
  })
}
}
const  deleteStation=(data)=>{
  return {
      type:ActionType.DELETE_STATION,
      data
  }
}