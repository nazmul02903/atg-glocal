import React, { useState } from "react";

import appstore from "../assets/homepg/img/appstore.svg";
import googleplay from "../assets/homepg/img/googleplay.svg";
import RegistermodalComponent from "./auth/registermodal.component";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

export default function Footer() {
  const [signUpActive, setSignUpActive] = useState(false);

  return (
    <>
      <div className="home-footer">
        <div className="footer-header">
          <p>Create your GlocalBodh account</p>
          <button onClick={() => setSignUpActive(true)}>Get Started</button>
        </div>
        <div className="grid grid-cols-12 footer-content">
          <div className="col-span-12 mb-5 md:col-span-4">
            <h6>Your Account</h6>
            <ul>
              <li
                onClick={() => {
                  setSignUpActive(true);
                }}
              >
                Sign up
              </li>
              {/* <li>Log in</li> */}
              {/* <li>Help</li> */}
              <li
                onClick={() =>
                  window.open("https://forms.gle/YUz1DXC1QKeajCP16", "_blank")
                }
              >
                Become an affiliate
              </li>
            </ul>
          </div>
          <div className="col-span-12 mb-5 md:col-span-4">
            <h6>GlocalBodh</h6>
            <ul>
              <li
                onClick={() =>
                  window.open(
                    "https://glocalbodh.webflight.in/#https://glocalbodh.webflight.in/#!/company",
                    "_blank"
                  )
                }
              >
                About
              </li>
              {/* <li>Blog</li> */}
              {/* <li>Pricing</li> */}
              {/* <li>Careers</li> */}
              <li
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.nktech.renovateindia",
                    "_blank"
                  )
                }
              >
                Apps
              </li>
              {/* <li>Podcast</li> */}
            </ul>
          </div>
          <div className="col-span-12 mb-5 md:col-span-4">
            <h6
              className="font-medium cursor-pointer"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=919004810804&text=Hello",
                  "_blank"
                )
              }
            >
              Join GlocalBodh WhatsApp Groups to stay connected
            </h6>
            {/* <ul>
                     <li>Groups</li>
                     <li>Calendar</li>
                     <li>Topics</li>
                     <li>Cities</li>
                     <li>Online Events</li>
                     <li>Local Guides</li>
                  </ul> */}
          </div>
        </div>
        <div className="footer-follow-section">
          <div className="gap-2 d-flex">
            <p> Follow us </p>
            <span
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=100075979995790",
                  "_blank"
                )
              }
              className="cursor-pointer"
            >
              <AiFillFacebook size={22} />
            </span>
            <span
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/glocal-bodh/mycompany/",
                  "_blank"
                )
              }
              className="cursor-pointer"
            >
              <AiFillLinkedin size={22} />
            </span>
            <span
              onClick={() =>
                window.open(" https://www.instagram.com/glocalbodh/", "_blank")
              }
              className="cursor-pointer"
            >
              <AiFillInstagram size={22} />
            </span>
          </div>
          <div>
            <img
              src={googleplay}
              alt=""
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.nktech.renovateindia",
                  "_blank"
                )
              }
              className="cursor-pointer"
            />
            {/* <img src={appstore} alt="" /> */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Glocalbodh</p>
          <p
            onClick={() =>
              window.open("https://www.glocalbodh.com/terms", "_blank")
            }
          >
            Terms of Service
          </p>
          <p
            onClick={() =>
              window.open("https://www.glocalbodh.com/privacyPolicy", "_blank")
            }
          >
            Privacy Policy
          </p>
          <p>Help</p>
        </div>
      </div>
      <RegistermodalComponent
        show={signUpActive}
        handleClose={() => setSignUpActive(false)}
        handleLogin={() => {}}
      />
    </>
  );
}
