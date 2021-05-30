import *as ActionType from './../constants/ActionType'
import Axios from 'axios';

export const getDriverRequest = () => {
    return (dispatch) => {
        Axios({ method: "GET", url: "http://localhost:3000/api/drivers" })
            .then((res) => {
                dispatch(getDriver(res.data))
            })
    }
}
const getDriver = (data) => {
    return {
        type: ActionType.LIST_DRIVER,
        data
    }
}

export const postDriverRequest = (data) => {
    return (dispatch) => {
      Axios({ method: "POST",url: "http://localhost:3000/api/drivers",data 
     })
      .then((res) => {
        dispatch(postDriver(res.data))
    }) .catch((error) =>{
      console.log(error.response.data.message)
    });
  }
  }
  const  postDriver=(data)=>{
    return {
        type:ActionType.ADD_DRIVER,
        data
    }
  }
  
  export const putDriverRequest = (id,data) => {
    console.log(id,data)
    return (dispatch) => {
      Axios({ method: "PUT",url: "http://localhost:3000/api/drivers/" + id,data})
      .then((res) => {
        console.log(res.data)
        dispatch(putDriver(res.data))
    })
  }
  }
  const  putDriver=(data)=>{
    return {
        type:ActionType.UPDATE_DRIVER,
        data
    }
  }
  
  
  export const deleteDriverRequest = (id) => {
    return (dispatch) => {
      Axios({ method: "DELETE",url: "http://localhost:3000/api/drivers/" + id})
      .then((res) => {
        console.log(res.data)
        dispatch(deleteDriver(res.data))
    })
  }
  }
  const  deleteDriver=(data)=>{
    return {
        type:ActionType.DELETE_CAR,
        data
  }
  }