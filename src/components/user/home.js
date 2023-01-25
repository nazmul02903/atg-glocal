import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import LoginComponent from "../auth/login.component";
import BottomBar from "../bottom-bar/bottomBar.component";
import csrFunding from "../../assets/homepg/img/csrFunding.svg";
import bro from "../../assets/homepg/img/bro.svg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsDetailModal from "../../helpers/newsDetail";

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
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategoriesEvents, setSubCategoriesEvents] = useState([]);
  const [subCategoriesJobs, setSubCategoriesJobs] = useState([]);
  const [subCategoriesFundings, setSubCategoriesFundings] = useState([]);
  const [newsBeans, setNewsBeans] = useState([]);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)
  const [loginActive, setLoginActive] = useState(false)
  const { user } = useSelector(state => state.auth)
  const [news, setNews] = useState([])
  const [newsDetailModalActive, setNewsDetailModalActive] = useState(true)
  const [newsDetail, setNewsDetail] = useState({})

  // console.log(user);
  const history = useHistory();
  const handleLogout = () => {
    dispatch(setLoader());
    signOut();
  };

  const onLogoutSuccess = (res) => {
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(clearLoader());
    window.location = "/";
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
  const handleNewsClick = (newsBean) => {
    setNewsDetail(newsBean)
    setNewsDetailModalActive(true)
  }
  // console.log("newsDetail", newsDetail)
  // console.log("newsBeans", newsBeans)
  // console.log("banners", banners)
  // console.log('categories', categories);
  // console.log('subCategoriesEvents', subCategoriesEvents);
  // console.log('subCategoriesJobs', subCategoriesJobs);
  // console.log('subCategoriesFundings', subCategoriesFundings);

  const openLoginModal = () => setLoginActive(true);
  const closeLoginModal = () => setLoginActive(false);

  useEffect(() => {
    // if (!isLoggedIn) return
    dispatch(setLoader());
    let userId = "";
    if (isLoggedIn) {
      userId = JSON.parse(localStorage.getItem("user")).userId;
    }
    // console.log(userId);
    UserService.homeAssets()
      .then((res) => {
        console.log("data", res.data);
        setNewsBeans(res.data.newsBeans);
        dispatch(clearLoader());
        setBanners(res.data.bannerBeans);
        setCategories(res.data.homeCategories);
        setSubCategoriesEvents(res.data.homeCategories[0].homeSubCategories);
        setSubCategoriesFundings(res.data.homeCategories[1].homeSubCategories);
        setSubCategoriesJobs(res.data.homeCategories[2].homeSubCategories);
        setNews(res.data.newsBeans)
      }).catch((error) => {
        console.log('error', error.response);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alertCustom("error", message, "/home");
      });
  }, []);

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
      <>
        <div className="home">
          {/* nazmul hasan */}

          <div className="my-3 banner-slider">
            <Slider dots={true}>
              {banners.map((banner) => {
                return <img src={banner.imageUrl} alt="" />;
              })}
              {/* <img src={FirstSlider} alt="" />
              <img src={FirstSlider} alt="" />
              <img src={FirstSlider} alt="" /> */}
            </Slider>
          </div>
          
          <div className="sect-2">
            {/* <div className="heading">How GlocalBodh Works</div>
          <div className="sub-text">
            Meet new people who share your interests through online and
            in-person events. It’s free to create an account.
          </div> */}
            <div className="divisions home-column">
              <div className="home-row divisions-row">
                {subCategoriesEvents.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link to={`/event/${idx + 1}`} className="services-link">
                        <div className="imgBox eventBox">
                          <div className="division-name-inside">
                            {event.name}
                          </div>
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="division-name">{event.name}</div>
                      </Link>
                      {/* <div className="division-subtext">
                        Do what you love, meet others who love it, find your
                        community. The rest is history!
                      </div> */}
                    </div>
                  );
                })}
              </div>

              <div className="home-row divisions-row">
                {subCategoriesFundings.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link
                        to={`/fundingUpdates/${idx + 1}`}
                        className="services-link"
                      >
                        <div className="imgBox eventBox">
                          <div className="division-name-inside">
                            {event.name}
                          </div>
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="division-name">{event.name}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="home-row divisions-row">
                {subCategoriesJobs.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link to={`/jobs/${idx + 1}`} className="services-link">
                        <div className="imgBox eventBox">
                          <div className="division-name-inside">
                            {event.name}
                          </div>
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="division-name">{event.name}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="csr-funding-homepage">
            <h1>CSR Funding Eligibility Test</h1>
            <p>Get Your NGO Verified By Our Experts</p>
            <img src={csrFunding} alt="" />
            <button onClick={() => history.push("/csrForm")}>
              START CSR TEST
            </button>
          </div>

          <div className="csr-funding-homepage-lg">
            <div>
              <h6>Is your organisation eligible for</h6>
              <h1>CSR</h1>
              <h3>Funding?</h3>
            </div>
            <img src={bro} alt="" />
            <div className="csr-fund-info">
              <p>
                Take our CSR Eligibility Test to determine your company's readiness to implement socially responsible initiatives. Start making a positive impact today!
              </p>
              <button onClick={() => history.push('/csrForm')} >TEST NOW</button>
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

          {/* <div className="sect-5 home-column">
            <div className="community-heading heading">
              {" "}
              Glocalbodh Communities
            </div>
            <div className="community-subtext subtext">
              People on Glocalboadh have fostered community, learned new skills,
              started businesses, and made life-long friends. Learn how.
            </div>
            <Slider dots={true} slidesToShow={3} slidesToScroll={3}  >
              {newsBeans.map((bean, i) => (
                <div className="community-card community-slider home-column cursor-pointer" onClick={() => handleNewsClick(bean)}>
                  <div className="function-img-container">
                    <img src={bean.newsLink.slice(0,5) === 'https' ? bean.newsLink :Function1} 
                    className="function-img" alt="" />
                  </div>
                  <div className="function-heading">{bean.title.slice(0, 50)}</div>
                  <div className="function-description"
                    dangerouslySetInnerHTML={{
                      __html: bean.description.length > 100 ? `${bean.description.slice(3, 100)}...`
                        : bean.description
                    }}>

                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="my-20 postReq-wrapper">
            <div className="postReq-content">
              <h2>Post your requirements free !!</h2>
              <p className="mb-5">
                <span className="block mb-4">
                  Posting our platform is completely free
                </span>
                <span>
                  Post Events to get registrations from NGO community Post Jobs
                  to get candidates to work in social secto Post to search NGOs
                  that natch your project criteria
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
                <div className="service-wrapper">
                  <div
                    style={{ backgroundColor: service.bgColor }}
                    key={i}
                    className="single-service"
                  >
                    <img src={service.img} alt="" />
                    <span>{service.title}</span>
                  </div>
                </div>
              ))}
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
            <div className="footer-bottom">
              <BottomBar />
            </div>
          </div>
        </div>

        <LoginComponent show={loginActive} handleClose={closeLoginModal} />
        <NewsDetailModal show={newsDetailModalActive}
          handleClose={() => setNewsDetailModalActive(false)} newsDetail={newsDetail} />
      </>
    );
  }
}

export default Home;
