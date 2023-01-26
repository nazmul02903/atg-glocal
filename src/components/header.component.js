import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/homepg/img/gb-logo.png";
import mobileLogo from "../assets/homepg/img/mobileLogo.png"

import Dropdown from "react-bootstrap/Dropdown";
import { connect, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/navbar.css";
import { logout } from "../store/actions/auth";
import { setLoader, clearLoader } from "../store/actions/loader";

import logo from "../assets/Icons/GlocalBodhLogo.svg";
import { alertCustom } from "../helpers/alerts";

import { useGoogleLogout } from "react-google-login";
import { useSelector } from "react-redux";
import LoginComponent from "./auth/login.component";
import RegisterComponent from "./auth/registermodal.component";
import Navbar from "./navbar.component";
const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const { user } = props;

  const { isLoggedIn } = useSelector(state => state.auth)
  const [loginActive, setLoginActive] = useState(false)
  
  const [signUpActive, setSignUpActive] = useState(false)
  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(setLoader());
    signOut();
  };

  const openLoginModal = () => setLoginActive(true)
  const closeLoginModal = () => setLoginActive(false)

  const onLogoutSuccess = (res) => {
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(clearLoader());
    window.location = '/'
    //console.log("Logged out Success");
  };

  const onFailure = () => {
   // alertCustom("error", "Somthing went wrong", "/home");
    //console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <>
      <div className="container home-navBar home-row">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="" />
            <img src={mobileLogo} alt="" />
          </div>
        </Link>
        {!isLoggedIn ?
          <div className="actions home-row navbar-wrapper">
            <Navbar/>
            {/* <div className="lang action">English</div>
            <div className="link-tags">
              <div className="logIn action" onClick={openLoginModal} >LogIn</div>
            </div>
            <div className="link-tags">
              <div className="logIn action" onClick={() => setSignUpActive(true)} >Signup</div>
            </div> */}
            {/* <Link to="/register" className="link-tags">
              <div className="singUp action">SingUp</div>
            </Link> */}
          </div>
          :
          <div>
            {user && (
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="dark">
                    <h5 className="d-inline">{user.name}</h5>
                    {/* <img className='' src={user} height='50' alt='profileImg' /> */}
                  </Dropdown.Toggle>
                  {user.admin ? (
                    <Dropdown.Menu className="dropdown-menu-dark" variant="dark">
                      <Dropdown.Item href="/admin/allJobs">
                        All Jobs
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/allNews">
                        All News
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/events/1">
                        Workshops & Trainings
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/events/2">
                        Awards & Competitions
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/events/3">
                        Exhibition & Summits
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/allFundingUpdates">
                        Funding Updates
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/allRFP">
                        RFP
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/kycList">
                        KYC List
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/academics">
                        Academics
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
                        <button className="p-2 btn btn-danger">Logout</button>
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/admin/dashboard/events">
                        My Events
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu variant="dark" className="dropdown-menu-dark">
                      <Dropdown.Item as={Link} to="/user/dashboard/myEvents">
                        My Events
                      </Dropdown.Item>
                      <Dropdown.Item href="/user/dashboard/myJobs">
                        My Jobs
                      </Dropdown.Item>
                      <Dropdown.Item href="/user/dashboard/myFundingUpdate">
                        My Funding Updates
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/posting">
                        Create Post
                      </Dropdown.Item>
                      <Dropdown.Item href="/user/kycStatus">
                        KYC Status
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
                        <button className="p-2 btn btn-danger">Logout</button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </li>
            )}
          </div>
        }
      </div>
      <LoginComponent show={loginActive} handleClose={closeLoginModal} />
      <RegisterComponent show={signUpActive} handleClose={() => setSignUpActive(false)}/>
    </>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;

  return {
    user,
  };
}

export default connect(mapStateToProps)(Header);
