import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Logo from "../../assets/Icons/App-Icon.svg";
import LoginWithGoogle from "./google.component";

const Login = (props) => {
  // console.log(props);
  const { show, handleClose } = props
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
      <div className='col-12 justify-content-center'>
        <div className='mx-auto text-center'>
          <img
            src={Logo}
            alt='profile-img'
            className='img-fluid inline'
            width='70'
          />
        </div>

        <div className='card col-12 col-sm-6 login-card'>
          <div className='text-center'>
            <h4>Welcome Back !</h4>
            <h5 className='text-muted'>
              Enter your credentials to access your account.
            </h5>
          </div>

          <div className='card-body col-12 col-sm-12'>
            <LoginWithGoogle />
          </div>
        </div>
      </div>
      <Modal.Footer>
        <button className='btn btn-primary'
        onClick={handleClose ? handleClose : ()=>{}}
        >
          Close
        </button>
      </Modal.Footer>
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
