import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';

// import  { getUser,setUser} from "./../method/gobal";


export const getSelectNotify = (loading) => {
  return (dispatch) => {
      dispatch(getNotify(loading))
  }
}
// dispatch({ type: 'NOTIFY', payload: {loading: true} })

const  getNotify=(loading)=>{
  return {
      type:ActionType.NOTIFY,
      payload:loading
  }
}
