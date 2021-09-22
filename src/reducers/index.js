import { combineReducers } from "redux";
import listUser from './listUser';
import userSignUp from './userSignUp';
import userLogin from './userLogin';
import listStation from './listStation'
import listTrip from './listTrip';
import listTicket from './listTicket';
import listCar from './listCar';
import listDriver from './listDriver';
import listProvince from './listProvince';
import listCarMFG from './listCarMFG';
import listBusA1 from './listBusA1';
import selectToFrom from './selectToFrom';
import sortPrice from './sortPrice';
import filterSeat from './filterSeat';
import savePriceCode from './savePriceCode';
import search from './search';
import searchTrip from './searchTrip';
import searchCar from './searchCar';
import searchUser from './searchUser';
import searchDriver from './searchDriver';
import searchBusA1 from './searchBusA1';
import searchTicket from './searchTicket';
import listChat from './listChat';
import loading from './loading';


const rootReducer = combineReducers({
  loading,
  searchTicket,
  listChat,
  listBusA1,
  listCarMFG,
  listProvince,
  listUser,
  userSignUp,
  userLogin,
  listStation,
  listTrip,
  listTicket,
  listCar,
  listDriver,
  selectToFrom,
  sortPrice,
  filterSeat,
  savePriceCode,
  search,
  searchTrip,
  searchCar,
  searchUser,
  searchDriver,
  searchBusA1,
  });
  export default rootReducer;