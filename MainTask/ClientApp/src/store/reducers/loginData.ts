import { Action, Reducer } from 'redux';
import {sendLogin} from '../../components/Services/AuthorizationQuery'

export interface ILoginState{
    login: boolean;
    token?: string;
    role?: string;
    uName?: string;
}

export interface IGetLoginData { 
    type: 'GET_LOGIN_DATA' 
}
export interface IClearLoginData { 
    type: 'CLEAR_LOGIN_DATA' 
}

export const actionCreators = {
    getLoginData: () => ({ type: 'GET_LOGIN_DATA' } as IGetLoginData),
    clearLoginData: () => ({ type: 'CLEAR_LOGIN_DATA' } as IClearLoginData)
};

export type KnownAction = IGetLoginData | IClearLoginData;

export const reducer: Reducer = (state: ILoginState | undefined, incomingAction: Action) => {
    if (state === undefined) {
        return { 
            login: false,
            token: undefined,
            role: undefined,
            uName: undefined,
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_LOGIN_DATA':
            var logData = sendLogin(state);
            return {
                logData
            };
        case 'CLEAR_LOGIN_DATA':
            return { 
                login: false,
                token: undefined,
                role: undefined,
                uName: undefined,
            };
        default:
            return state;
    }
};