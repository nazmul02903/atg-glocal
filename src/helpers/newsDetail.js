import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Function1 from "../assets/homepg/img/function-1.png";


import Cross from "../assets/Icons/cross.svg";
import Logo from "../assets/Icons/App-Icon.svg";

const NewsDetailModal = (props) => {
   const { show, handleClose, newsDetail } = props
   const { description, title, newsLink } = newsDetail
   
   if(!newsDetail) return <></>
   if(Object.keys(newsDetail).length === 0) return <></>
   
   return (
      <Modal
         show={show}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
         scrollable={true}
         className='news-modal'
      >
         <div className='col-12 justify-content-center py-6 flex items-center'>

            <div className="community-card home-column cursor- modal-community-card" >
               <div className="function-img-container">
                  <img src={newsLink.slice(0,5) === 'https' ? newsLink :Function1} className="function-img" alt="" />
               </div>
               <div className="function-heading">{title.slice(1, 50)}</div>
               <div className="function-description"  dangerouslySetInnerHTML={{ __html: description }}>
                  {/* {description} */}
               </div>
            </div>
         </div>
         <div className="modal-close-icon">
            <img src={Cross} onClick={handleClose ? handleClose : () => { }} />
         </div>

         {/* <Modal.Footer>
        <button className='btn btn-primary'
        onClick={handleClose ? handleClose : ()=>{}}
        >
          Close
        </button>
      </Modal.Footer> */}
      </Modal>
   );
};



export default (NewsDetailModal);
