import *as ActionType from  './../constants/ActionType'
import Axios from 'axios';






  export const postSignUpRequest = (data,history) => {
    let user ={
      email: data.email,
      password: data.password
    }
    return (dispatch) => {
      Axios({ method: "POST",url: "http://localhost:3000/api/users",data})
      .then((res) => {
          dispatch(postSignUp(user));
          history.push("/login")
          console.log(user)
      })
    };
  };
  
  const postSignUp = (data) => {
    return {
        type: ActionType.POST_SIGNUP_REQUEST,
        data,
    };
  };
  
  export const postLoginRequest = (data,history) => {
    return (dispatch) => {
      dispatch(postLoginFirst());
      Axios({ method: "POST",url: "http://localhost:3000/api/users/login",data})
      .then((res) => {
          dispatch(postLogin(res.data));
          console.log(res.data)
          if(res.data.userType==='admin'){
            localStorage.setItem("User", JSON.stringify(res.data));
            history.push("/manager");
        }else{
          localStorage.setItem("User",JSON.stringify(res.data));
          history.push("/")
        }
        })
        .catch((error) =>{
          dispatch(postLoginFailed(error.response.data.message))
        });
    };
  };
  const postLogin = (data) => {
    return {
        type: ActionType.POST_LOGIN_SUCCESS,
        data,
    };
  };
  const postLoginFailed = (err) => {
    return {
      type: ActionType.POST_LOGIN_FAILED,
      err,
    };
  };
  const postLoginFirst= () => {
    return {
      type: ActionType.POST_LOGIN_REQUEST,
    };
  };
  
export const getUserRequest = () => {
  return (dispatch) => {
    Axios({ method: "GET",url: "http://localhost:3000/api/users"})
    .then((res) => {
      dispatch(getUser(res.data))
  })
}
}
const  getUser=(data)=>{
  return {
      type:ActionType.LIST_USER,
      data
  }
}

export const getUserIDRequest = (id) => {
  // const token = JSON.parse(localStorage.getItem("User")).token
  return (dispatch) => {
    Axios.get("http://localhost:3000/api/users/" + id,
    //  {
    //   headers: {
    //     'token': token
    //   },
    // }
    ).then((res) => {
      console.log(res.data)
      dispatch(getUserID(res.data))
    })
 
}
}
const  getUserID=(data)=>{
  return {
      type:ActionType.GET_USER_ID,
      data
  }
}


export const putIdClient =(data)=>{
  const { token } = JSON.parse(localStorage.getItem("User"));
  return (dispatch) => {
    Axios({ method: "PUT",url: "http://localhost:3000/api/users/me",data, headers: {
      token: token
    }})
    .then((res) => {
      console.log(res.data)
  })
}
}


// admin 
export const deleteUserRequest = (id) => {
  const { token } = JSON.parse(localStorage.getItem("User"));
  return (dispatch) => {
    Axios({ method: "DELETE",url: "http://localhost:3000/api/users/" + id, headers: {
      token: token
    }})
    .then((res) => {
      dispatch(deleteUser(res.data))
  })
}
}
const  deleteUser=(data)=>{
  return {
      type:ActionType.DELETE_USER,
      data
  }
}

export const putUserRequest = (id,data) => {
  const { token } = JSON.parse(localStorage.getItem("User"));
  return (dispatch) => {
    Axios({ method: "PUT",url: "http://localhost:3000/api/users/" + id,data, headers: {
      token: token
    }})
    .then((res) => {
      dispatch(putUser(res.data))
  })
}
}
const  putUser=(data)=>{
  return {
      type:ActionType.UPDATE_USER,
      data
  }
}