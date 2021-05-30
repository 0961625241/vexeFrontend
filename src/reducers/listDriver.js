import *as ActionType from './../constants/ActionType'
let initialState = {
    drivers: []
}




const listDriver = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_DRIVER:
            state.drivers = action.data;
            return { ...state }
        case ActionType.ADD_DRIVER:
            state.drivers = [...state.drivers, action.data]
            return { ...state }
            case ActionType.UPDATE_DRIVER:
                var data = action.data;
                var index = state.drivers.findIndex((item)=>{
                    return item._id === data._id
                })
                var date1 = new Date(data.SContactDriver);
                var date2 = new Date(data.EContactDriver);
                var diff = new Date(date2.getTime() - date1.getTime());
                const tinhSalary =(((diff.getUTCFullYear() - 1970)*12)+diff.getUTCMonth()) *  data.salaryDriver
                state.drivers[index] ={
                    _id:data._id,
                    nameDriver: data.nameDriver,
                    addressDriver: data.addressDriver,
                    sdtDriver: data.sdtDriver,
                    bdayDriver: data.bdayDriver,
                    CMNDDriver: data.CMNDDriver,
                    avatarDriver: data.avatarDriver,
                    SContactDriver: data.SContactDriver,
                    EContactDriver: data.EContactDriver,
                    salaryDriver: data.salaryDriver,
                    allowanceDriver: data.allowanceDriver,
                    car:data.car,
                    station:data.station,
                    totalSalary:tinhSalary
                }
                state.drivers =[...state.drivers]
                return {...state}     
        case ActionType.DELETE_CAR:
            var index = state.drivers.findIndex((item)=>{
                return item._id === action.data._id
            })
            state.drivers.splice(index,1)
            state.drivers=[...state.drivers]
            return {...state}  
        default: return { ...state }
    }
}

export default listDriver;