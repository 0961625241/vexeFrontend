import axios from 'axios';
import * as Config from './../constants/Config';

export default function apiCaller(endpoint, method , body,tokenx){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers:{
            token:tokenx
        }
    })
}