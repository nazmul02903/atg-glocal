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
import csr from "../../assets/homepg/img/csr.svg";
import services1 from "../../assets/homepg/img/services1.svg"
import services2 from "../../assets/homepg/img/services2.svg"
import services3 from "../../assets/homepg/img/services3.svg"
import appstore from "../../assets/homepg/img/appstore.svg"
import googleplay from "../../assets/homepg/img/googleplay.svg"
import clients from "../../assets/homepg/img/clients.svg"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsDetailModal from "../../helpers/newsDetail";
import Footer from "../footer.component";
import { useTranslation } from "react-i18next";
import NgoCorporateService from "./ngoCorporate.component";

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
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loginActive, setLoginActive] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [news, setNews] = useState([]);
  const [newsDetailModalActive, setNewsDetailModalActive] = useState(true);
  const [newsDetail, setNewsDetail] = useState({});
  const { t } = useTranslation();
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
    // alertCustom("error", "Somthing went wrong", "/home");
    //console.log("Handle failure cases");
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  const handleNewsClick = (newsBean) => {
    setNewsDetail(newsBean);
    setNewsDetailModalActive(true);
  };
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
        setNews(res.data.newsBeans);
      })
      .catch((error) => {
        console.log("error", error.response);
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
        <div className="container home">
          {/* nazmul hasan */}

          <div className="mb-1 banner-slider">
            <Slider autoplay={true} speed={3000} dots={true}>
              {banners.map((banner) => {
                return <img onClick={() => { window.location.href = banner.externalLink }} className="cursor-pointer" src={banner.imageUrl} alt="" />;
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
              <p className="font-semibold home-category-title">
                {t('Social Sector Updates.1')}
              </p>
              <p className="home-category-subtitle">
                {t('Get latest news & updates from the social sector.1')}
              </p>
              <div className="home-row divisions-row">
                {subCategoriesEvents.map((event, idx) => {
                  return (
                    <div className="division" key={idx}>
                      <Link to={`/event/${idx + 1}`} className="services-link">
                        <div className="imgBox eventBox">
                          <div className="font-semibold division-name-inside">
                            {t(`${event.name === 'Awards/Competitions' ? 'Awards/Contests' : event.name}.1`)}
                          </div>
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="font-semibold division-name">
                          {t(`${event.name === 'Awards/Competitions' ? 'Awards/Contests' : event.name}.1`)}
                        </div>
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
                            {t(`${event.name}.1`)}
                          </div>
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="font-semibold division-name">
                          {t(`${event.name}.1`)}
                        </div>
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
                            {t(`${event.name}.1`)}
                          </div>
                          <img src={event.imageUrl} className="icon" alt="" />
                        </div>
                        <div className="font-semibold division-name">
                          {t(`${event.name}.1`)}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* csr */}
          {/* <div className="csr-funding-homepage">
            <h1>
              {t('CSR Funding Eligibility Test.1')}
            </h1>
            <p>
              {t('Get Your NGO Verified By Our Experts.1')}
            </p>
            <img src={csrFunding} alt="" />
            <button onClick={() => history.push("/csrForm")}>
              {t('START CSR TEST.1')}
            </button>
          </div>

          <div className="csr-funding-homepage-lg">
            <div>
              <h6>
                {t('Is your organisation eligible for.1')}
              </h6>
              <h1>
                {t('CSR.1')}
              </h1>
              <h3>
                {t('Funding?.1')}
              </h3>
            </div>
            <img src={csr} alt="" />
            <div className="csr-fund-info">
              <p>
                {t(`Take our CSR Eligibility Test to determine your company's readiness to implement socially responsible initiatives. Start making a positive impact today!.1`)}
              </p>
              <button onClick={() => history.push("/csrForm")}>
                {t('TEST NOW.1')}
              </button>
            </div>
          </div> */}



          {/* 
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
                  <img
                    src={isLoggedIn && banners[1].imageUrl}
                    className="event-banner"
                    alt=""
                  />
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
          </div> 
          */}

          {/* Phone images */}
          {/* <div className="sect-4 home-row">
            <div className="phone1">
              <img src={Phone1} alt="" />
            </div>
            <div className="download-info home-column">
              <img src={GlobeLogo} className="globe-logo" alt="" />
              <div className="text">

                {t('Stay connected..1')}
                <br />

                {t('Download the app..1')}
              </div>
              <div className="store">
                <button className="playStore"></button>
                <button className="appStore"></button>
              </div>
            </div>
            <div className="phone2">
              <img src={Phone2} alt="" />
            </div>
          </div> */}

          <NgoCorporateService ngo={true} />
          <NgoCorporateService />

          <div className="my-24">
          <h2 className="service_heading text-center">
              Our Clients
          </h2>
          <div className="d-flex justify-center">
            <img className="w-100" src={clients} alt="" />
            <img className="d-none d-lg-block" src={clients} alt="" />
          </div>
          </div>

          <div className="sect-5 home-column">
            <div className="community-heading heading d-none d-lg-block">
              {" "}
              {/* {t('Blogs.1')} */}
              GB Highlights
            </div>
            <div className="community-heading heading d-lg-none">
              {" "}
              {/* {t('Blogs.1')} */}
              GB Highlights
            </div>
            <div className="community-subtext subtext d-none d-lg-block">
              {t('People on Glocalboadh have fostered community, learned new skills, started businesses, and made life-long friends. Learn how..1')}
            </div>
            <Slider className="d-none d-lg-block" dots={true} slidesToShow={3} slidesToScroll={3}  >
              {newsBeans.map((bean, i) => (
                <div className="cursor-pointer community-card community-slider home-column" onClick={() => handleNewsClick(bean)}>
                  <div className="function-img-container">
                    <img src={bean.newsLink.slice(0, 5) === 'https' ? bean.newsLink : Function1}
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
            <Slider className="d-lg-none" dots={true} slidesToShow={1} slidesToScroll={3}  >
              {newsBeans.map((bean, i) => (
                <div className="cursor-pointer community-card community-slider home-column" onClick={() => handleNewsClick(bean)}>
                  <div className="function-img-container">
                    <img src={bean.newsLink.slice(0, 5) === 'https' ? bean.newsLink : Function1}
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

          {/* <div className="my-20 postReq-wrapper">
            <div className="postReq-content">
              <h2>
                {t('Post your requirements free.1')}!!
              </h2>
              <p className="mb-5">
                <span className="block mb-4">
                  {t('Posting our platform is completely free.1')}
                </span>
                <span>
                  {t('Post Events to get registrations from NGO community Post Jobs to get candidates to work in social secto Post to search NGOs that natch your project criteria.1')}
                </span>
              </p>
            </div>
            <Slider dots={true}>
              <div className="postReq-slider">
                <img src={postReqSlider} alt="" />
                <h4>
                  {t('Post An Event.1')}
                </h4>
              </div>
              <div className="postReq-slider">
                <img src={postReqSlider} alt="" />
                <h4>
                  {t('Post An Event.1')}
                </h4>
              </div>
              <div className="postReq-slider">
                <img src={postReqSlider} alt="" />
                <h4>
                  {t('Post An Event.1')}
                </h4>
              </div>
            </Slider>
          </div> */}

          {/* Service we Provide section */}
          {/* <div className="service-provide">
            <h4>
              {t('Services We Provide.1')}
            </h4>
            <p>
              {t('Get your NGO verified by our experts.1')}
            </p>
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
          </div> */}

          {/* <div className="footer-sm">
            <BottomBar />
          </div> */}

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
                <img src={appstore} alt="" />
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2022 Glocalbodh</p>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
              <p>Help</p>
            </div>
          </div> */}
        </div>

        {/* <Footer /> */}
        <LoginComponent show={loginActive} handleClose={closeLoginModal} />
        <NewsDetailModal
          show={newsDetailModalActive}
          handleClose={() => setNewsDetailModalActive(false)}
          newsDetail={newsDetail}
        />
      </>
    );
  }
}

export default Home;
