import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';

// import  { getUser,setUser} from "./../method/gobal";


export const getSelectRequest = (selectFrom,selectTo,selectDate,selectDateTo) => {
  return (dispatch) => {
      dispatch(getSelect(selectFrom,selectTo,selectDate,selectDateTo))
      localStorage.setItem("OriginDest",JSON.stringify({selectFrom,selectTo,selectDate,selectDateTo}));
  }
}

const  getSelect=(selectFrom,selectTo,selectDate,selectDateTo)=>{
  return {
      type:ActionType.SELECT,
      selectFrom,selectTo,selectDate,selectDateTo
  }
}

