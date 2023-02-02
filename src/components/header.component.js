import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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

import eventIcon from "./../assets/Icons/navbar/event.svg";
import jobsIcon from "./../assets/Icons/navbar/jobs.svg";
import mailIcon from "./../assets/Icons/navbar/mail.svg";
import fundIcon from "./../assets/Icons/navbar/fund.svg";
import searchIcon from "./../assets/Icons/navbar/search.svg";
import langIcon from "./../assets/Icons/navbar/LangIcon.svg";
import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;



const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  // const { user } = props;
  const history = useHistory();
  const navObj = [
    {
      name: "Events",
      icon: eventIcon,
      onClick: () => history.push('/event/0')
    },
    {
      name: "Jobs",
      icon: jobsIcon,
      onClick: () => history.push('/jobs/0')
    },
    {
      name: "Fundings",
      icon: fundIcon,
    },
    {
      name: "Contact",
      icon: mailIcon,
      onClick: () => window.open('mailto:inquiry@glocalbodh.com')
    },
  ];
  const { isLoggedIn } = useSelector(state => state.auth)
  const [loginActive, setLoginActive] = useState(false)
  const [language, setLanguage] = useState('Eng')
  const [signUpActive, setSignUpActive] = useState(false)

  const { user } = useSelector(state => state.auth)
  const { t } = useTranslation();

  function handleClick(lang) {
    let languageToSet = lang
    if (lang === 'Eng') {
      languageToSet = 'en'
    } else if (lang === 'Mar') {
      languageToSet = 'mr'
    } if (lang === 'Hin') {
      languageToSet = 'hi'
    }
    i18next.changeLanguage(languageToSet)
  }

  const handleLogout = () => {
    dispatch(setLoader());
    signOut();
  };

  useEffect(() => {
    handleClick(language)
  }, [language])

  const openLoginModal = () => setLoginActive(true)
  const closeLoginModal = () => setLoginActive(false)

  const onLogoutSuccess = (res) => {
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(clearLoader());
    window.location = '/'
    //console.log("Logged out Success");
  };
  const handleLogin = () => {
    setLoginActive(true)
    setSignUpActive(false)
  }
  const handleSignup = () => {
    setLoginActive(false)
    setSignUpActive(true)
  }
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
      <div className="containe home-navBar home-row">
        <div to="/">
          <div className="logo cursor-pointer" onClick={() => history.push('/')} >
            <img src={Logo} alt="" />
            <img src={mobileLogo} alt="" />
          </div>
        </div>

        {/* {
          isLoggedIn && */}
        <>
          <div className="flex justify-end items-center flex-1 mr-3 gap-x-6 md:gap-x-8">
            {navObj.map((nav, i) => (
              <div className="navbar-item" onClick={() => nav.onClick && nav.onClick()} >
                <img src={nav.icon} alt="" />
                <span> {t(`${nav?.name}.1`)} </span>
              </div>
            ))}
            <Dropdown className="language-dropdown" >
              <Dropdown.Toggle  >
                <div className="navbar-item">
                  <img src={langIcon} alt="" />
                  <span> {language} </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-dark" variant="dark">
                <Dropdown.Item onClick={() => setLanguage('Eng')} >
                  English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguage('Hin')} >
                  Hindi
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguage('Mar')} >
                  Marathi
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* <div className="nav-search-icon mx-4">
            <img src={searchIcon} alt="" />
          </div> */}
        </>
        {/* } */}
        {!isLoggedIn ?
          <div className="actions flex items-center home-row navbar-wrapper">
            {/* <Navbar /> */}
            {/* <div className="lang action">English</div> */}
            <div className="link-tags">
              <div className="logIn action text-lg underline" onClick={openLoginModal} >
                {t('Login.1')}
              </div>
            </div>
            <div className="link-tags-signup">
              <div className="logIn action text-lg underline"
                onClick={() => setSignUpActive(true)} >
                {t('Signup.1')}
              </div>
            </div>
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
      <LoginComponent show={loginActive}
        handleClose={closeLoginModal}
        handleSignup={handleSignup} />
      <RegisterComponent show={signUpActive}
        handleClose={() => setSignUpActive(false)}
        handleLogin={handleLogin} />
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
