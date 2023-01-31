import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Cross from "../../assets/Icons/cross.svg";
import Logo from "../../assets/Icons/App-Icon.svg";
import LoginWithGoogle from "./google.component";

const Login = (props) => {
  // console.log(props);
  const { show, handleClose, handleSignup } = props
  if (props.user) {
    return (
      // <Redirect
      //   to={{
      //     pathname: props.location.state
      //       ? props.location.state.from.pathname === "/login"
      //         ? "/home"
      //         : props.location.state.from.pathname
      //       : "/home",
      //     state: { from: props.location },
      //   }}
      // />
      <></>
    );
  }
  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
      className='login-modal'
    >
      <div className='col-12 justify-content-center pt-6'>
        <div className='mx-auto text-center'>
          <img
            src={Logo}
            alt='profile-img'
            className='img-fluid inline'
            width='70'
          />
        </div>

        <div className='card col-12 col-sm-6 login-card rounded-lg'>
          <div className='text-center'>
            <h4>Welcome Back !</h4>
            {/* <h5 className='text-muted'>
              Enter your credentials to access your account.
            </h5> */}
          </div>

          <div className='card-body pb-2 col-12 col-sm-12'>
            <LoginWithGoogle />
          </div>
          <p className="login-signup-redirect">
            New here ? <span onClick={handleSignup} className='font-semibold' > Signup </span> with  <span className='font-semibold  comp-logo'>
              GlocalBodh
            </span>
          </p>
        </div>
      </div>
      <div className="modal-close-icon">
        <img src={Cross} onClick={handleClose ? handleClose : () => { }} />
      </div>

      {/* <Modal.Footer>
        <button className='btn btn-primary'
        onClick={handleClose ? handleClose : ()=>{}}
        >
          Close
        </button>
      </Modal.Footer> */}
    </Modal>
  );
};

function mapStateToProps(state) {
  const { message } = state.message;
  const { user } = state.auth;
  return {
    message,
    user,
  };
}

export default connect(mapStateToProps)(Login);
