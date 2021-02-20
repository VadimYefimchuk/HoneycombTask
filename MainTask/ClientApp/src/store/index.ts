import * as loginData from './reducers/loginData'
import loginReducer from './reducers/loginReducer';

export interface ApplicationState {
    loginData: loginData.ILoginState | undefined;
}

export const reducers = {
    login: loginReducer,
};
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
