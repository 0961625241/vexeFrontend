import *as ActionType from './../constants/ActionType'
let initialState = {
    trips: [],
    getIdTrip:null
}


const listTrip = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_TRIP:
            state.trips = action.data;
            return { ...state }
        case ActionType.GET_ID_TRIP:
            state.getIdTrip = action.data;
            return { ...state }    
        case ActionType.ADD_TRIP:
            state.trips = [...state.trips, action.data]
            return { ...state }
        case ActionType.UPDATE_TRIP:
            var data = action.data;
            var index = state.trips.findIndex((item) => {
                return item._id === data._id
            })
            console.log(data)
            console.log(state.trips[index])
            state.trips[index] = {
                _id: data._id,
                fromStation: data.fromStation,
                toStation: data.toStation,
                startTime: data.startTime,
                cars:data.cars,
                price: data.price
            }
            state.trips = [...state.trips]
            return { ...state }
        case ActionType.DELETE_TRIP:
            var index = state.trips.findIndex((item) => {
                return item._id === action.data._id
            })
            state.trips.splice(index, 1)
            state.trips = [...state.trips]
            return { ...state }
        default: return { ...state }
    }
}

export default listTrip;