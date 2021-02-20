

const SET_LOGIN_DATA = "SET_LOGIN_DATA";
const SET_USER_DATA = "SET_USER_DATA";


export const initialState = {
    loginData: JSON.parse(localStorage.getItem('login')),
    userData: JSON.parse(localStorage.getItem('userData'))
}

const loginReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case SET_LOGIN_DATA: {
            newState = {...newState, loginData: action.payload.value};
            break;
        }
        case SET_USER_DATA: {
            newState = {...newState, userData: action.payload.value};
            break;
        }
    }
    return newState;
}

export const setLoginData = (value) => {
    return {
        type: SET_LOGIN_DATA,
        payload: { value }
    }
}

export const setUserData = (value) => {
    return {
        type: SET_USER_DATA,
        payload: { value }
    }
}


export default loginReducer;