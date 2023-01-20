import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/homepg/home.css";
import Logo from "../../assets/homepg/img/gb-logo.png";
import Graphic from "../../assets/homepg/img/graphic.png";
import ForFund from "../../assets/homepg/img/forFund.svg";
import CSRJob from "../../assets/homepg/img/csrJob.svg";
import CSRFund from "../../assets/homepg/img/csrFund.svg";
import GovFund from "../../assets/homepg/img/govFund.svg";
import GovJob from "../../assets/homepg/img/govJob.svg";
import NGOJob from "../../assets/homepg/img/ngoJob.svg";
import FirstSlider from "../../assets/slider/slider1.jpg";
import postReqSlider from "../../assets/slider/postreqSlider.jpg";
import service1 from "../../assets/service/service1.jpg";
import service2 from "../../assets/service/service2.jpg";
import service3 from "../../assets/service/service3.png";
import service4 from "../../assets/service/service4.jpg";
import EventBanner from "../../assets/homepg/img/banner.png";
import Phone1 from "../../assets/homepg/img/phone-1.png";
import Phone2 from "../../assets/homepg/img/phone-2.png";
import GlobeLogo from "../../assets/homepg/img/globe-logo.png";
import Function1 from "../../assets/homepg/img/function-1.png";
import Function2 from "../../assets/homepg/img/function-2.png";
import Function3 from "../../assets/homepg/img/function-3.png";
import UserService from "../../services/user.service";
import { alertCustom } from "../../helpers/alerts";
import { clearLoader, setLoader } from "../../store/actions/loader";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { useGoogleLogout } from "react-google-login";
import { logout } from "../../store/actions/auth";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

const services = [
  {
    title: "Report Writing",
    bgColor: "#DB8A7F",
    img: service1,
  },
  {
    title: "Project Proposal",
    bgColor: "#7FC5DB",
    img: service2,
  },
  {
    title: "Content Writing",
    bgColor: "#DBAB7F",
    img: service3,
  },
  {
    title: "Brochure Design",
    bgColor: "#9CDB7F",
    img: service4,
  },
  {
    title: "Content Writing",
    bgColor: "#DBAB7F",
    img: service3,
  },
  {
    title: "Brochure Design",
    bgColor: "#9CDB7F",
    img: service4,
  },
];

