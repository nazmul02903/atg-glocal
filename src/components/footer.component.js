import React from 'react'

import appstore from "../assets/homepg/img/appstore.svg"
import googleplay from "../assets/homepg/img/googleplay.svg"

export default function Footer() {


   return (
      <div className="home-footer">
         <div className="footer-header">
            <p>Create your Glocalbodh account</p>
            <button>Get Started</button>
         </div>
         <div className="footer-content grid grid-cols-12">
            <div className='col-span-12 md:col-span-4 mb-5'>
               <h6>Your Account</h6>
               <ul>
                  <li>Sign up</li>
                  <li>Log in</li>
                  <li>Help</li>
                  <li>Become an affiliate</li>
               </ul>
            </div>
            <div className='col-span-12 md:col-span-4 mb-5' >
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
            <div className='col-span-12 md:col-span-4 mb-5'> 
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
      </div>
   )
}
