import FacebookLogin from 'react-facebook-login';
import * as React from 'react';
import { sendFacebookLogin } from '../Services/AuthorizationQuery'
import '../Styles/FacebookBtnStyle.css'
import { connect } from 'react-redux';


class FacebookAuthorizationComponent extends React.Component {

  render() {
    return (
      < FacebookLogin
        appId="324711375417450"
        autoLoad={false}
        fields="first_name,last_name,email"
        cssClass="btnFacebook"
        callback={this.props.sendFacebookLogin}
        icon="fa-facebook"
      />
    )
  }
}

const FacebookAuthorization = connect(
  ({ login }, props) => {
    return {
    };
  },
  (dispatch) => {
    return {
      sendFacebookLogin(value) {
        dispatch(sendFacebookLogin(value));
      }
    };
  }
)(FacebookAuthorizationComponent);

export default FacebookAuthorization