function Home(props) {
  const [banners, setBanners] = useState();
  const [categories, setCategories] = useState([]);
  const [subCategoriesEvents, setSubCategoriesEvents] = useState([]);
  const [subCategoriesJobs, setSubCategoriesJobs] = useState([]);
  const [subCategoriesFundings, setSubCategoriesFundings] = useState([]);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const handleLogout = () => {
    dispatch(setLoader());
    signOut();
  };

  const onLogoutSuccess = (res) => {
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(clearLoader());
    //console.log("Logged out Success");
  };

  const onFailure = () => {
     alertCustom("error", "Somthing went wrong", "/home");
    //console.log("Handle failure cases");
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  console.log("banners", banners);
  // console.log('categories', categories);
  // console.log('subCategoriesEvents', subCategoriesEvents);
  // console.log('subCategoriesJobs', subCategoriesJobs);
  // console.log('subCategoriesFundings', subCategoriesFundings);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setLoader());
    let userId = "";
    if (isLoggedIn) {
      userId = JSON.parse(localStorage.getItem("user")).userId;
    }
    // console.log(userId);
    UserService.homeV2(userId)
      .then((res) => {
        console.log(res);
        dispatch(clearLoader());
        setBanners(res.data.bannerBeans);
        setCategories(res.data.homeCategories);
        setSubCategoriesEvents(res.data.homeCategories[0].homeSubCategories);
        setSubCategoriesFundings(res.data.homeCategories[1].homeSubCategories);
        setSubCategoriesJobs(res.data.homeCategories[2].homeSubCategories);
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
  }, [isLoggedIn]);

  if (isLoggedIn && !subCategoriesEvents) {
    dispatch(setLoader());
    return null;
  }
  if (isLoggedIn && !subCategoriesFundings) {
    dispatch(setLoader());
    return null;
  }
  if (isLoggedIn && !subCategoriesJobs) {
    dispatch(setLoader());
    return null;
  } else {
    dispatch(clearLoader());
    return (
      <div className="home">
        <div className="home-navBar home-row">
          <Link to="/">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
          </Link>
          {!isLoggedIn ? (
            <div className="actions home-row">
              <div className="lang action">English</div>
              <Link to="/login" className="link-tags">
                <div className="logIn action">LogIn</div>
              </Link>
              <Link to="/register" className="link-tags">
                <div className="singUp action">SingUp</div>
              </Link>
            </div>
          ) : (
            <div>
              {user && (
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle variant="dark">
                      <h5 className="d-inline">{user.name}</h5>
                      {/* <img className='' src={user} height='50' alt='profileImg' /> */}
                    </Dropdown.Toggle>
                    {user.admin ? (
                      <Dropdown.Menu
                        className="dropdown-menu-dark"
                        variant="dark"
                      >
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
                        <Dropdown.Item
                          as={Link}
                          to="/login"
                          onClick={handleLogout}
                        >
                          <button className="p-2 btn btn-danger">Logout</button>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/dashboard/events">
                          My Events
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    ) : (
                      <Dropdown.Menu
                        variant="dark"
                        className="dropdown-menu-dark"
                      >
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
                        <Dropdown.Item
                          as={Link}
                          to="/login"
                          onClick={handleLogout}
                        >
                          <button className="p-2 btn btn-danger">Logout</button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </li>
              )}
            </div>
          )}
        </div>
        {/* nazmul hasan */}

        <div className="my-3">
          <Slider dots={true}>
            <img src={FirstSlider} alt="" />
            <img src={FirstSlider} alt="" />
            <img src={FirstSlider} alt="" />
            <img src={FirstSlider} alt="" />
          </Slider>
        </div>
        <div className="my-20">
          <div className="postReq-content">
            <h2>Post your requirements free !!</h2>
            <p className="mb-5">
              <span className="block mb-4">
                Posting our platform is completely free
              </span>
              <span>
                Post Events to get registrations from NGO community Post Jobs to
                get candidates to work in social secto Post to search NGOs that
                natch your project criteria
              </span>
            </p>
          </div>
          <Slider dots={true}>
            <div className="postReq-slider">
              <img src={postReqSlider} alt="" />
              <h4>Post An Event</h4>
            </div>
            <div className="postReq-slider">
              <img src={postReqSlider} alt="" />
              <h4>Post An Event</h4>
            </div>
            <div className="postReq-slider">
              <img src={postReqSlider} alt="" />
              <h4>Post An Event</h4>
            </div>
          </Slider>
        </div>

        {/* Service we Provide section */}
        <div className="service-provide">
          <h4>Services We Provide</h4>
          <p>Get your NGO verified by our experts</p>
          <div className="service-items">
            {services.map((service, i) => (
              <div
                style={{ backgroundColor: service.bgColor }}
                key={i}
                className="single-service"
              >
                <img src={service.img} alt="" />
                <span>{service.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sect-1 home-row">
          <div className="details">
            <div className="large-text">
              Connecting people working in NGOs to Opportunities
            </div>
            <div className="small-text">
              Whatever you’re looking to do this year, Meetup can help. For 20
              years, people have turned to Meetup to meet people, make friends,{" "}
            </div>
          </div>
          <div className="graphic">
            <img src={Graphic} alt="" />
          </div>
        </div>
        <div className="sect-2">
          {/* <div className="heading">How GlocalBodh Works</div>
          <div className="sub-text">
            Meet new people who share your interests through online and
            in-person events. It’s free to create an account.
          </div> */}
          <div className="divisions home-column">
            <div className="home-row divisions-row">
              {isLoggedIn &&
                subCategoriesEvents.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link to={`/event/${idx + 1}`} className="services-link">
                        <div className="imgBox eventBox">
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="division-name">{event.name}</div>
                      </Link>
                      <div className="division-subtext">
                        Do what you love, meet others who love it, find your
                        community. The rest is history!
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="home-row divisions-row">
              {isLoggedIn &&
                subCategoriesJobs.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link to={`/event/${idx + 1}`} className="services-link">
                        <div className="imgBox eventBox">
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="division-name">{event.name}</div>
                      </Link>
                      <div className="division-subtext">
                        Do what you love, meet others who love it, find your
                        community. The rest is history!
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="home-row divisions-row">
              {isLoggedIn &&
                subCategoriesFundings.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link to={`/event/${idx + 1}`} className="services-link">
                        <div className="imgBox eventBox">
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="division-name">{event.name}</div>
                      </Link>
                      <div className="division-subtext">
                        Do what you love, meet others who love it, find your
                        community. The rest is history!
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="sect-3">
          <div className="upcoming-events">
            <div className="top">
              <div className="upcoming-heading">Upcoming online events</div>
              <Link to="" className="link-tags">
                <div className="more">more</div>
              </Link>
            </div>
            <div className="card-holder home-row event-cardHolder horizontal-scroll">
              <div className="event-card">
                {/* {isLoggedIn && banners !== undefined && banners !== [] ? <h1>{banners[0].id}</h1> : '' } */}
                {/* <img
                  src={isLoggedIn && banners[0].imageUrl}
                  className="event-banner"
                  alt=""
                /> */}
                <div className="event-details">
                  <div className="event-date">Wed, Aug 31 · 11:00 PM UTC</div>
                  <div className="event-name">Getting To Know You</div>
                  <div className="event-subText">
                    World Gets Cozy Juicy Real
                  </div>
                </div>
                <div className="attendee">
                  <div className="elipticals"></div>
                  <div className="numb_attendee">499 attendee</div>
                </div>
              </div>
              <div className="event-card">
                {/* <img
                  src={isLoggedIn && banners[1].imageUrl}
                  className="event-banner"
                  alt=""
                /> */}
                <div className="event-details">
                  <div className="event-date">Wed, Aug 31 · 11:00 PM UTC</div>
                  <div className="event-name">Getting To Know You</div>
                  <div className="event-subText">
                    World Gets Cozy Juicy Real
                  </div>
                </div>
                <div className="attendee">
                  <div className="elipticals"></div>
                  <div className="numb_attendee">499 attendee</div>
                </div>
              </div>
              <div className="event-card">
                {/* <img
                  src={isLoggedIn && banners[2].imageUrl}
                  className="event-banner"
                  alt=""
                /> */}
                <div className="event-details">
                  <div className="event-date">Wed, Aug 31 · 11:00 PM UTC</div>
                  <div className="event-name">Getting To Know You</div>
                  <div className="event-subText">
                    World Gets Cozy Juicy Real
                  </div>
                </div>
                <div className="attendee">
                  <div className="elipticals"></div>
                  <div className="numb_attendee">499 attendee</div>
                </div>
              </div>
              <div className="event-card">
                <img src={EventBanner} className="event-banner" alt="" />
                <div className="event-details">
                  <div className="event-date">Wed, Aug 31 · 11:00 PM UTC</div>
                  <div className="event-name">Getting To Know You</div>
                  <div className="event-subText">
                    World Gets Cozy Juicy Real
                  </div>
                </div>
                <div className="attendee">
                  <div className="elipticals"></div>
                  <div className="numb_attendee">499 attendee</div>
                </div>
              </div>
              <div className="event-card">
                <img src={EventBanner} className="event-banner" alt="" />
                <div className="event-details">
                  <div className="event-date">Wed, Aug 31 · 11:00 PM UTC</div>
                  <div className="event-name">Getting To Know You</div>
                  <div className="event-subText">
                    World Gets Cozy Juicy Real
                  </div>
                </div>
                <div className="attendee">
                  <div className="elipticals"></div>
                  <div className="numb_attendee">499 attendee</div>
                </div>
              </div>
              <div className="event-card">
                <img src={EventBanner} className="event-banner" alt="" />
                <div className="event-details">
                  <div className="event-date">Wed, Aug 31 · 11:00 PM UTC</div>
                  <div className="event-name">Getting To Know You</div>
                  <div className="event-subText">
                    World Gets Cozy Juicy Real
                  </div>
                </div>
                <div className="attendee">
                  <div className="elipticals"></div>
                  <div className="numb_attendee">499 attendee</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="groups">
          <div className="top">
            <div className="popular">Popular Groups</div>
            <Link to="">
              <div className="more">more</div>
            </Link>
          </div>
          <div className="group-cards home-row horizontal-scroll">
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
            <div className="group-card home-column">
              <div className="name-icon home-row">
                <div className="g-icon-container">
                  <img src={Group1} className="g-icon" alt="" />
                </div>
                <div className="new-name home-column">
                  <div className="new">New</div>
                  <div className="g-name">The New Accusers Podcast</div>
                </div>
              </div>
              <hr />
              <div className="group-details home-column">
                <div className="group-date">Wed, Aug 31 · 11:00 PM UTC</div>
                <div className="group-subtext">Getting To Know You!</div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
        <div className="sect-4 home-row">
          <div className="phone1">
            <img src={Phone1} alt="" />
          </div>
          <div className="download-info home-column">
            <img src={GlobeLogo} className="globe-logo" alt="" />
            <div className="text">
              Stay connected. <br />
              Download the app.
            </div>
            <div className="store">
              <button className="playStore"></button>
              <button className="appStore"></button>
            </div>
          </div>
          <div className="phone2">
            <img src={Phone2} alt="" />
          </div>
        </div>
        <div className="sect-5 home-column">
          <div className="community-heading heading">
            {" "}
            Glocalbodh Communities
          </div>
          <div className="community-subtext subtext">
            People on Glocalboadh have fostered community, learned new skills,
            started businesses, and made life-long friends. Learn how.
          </div>
          <div className="community-cards home-row">
            <div className="community-card home-column">
              <div className="function-img-container">
                <img src={Function1} className="function-img" alt="" />
              </div>
              <div className="function-heading">
                Three Ways To Make Coworker Friendships While Working From Home
              </div>
              <div className="function-description">
                Work friendships don’t need to fade just because you’re working
                remotely. Here are three fun ways you can get to know your
                colleagues.
              </div>
            </div>
            <div className="community-card home-column">
              <div className="function-img-container">
                <img src={Function2} className="function-img" alt="" />
              </div>
              <div className="function-heading">
                Five Ways to Feel More Connected
              </div>
              <div className="function-description">
                Since Meetup began nearly 20 years ago, we’ve fostered
                connections between more than 50 million people in 190 countries
                worldwide. Here are five simple strategies to help you feel more
                connected and improve your wellbeing.
              </div>
            </div>
            <div className="community-card home-column">
              <div className="function-img-container">
                <img src={Function3} className="function-img" alt="" />
              </div>
              <div className="function-heading">
                How To Live Your Best Social Life
              </div>
              <div className="function-description">
                Social interaction is a key part of any healthy lifestyle.
                Discover all different kinds of events that’ll help you maintain
                a fun and fulfilling social life.
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="header"></div>
          <div className="links">
            <div className="account"></div>
            <div className="glocalBodh"></div>
            <div className="other"></div>
          </div>
          <div className="mobile-links">
            <div className="social-media">
              <h4></h4>
              <div className="social-links"></div>
            </div>
            <div className="buttons">
              <button className="playStore"></button>
              <button className="appStore"></button>
            </div>
          </div>
          <div className="footer-bottom"></div>
        </div>
      </div>
    );
  }
}

export default Home;
