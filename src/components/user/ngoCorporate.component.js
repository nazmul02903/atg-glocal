import left from "../../assets/ngocorporate/left.jpg";
import right from "../../assets/ngocorporate/right.png";
import employee from "../../assets/ngocorporate/employee.png";
import Characters from "../../assets/ngocorporate/Characters.png";
import job from "../../assets/ngocorporate/job.svg";
import event from "../../assets/ngocorporate/event.svg";
import csr from "../../assets/ngocorporate/csr.svg";
import advertise from "../../assets/ngocorporate/advertise.svg";
import network from "../../assets/ngocorporate/network.svg";
import search from "../../assets/ngocorporate/search.svg";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginComponent from "../auth/login.component";
import RegisterComponent from "../auth/registermodal.component";
import { useSelector } from "react-redux";

const corporates = [
  {
    id: 4,
    icon: network,
    iconTitle: "Employee Engagement",
    paragraph:
      "Connect with Beneficiaries for your Events within Social Sector",
    btn: "VOLUNTEERING",
  },

  {
    id: 2,
    icon: csr,
    iconTitle: "CSR Events",
    paragraph:
      "Connect with Beneficiaries for your Events within Social Sector",
    btn: "PARTICIPATE",
    linkTo: "/posting",
  },
  {
    id: 3,
    icon: search,
    iconTitle: "NGO Search",
    paragraph:
      "Connect with Beneficiaries for your Events within Social Sector",
    btn: "NGO SEARCH",
    linkTo: "/user/create/fundingUpdate",
  },
  {
    id: 1,
    icon: job,
    iconTitle: "Post CSR Jobs",
    paragraph: "Reach out to  Relevant  Candidates through Free Posting",
    btn: "POST JOBS",
    linkTo: "/user/create/job",
  },
];

const ngos = [
  {
    id: 3,
    icon: csr,
    iconTitle: "Post Events",
    paragraph: "Reach out to Relevant Candidates through Free Posting",
    btn: "POST EVENT",
    linkTo: "/posting",
  },
  {
    id: 2,
    icon: event,
    iconTitle: "CSR Test",
    paragraph: "Take a Quick test to know CSR Funding Eligibility",
    btn: "Give Test",
    linkTo: "/csrForm",
  },

  {
    id: 4,
    icon: advertise,
    iconTitle: "Advertise",
    paragraph: "Reach out to Relevant Candidates through Free Posting",
    btn: "KNOW MORE",
  },
  {
    id: 1,
    icon: job,
    iconTitle: "Post Jobs",
    paragraph: "Reach out to Relevant Candidates through Free Posting",
    btn: "Post Jobs",
    linkTo: "/user/create/job",
  },
];

const NgoCorporateService = ({ ngo }) => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [loginActive, setLoginActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = () => {
    setLoginActive(true);
    setSignUpActive(false);
  };

  const handleSignup = () => {
    setLoginActive(false);
    setSignUpActive(true);
  };
  const closeLoginModal = () => setLoginActive(false);

  useEffect(() => {
    setData(ngo ? ngos : corporates);
  }, []);
  return (
    <>
      <div className="text-center ngo_service_wrap">
        <h2 className="service_heading">
          Services For {ngo ? "NGO’s/Govt." : "Corporates/Institutions"}{" "}
        </h2>
        <div className="gap-10 justify-center align-items-end d-flex">
          <img
            className="service_left_img"
            src={ngo ? left : employee}
            alt="left"
          />
          <div className="service_mid_text">
            {!ngo && <p className="service_pic_mid">Facilitated Projects</p>}
            <h2 className="text-left service_big_font">
              {ngo ? (
                <>
                  4000 + <br /> NGOs
                </>
              ) : (
                "50 +"
              )}
            </h2>
            <p className="service_pic_mid">
              {ngo ? "on a single Platform" : "through CSR Initiatives"}
            </p>
          </div>
          <img
            className="service_right_img"
            src={ngo ? right : Characters}
            alt="left"
          />
        </div>
        {ngo ? (
          <p className="my-4 mobile_visible">
            <span style={{ fontWeight: 700 }}>100 +</span> NGOs On a single
            Platform
          </p>
        ) : (
          <p className="my-4 mobile_visible">
            {" "}
            Facilitated <span style={{ fontWeight: 700 }}>
              50 + projects
            </span>{" "}
            through <span style={{ fontWeight: 700 }}>CSR Initiatives</span>{" "}
          </p>
        )}
        <div className="mt-16 d-flex service-wrapper">
          {data.map((each) => (
            <div className="d-flex flex-column service_card">
              <div className="gap-1 align-items-center d-flex">
                <img className="service_icon" src={each.icon} alt="" />
                <h4 className="icon_title">{each.iconTitle}</h4>
              </div>
              <p className="service_para">{each.paragraph}</p>
              <span
                className="service_btn"
                onClick={() => {
                  if (isLoggedIn) {
                    each.linkTo && history.push(each.linkTo);
                    window.scrollTo(0, 0);
                  } else {
                    setLoginActive(true);
                  }
                }}
              >
                {each.btn}
              </span>
            </div>
          ))}
        </div>
      </div>
      <LoginComponent
        show={loginActive}
        handleClose={closeLoginModal}
        handleSignup={handleSignup}
      />
      <RegisterComponent
        show={signUpActive}
        handleClose={() => setSignUpActive(false)}
        handleLogin={handleLogin}
      />
    </>
  );
};

export default NgoCorporateService;
