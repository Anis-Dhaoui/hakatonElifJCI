import React from 'react'
import { useDispatch } from 'react-redux';
import { loginWithFb, loginWithGoogle } from '../Redux/Actions';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import ReactTooltip from 'react-tooltip';

export default function SocialAuth(props) {
    const dispatch = useDispatch();

    const fbResponse = (response) =>{
        dispatch(loginWithFb(response.accessToken));
        props.closeForm();
    };

    const googleResponse = (response) =>{
        dispatch(loginWithGoogle(response.accessToken));
        props.closeForm();
    };
  return (
    <div className="d-flex justify-content-end social_icon">
        <FacebookLogin
            appId='1747851355551259'
            autoLoad={false}
            callback={fbResponse}
            render={renderProps => (
                <span data-for="fbAuth" data-tip="Login with Facebook"><i onClick={renderProps.onClick} className="fa fa-facebook-square"></i></span>
            )}
        />
        <ReactTooltip
            id="fbAuth"
            delayHide={220}
            effect="solid"
            type="info"
        />


        <GoogleLogin
            clientId='298984122139-49vss2p28pvntciijhscfqcn58ojfr6e.apps.googleusercontent.com'
            autoLoad={false}
            onSuccess={googleResponse}
            onFailure={googleResponse}
            cookiePolicy={'single_host_origin'}                        

            render={renderProps => (
                <span data-for="googleAuth" data-tip="Login with Google"><i onClick={renderProps.onClick} className="fa fa-google-plus-square"></i></span>
            )}
        />
        <ReactTooltip
            id="googleAuth"
            delayHide={220}
            effect="solid"
            type="info"
        />


        <span data-for="twitterAuth" data-tip="Not supported yet"><i className="fa fa-twitter-square"></i></span>
        <ReactTooltip
            id="twitterAuth"
            delayHide={220}
            effect="solid"
            type="error"
        />

        
        <span data-for="linkedinAuth" data-tip="Not supported yet"><i className="fa fa-linkedin-square"></i></span>
        <ReactTooltip
            id="linkedinAuth"
            delayHide={220}
            effect="solid"
            type="error"
        />
    </div>
  )
}
