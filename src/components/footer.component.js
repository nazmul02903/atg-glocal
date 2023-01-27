import React, { useState } from 'react'

import appstore from "../assets/homepg/img/appstore.svg"
import googleplay from "../assets/homepg/img/googleplay.svg"
import RegistermodalComponent from './auth/registermodal.component'

export default function Footer() {

   const [signUpActive, setSignUpActive] = useState(false)


   return (
      <>
         <div className="home-footer">
            <div className="footer-header">
               <p>Create your GlocalBodh account</p>
               <button onClick={() => setSignUpActive(true)} >Get Started</button>
            </div>
            <div className="footer-content grid grid-cols-12">
               <div className='col-span-12 md:col-span-4 mb-5'>
                  <h6>Your Account</h6>
                  <ul>
                     <li>Sign up</li>
                     {/* <li>Log in</li> */}
                     {/* <li>Help</li> */}
                     <li>Become an affiliate</li>
                  </ul>
               </div>
               <div className='col-span-12 md:col-span-4 mb-5' >
                  <h6>GlocalBodh</h6>
                  <ul>
                     <li>About</li>
                     {/* <li>Blog</li> */}
                     {/* <li>Pricing</li> */}
                     {/* <li>Careers</li> */}
                     <li onClick={()=> window.open('https://play.google.com/store/apps/details?id=com.nktech.renovateindia', '_blank')} >Apps</li>
                     {/* <li>Podcast</li> */}
                  </ul>
               </div>
              <div className='col-span-12 md:col-span-4 mb-5'>
                  <h6 className='font-medium'>Join GlocalBodh WhatsApp Groups to stay connected</h6>
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
               <p onClick={()=> window.open('https://www.facebook.com/Glocal-Bodh-111320554665937', '_blank')} className='cursor-pointer' >Follow us</p>
               <div>
                  <img src={googleplay} alt="" 
                  onClick={()=> window.open('https://play.google.com/store/apps/details?id=com.nktech.renovateindia', '_blank')}
                  />
                  {/* <img src={appstore} alt="" /> */}
               </div>
            </div>
            <div className="footer-bottom">
               <p>© 2023 Glocalbodh</p>
               <p onClick={()=> window.open('https://www.glocalbodh.com/terms', '_blank')}>Terms of Service</p>
               <p onClick={()=> window.open('https://www.glocalbodh.com/privacyPolicy', '_blank')}>Privacy Policy</p>
               <p>Help</p>
            </div>
         </div>
         <RegistermodalComponent show={signUpActive}
            handleClose={() => setSignUpActive(false)}
            handleLogin={() => { }} />
      </>
   )
}
