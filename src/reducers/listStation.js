import *as ActionType from './../constants/ActionType'
let initialState = {
    stations:[]
}
    



const listStation = (state=initialState,action)=>{
    switch(action.type){
        case ActionType.LIST_STATION:
             state.stations=action.data ;
            return {...state}
        case ActionType.ADD_STATION:
            state.stations =  [...state.stations,action.data]
            return {...state}    
    case ActionType.UPDATE_STATION:
            var data = action.data;
            var index = state.stations.findIndex((item)=>{
                return item._id === data._id
            })
            state.stations[index] ={
                _id:data._id,
                nameStation:data.nameStation,
                addressStation:data.addressStation,
                province:data.province,
                descriptionStation:data.descriptionStation,
            }
            state.stations =[...state.stations]
            return {...state} 
            case ActionType.DELETE_STATION:
                // state.stations =  [...state.stations,action.data]
                var index = state.stations.findIndex((item)=>{
                    return item._id === action.data._id
                })
                state.stations.splice(index,1)
               state.stations=[...state.stations]
                return {...state}     
            
        default: return {...state} 
    }
}

export default listStation;