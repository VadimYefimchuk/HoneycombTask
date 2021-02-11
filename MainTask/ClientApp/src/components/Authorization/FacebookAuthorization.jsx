import FacebookLogin from 'react-facebook-login';
import * as React from 'react';
import { sendFacebookLogin } from '../Services/AuthorizationQuery'
import '../Styles/FacebookBtnStyle.css'

export default class FacebookAuthorization extends React.Component {

    render() {
        return (
            < FacebookLogin
                appId="324711375417450"
                autoLoad={false}
                fields="first_name,last_name,email"
                cssClass="btnFacebook"
                callback={sendFacebookLogin}
                icon="fa-facebook"
            />
        )
    }
}