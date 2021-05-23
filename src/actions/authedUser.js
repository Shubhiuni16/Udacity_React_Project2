export const SET_AUTHED_USER='SET_AUTHED_USER'
export const CHANGE_AUTHED_USER='CHANGE_AUTHED_USER'

export function setAuthedUser(id){
    return{
        type:SET_AUTHED_USER,
        id
    }
}

export function changeAuthedUser(){
    return{
        type:CHANGE_AUTHED_USER
    }
}