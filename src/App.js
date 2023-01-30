import React, { useEffect} from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "./index.css";

import { clearMessage } from "./store/actions/message";
import { history } from "./helpers/history";
import { getStates } from "./store/actions/states";
import {
  getKyc,
  getPaidModules,
  getFundingUpdateInfo,
} from "./store/actions/user";

import Loader from "./helpers/loader";
import Header from "./components/header.component";
import Routes from "./routes/index";
import Posting from "./components/user/home.component";
import UserHome from "./components/user/home";
import AdminHome from "./components/admin/home.component";
import BackArrow from "./assets/Icons/back-arrow.svg";
//import Page404 from "./components/page404.component";

import Swal from "sweetalert2";
import UserService from "./services/user.service";
import { clearLoader, setLoader } from "./store/actions/loader";
import { alertCustom, alertDefault } from "./helpers/alerts";

import Footer from "./components/footer.component";
import ProtectedRoute from "./routes/protectedRoutes";
import PublicRoutes from "./routes/publicRoutes";
import BottomBar from "./components/bottom-bar/bottomBar.component";

const BackToDB = () => {
  let history = useHistory();

  return (
    <div className="d-flex justify-content-end me-2 mt-3" id="backToDashboard">
      <button className="btn" style={{ backgroundColor: "#4A5865" }}>
        <div to={'/'} style={{ textDecoration: "none", color: "white" }}
          onClick={() => history.goBack()}
        >
          <span>
            <img src={BackArrow} alt="Back arrow" />
            {"  Back To Dashboard "}
          </span>
        </div>
      </button>
    </div>
  );
};

const App = (props) => {
  const { user, isLoading, dispatch } = props;

  let mobileNumber;

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getStates());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) {
      dispatch(getKyc(user));
      dispatch(getPaidModules());
      dispatch(getFundingUpdateInfo());
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user) {
      UserService.getUserDetails(user.userId)
        .then((res) => {
          props.dispatch(clearLoader());
          if (!res.data.userBean.contactNumber) {
            Swal.fire({
              title: "Mobile Number is missing",
              allowEnterKey: false,
              allowEscapeKey: false,
              allowOutsideClick: false,
              input: "text",
              inputLabel: "Your Mobile Number",
              inputValue: mobileNumber,
              showCancelButton: false,
              inputValidator: (value) => {
                if (!value) {
                  return "You need to write something!";
                } else {
                  if (value.length > 10) {
                    return "Please Enter valid Mobile Number";
                  }
                }
              },
            }).then((res) => {
              props.dispatch(setLoader());
              UserService.updateMobileNumber(res.value)
                .then((res) => {
                  props.dispatch(clearLoader());
                  if (res.data.status === 1) {
                    alertDefault(
                      "success",
                      "Mobile Number Updates Successfully"
                    );
                  } else {
                    alertCustom(
                      "error",
                      "Mobile Number Already Exists. Please Enter New Mobile Number",
                      "/home"
                    );
                  }
                })
                .catch(() => {
                  alertCustom(
                    "error",
                    "Mobile Number Already Exists. Please Enter New Mobile Number",
                    "/home"
                  );
                });
            });
          }
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          alertCustom("error", message, "/home");
        });
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router history={history} className="App">
      <Loader isLoading={isLoading}>
        <div id="page-container">
          <Header />

          <div className="mt-2 grid justify-center" id="content-wrap">
            <Switch>
              <PublicRoutes
                exact
                path={["/", "/home"]}
                component={user && user.admin ? AdminHome : UserHome}
                sectionId="0"
              />
              <ProtectedRoute path="/posting" component={Posting} />
              <Route path={["/user", "/admin"]} component={BackToDB} />
              {/* <Route path='*' component={Page404} /> */}
            </Switch>
            <Routes />
          </div>
        </div>
      </Loader>
      <div className="footer-sm">
        <BottomBar />
      </div>
      {/* <div className="footer">
        <div className="footer-header">
          <p>Create your Glocalbodh account</p>
          <button>Get Started</button>
        </div>
        <div className="footer-content">
          <div>
            <h6>Your Account</h6>
            <ul>
              <li>Sign up</li>
              <li>Log in</li>
              <li>Help</li>
              <li>Become an affiliate</li>
            </ul>
          </div>
          <div>
            <h6>Glocalbodh</h6>
            <ul>
              <li>About</li>
              <li>Blog</li>
              <li>Pricing</li>
              <li>Careers</li>
              <li>Apps</li>
              <li>Podcast</li>
            </ul>
          </div>
          <div>
            <h6>Other</h6>
            <ul>
              <li>Groups</li>
              <li>Calendar</li>
              <li>Topics</li>
              <li>Cities</li>
              <li>Online Events</li>
              <li>Local Guides</li>
            </ul>
          </div>
        </div>
        <div className="footer-follow-section">
          <p>Follow us</p>
          <div>
            <img src={googleplay} alt="" />
            <img style={{ marginLeft: "10px" }} src={appstore} alt="" />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2022 Glocalbodh</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Help</p>
        </div>
      </div> */}
      <Footer />
    </Router>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoading } = state.loader;
  return {
    user,
    isLoading,
  };
}

export default connect(mapStateToProps)(App);
