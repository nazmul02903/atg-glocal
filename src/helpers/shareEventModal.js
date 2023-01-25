import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { ShareButton } from "react-custom-share";

import Cross from "../assets/Icons/cross.svg";
import Logo from "../assets/Icons/App-Icon.svg";
import {
   FaEnvelope,
   FaFacebook,
   FaLinkedin,
   FaTwitter,
   FaWhatsapp,
} from "react-icons/fa";

const ShareEventModal = (props) => {
   const { show, handleClose, newsDetail } = props
   var el = document.createElement("a");
   el.href = window.location.href;

   const shareButtonProps = [
      {
         url: el.href,
         network: "Facebook",
         text: "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaFacebook
      },
      {
         url: el.href,
         network: "Email",
         text: "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaEnvelope
      },
      {
         url: el.href,
         network: "WhatsApp",
         text: "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaWhatsapp
      },
      {
         url: el.href,
         network: "Twitter",
         text: "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaTwitter
      },
      {
         url: el.href,
         network: "Linkedin",
         text: "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaLinkedin
      },
   ];

   return (
      <Modal
         show={show}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
         scrollable={true}
         className='share-icons-modal'
      >
         <div className='col-12 justify-content-center py-6 flex flex-col items-center'>
            <p className="share-event-head"> Share the event ! </p>
            <div className="social-media? flex flex-col md:flex-row">
               {
                  shareButtonProps.map(btn => {
                     const { Comp } = btn
                     return <ShareButton
                        {...btn}
                        className="social-media-btn flex justify-center items-center share-event-button"
                     >
                        <Comp />
                     </ShareButton>
                  })
               }
               {/* <ShareButton
                  {...shareButtonProps[0]}
                  className="social-media-btn">
                  <FaFacebook />
               </ShareButton>*/}
            </div>
         </div>
         <div className="modal-close-icon">
            <img src={Cross} onClick={handleClose ? handleClose : () => { }} />
         </div>


      </Modal>
   );
};



export default (ShareEventModal);
