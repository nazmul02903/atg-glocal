import React from "react";
import { useGoogleLogin } from "react-google-login";

import { useDispatch } from "react-redux";
import { refreshTokenSetup } from "../../utils/refreshToken";

import GoogleLogo from "../../assets/Icons/google.svg";
import { loginWithGoogle } from "../../store/actions/auth";
import { alert } from "../../helpers/alerts";
import { setLoader } from "../../store/actions/loader";

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

function LoginWithGoogle() {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    // console.log(res);

    dispatch(loginWithGoogle(res.tokenId));
    refreshTokenSetup(res);
    //console.log("Login Success: currentUser:", res.tokenObj.id_token);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // alert("error", "Something went wrong. Please try again later");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    // isSignedIn: false,
    // accessType: "online",
    // responseType: "code",
    // prompt: "consent",
  });

  return (
    <button
      onClick={() => {
        dispatch(setLoader());
        signIn();
      }}
      className='mx-auto mt-3 google-button'
    >
      <div className='google-btn'>
        <div className='google-icon-wrapper'>
          <img
            src={GoogleLogo}
            width='30px'
            alt='google login'
            className='inline google-icon'
          />
        </div>
        <p className='btn-text'>
          Sign in with {' '}
          <span className='font-semibold'>
          google
          </span>
        </p>
      </div>
    </button>
  );
}

export default LoginWithGoogle;
