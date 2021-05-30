import *as ActionType from './../constants/ActionType';
// import Axios from 'axios';
// // import  { getUser,setUser} from "./../method/gobal";


export const sortPrice = (sortPrice) => {
    
    return {
              type:ActionType.SORT_PRICE,
              sortPrice
          }
}

export const filterSeat = (filterOfSeat) => {
    
    return {
              type:ActionType.FILTER_SEAT,
              filterOfSeat
          }
}

export const search = (keyword) => {
    
    return {
              type:ActionType.SEARCH,
              keyword
          }
}

export const searchDriver = (keyword) => {
    
    return {
              type:ActionType.SEARCH_DRIVER,
              keyword
          }
}
export const searchBusA1 = (keyword) => {
    
    return {
              type:ActionType.SEARCH_BUSA1,
              keyword
          }
}

export const searchTrip = (keyword) => {
    
    return {
              type:ActionType.SEARCH_TRIP,
              keyword
          }
}
export const searchCar = (keyword) => {
    
    return {
              type:ActionType.SEARCH_CAR,
              keyword
          }
}
export const searchUser = (keyword) => {
    
    return {
              type:ActionType.SEARCH_USER,
              keyword
          }
}
// const  getUse=(data)=>{
//   return {
//       type:ActionType.LIST_USER,
//       data
//   }
// }

