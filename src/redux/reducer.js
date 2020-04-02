const initialState = {
  id: '',
  username: '',
  profile_pic: ''
}
// console.log(initialState)
const GET_USER = 'GET_USER'

export function getUser(userObj){
    // console.log(userObj)
    return {
        type: GET_USER,
        payload: userObj
    }
}

export default function(state = initialState, action){
    const {type, payload} = action;
switch(type){
    case GET_USER: 
    // console.log({...state, ...payload})
    return {...state, ...payload}
    default: 
    return state
}
}