import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';

// import  { getUser,setUser} from "./../method/gobal";


export const getSelectRequest = (selectFrom,selectTo,selectDate,selectDateTo,selectVe) => {
  return (dispatch) => {
      dispatch(getSelect(selectFrom,selectTo,selectDate,selectDateTo,selectVe))
      localStorage.setItem("OriginDest",JSON.stringify({selectFrom,selectTo,selectDate,selectDateTo,selectVe}));
  }
}

const  getSelect=(selectFrom,selectTo,selectDate,selectDateTo,selectVe)=>{
  return {
      type:ActionType.SELECT,
      selectFrom,selectTo,selectDate,selectDateTo,selectVe
  }
}

