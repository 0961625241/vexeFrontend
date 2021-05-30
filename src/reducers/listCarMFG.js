import *as ActionType from './../constants/ActionType'
let initialState = {
    carMFGs: []
}




const listCarMFG = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_CARMFG:
            state.carMFGs = action.data;
            return { ...state }
        // case ActionType.ADD_CAR:
        //     state.cars = [...state.cars, action.data]
        //     return { ...state }
        //     case ActionType.UPDATE_CAR:
        //         var data = action.data;
        //         var index = state.cars.findIndex((item)=>{
        //             return item._id === data._id
        //         })
        //         state.cars[index] ={
        //             _id:data._id,
        //             nameBus:data.nameBus,
        //             imageBus:data.imageBus,
        //             codeBus:data.codeBus,
        //             seats:data.seats,
        //             typesSeat:data.typesSeat
        //         }
        //         state.cars =[...state.cars]
        //         return {...state}     
        // case ActionType.DELETE_CAR:
        //     var index = state.cars.findIndex((item)=>{
        //         return item._id === action.data._id
        //     })
        //     state.cars.splice(index,1)
        //     state.cars=[...state.cars]
        //     return {...state}  
        default: return { ...state }
    }
}

export default listCarMFG;