import *as ActionType from '../constants/ActionType'
let initialState = {
    busA1s: []
}




const listBusA1 = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_BUSA1:
            state.busA1s = action.data;
            return { ...state }
        case ActionType.ADD_BUSA1:
            state.busA1s = [...state.busA1s, action.data]
            return { ...state }
            case ActionType.UPDATE_BUSA1:
                var data = action.data;
                var index = state.busA1s.findIndex((item)=>{
                    return item._id === data._id
                })
                var date1 = new Date(data.SContactBusA1);
                var date2 = new Date(data.EContactBusA1);
                var diff = new Date(date2.getTime() - date1.getTime());
                const tinhSalary =(((diff.getUTCFullYear() - 1970)*12)+diff.getUTCMonth()) *  data.salaryBusA1
                state.busA1s[index] ={
                    _id:data._id,
                    nameBusA1: data.nameBusA1,
                    addressBusA1: data.addressBusA1,
                    sdtBusA1: data.sdtBusA1,
                    bdayBusA1: data.bdayBusA1,
                    CMNDBusA1: data.CMNDBusA1,
                    avatarBusA1: data.avatarBusA1,
                    SContactBusA1: data.SContactBusA1,
                    EContactBusA1: data.EContactBusA1,
                    salaryBusA1: data.salaryBusA1,
                    allowanceBusA1: data.allowanceBusA1,
                    car:data.car,
                    station:data.station,
                    totalSalary:tinhSalary
                }
                state.busA1s =[...state.busA1s]
                return {...state}     
        case ActionType.DELETE_BUSA1:
            var index = state.busA1s.findIndex((item)=>{
                return item._id === action.data._id
            })
            state.busA1s.splice(index,1)
            state.busA1s=[...state.busA1s]
            return {...state}  
        default: return { ...state }
    }
}

export default listBusA1;