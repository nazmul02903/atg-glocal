import React, { useEffect, useState } from "react";
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
   FaClipboard,
   FaCopy
} from "react-icons/fa";

const ShareEventModal = (props) => {
   const { show, handleClose, newsDetail, shareUrl, shareText } = props
   var el = document.createElement("a");
   el.href = window.location.href;

   const [messageVisible, setMessageVisible] = useState(false)

   let timeoutId = null
   const handleclick = () => {
      navigator.clipboard.writeText(shareUrl);
      setMessageVisible(true)
      timeoutId = setTimeout(() => {
         setMessageVisible(false)
         clearTimeout(timeoutId)
      }, 5000);
   }
   useEffect(() => {
      return () => clearTimeout(timeoutId)
   }, [])

   const shareButtonProps = [
      {
         url: shareUrl ? shareUrl : el.href,
         network: "Facebook",
         text: shareText ? shareText : "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaFacebook
      },
      {
         url: shareUrl ? shareUrl : el.href,
         network: "Email",
         text: shareText ? shareText : "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaEnvelope
      },
      // {
      //    url: shareUrl ? shareUrl : el.href,
      //    network: "WhatsApp",
      //    text: shareText ? shareText : "checkout this event",
      //    longtext: "Don't miss out on the opportunity!",
      //    Comp: FaWhatsapp
      // },
      {
         url: shareUrl ? shareUrl : el.href,
         network: "Twitter",
         text: shareText ? shareText : "checkout this event",
         longtext: "Don't miss out on the opportunity!",
         Comp: FaTwitter
      },
      {
         url: shareUrl ? shareUrl : el.href,
         network: "Linkedin",
         text: shareText ? shareText : "checkout this event",
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
               <button
                  className="social-media-btn flex justify-center items-center share-event-button"
                  style={{ backgroundColor: 'rgb(149 149 149)' }}
                  onClick={handleclick}
               >
                  <FaCopy />
               </button>
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
               <button
                  className="social-media-btn flex justify-center items-center share-event-button"
                  style={{ backgroundColor: 'rgb(61 218 25)' }}
                  onClick={() => {
                     window.open(`https://wa.me?text=${shareUrl}`)
                  }}
               >
                  <FaWhatsapp />
               </button>
               {/* <ShareButton
                  {...shareButtonProps[0]}
                  className="social-media-btn">
                  <FaFacebook />
               </ShareButton>*/}
            </div>
            <div className={`text-left ${messageVisible ? 'opacity-100' : 'opacity-0'} transition `}>
               Message copied to clipboard
            </div>
         </div>
         <div className="modal-close-icon">
            <img src={Cross} onClick={handleClose ? handleClose : () => { }} alt="" />
         </div>


      </Modal>
   );
};



export default (ShareEventModal);
