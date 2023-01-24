import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Cross from "../../assets/Icons/cross.svg";
import Logo from "../../assets/Icons/App-Icon.svg";
import LoginWithGoogle from "./google.component";
import { Link } from "react-router-dom";

import { Form, InputGroup, Button } from "../../utils/inputs";
import { register } from "../../store/actions/auth";
import { validationSchemaRegister } from "../../constants/schema";
import Swal from "sweetalert2";

const Register = (props) => {
  const { show, handleClose } = props
  const [successfull, setSuccessfull] = useState(false);
  const { message } = props;

  const onSubmit = (data) => {
    const { dispatch } = props;
    dispatch(register(data.username, data.email, data.password, data.contact))
      .then((res) => {
        if (res.data.status === 1) {
          setSuccessfull(true);
          Swal.fire({
            icon: "success",
            title: "Registration Complete",
            showConfirmButton: true,
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
          }).then((res) => {
            window.location.href = "/login";
          });
        }
      })
      .catch(() => { });
  };

  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
      className='signup-modal'
    >
      <div className='col-md-12'>
        <div className='mx-auto text-center'>
          <img
            src={Logo}
            alt='profile-img'
            className='inline img-fluid'
            width='70'
          />
        </div>
        <div className='card col-12 col-sm-6 custom-card'>
          <div className='text-center'>
            {" "}
            <h4>Welcome !</h4>
            <h5 className='text-muted'>
              Enter your Details to Register for Glocal services.
            </h5>
          </div>

          <div className='card-body col-12 col-sm-12'>
            <div className='mx-auto'>
              <Form onSubmit={onSubmit} schema={validationSchemaRegister}>
                <InputGroup
                  name='username'
                  placeholder='Username'
                  type='text'
                  icon='fa fa-user'
                />
                <InputGroup
                  name='email'
                  placeholder='Email'
                  type='text'
                  icon='fa fa-envelope'
                />
                <InputGroup
                  name='password'
                  placeholder='Password'
                  type='password'
                  icon='fa fa-lock'
                />
                <InputGroup
                  name='contact'
                  placeholder='Contact Number'
                  type='text'
                  icon='fa fa-phone'
                />
                <Button name='Register' />
              </Form>
            </div>

            {message && (
              <div className='mt-2 form-group'>
                <div
                  className={
                    successfull ? "alert alert-success" : "alert alert-danger"
                  }
                  role='alert'
                >
                  {message}
                </div>
              </div>
            )}
            <div className='mt-2 text-center form-group'>
              <Link to='/login' style={{ textDecoration: "none" }}>
                <span className='text-muted'>Already have an Account ?</span>{" "}
                <span style={{ color: "#0057A8" }}>Log In</span>
              </Link>
            </div>
          </div>
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

export default connect(mapStateToProps)(Register);
