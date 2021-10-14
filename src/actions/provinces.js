import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';
import callApi from './../utils/apiCaller';
export const getProvinceRequest = () => {
  return (dispatch) => {
    return callApi(`provinces`, 'GET', null)
    // Axios({ method: "GET",url: "http://localhost:3000/api/provinces"})
    .then((res) => {
      dispatch(getProvince(res.data))
  })
}
}
const  getProvince=(data)=>{
  return {
      type:ActionType.LIST_PROVINCE,
      data
  }
}
