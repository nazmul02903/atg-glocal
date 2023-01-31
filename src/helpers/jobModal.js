import Modal from 'react-bootstrap/Modal';
import jobType from "./../assets/Icons/jobType.svg";
import financialServices from "./../assets/Icons/financialServices.svg";
import alumni from "./../assets/Icons/alumni.svg";
import applicants from "./../assets/Icons/applicants.svg";
import skills from "./../assets/Icons/skills.svg";


function JobModal(props) { 
  const {selectedJob} = props;

  return (
    <Modal
      {...props}
      size="lg"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body style={{height: '92vh'}}>
        <div>
          <h2 className='fw-bold'>Career opportunity for {selectedJob.designation} at {selectedJob.location}</h2>
          <div className='flex items-center'>
            <img src={selectedJob.jobCategoryImageUrl} alt="" />
            <div className='mt-4'>
              <p>{selectedJob.companyName}</p>
              <p>{selectedJob.location}</p>
            </div>
          </div>
          <p>Posted: {selectedJob.expiryLabel}</p>
          <div className="text-gray-500 border-bottom">
            <div className="m-3 flex">
              <img src={jobType} alt="" />
              <p className="m-0 pl-5">{selectedJob.jobType}</p>
            </div>
            <div className="m-3 flex">
              <img src={financialServices} alt="" />
              <p className="m-0 pl-5">₹ 10,001+ employees · Financial Services</p>
            </div>
            <div className="m-3 flex">
              <img src={alumni} alt="" />
              <p className="m-0 pl-5">1 company alumni </p>
            </div>
            <div className="m-3 flex">
              <img src={applicants} alt="" />
              <p className="m-0 pl-5">See how you compare to 24 applicants</p>
            </div>
            <div className="m-3 flex">
              <img src={skills} alt="" />
              <p className="m-0 pl-5">Skills: Spring Framework, Systems Analysis,</p>
            </div>
            <div className="flex justify-center my-3">
              <button className="btn w-56 fs-5 mx-2 rounded-lg" style={{backgroundColor: '#E6E6E6'}}>Apply</button>
              <button className="btn w-56 fs-5 mx-2 rounded-lg" style={{backgroundColor: '#E6E6E6'}}>Save</button>
            </div>
          </div>
          <div>
            <h5 className='fw-bold my-3'>Job Description</h5>
            <h5 className='fw-bold my-3'>Job Summary</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <h5 className='fw-bold my-3'>Duties and Responsibilities</h5>
            <ol>
              <li>Lorem Ipsum is simply dummy text</li> 
              <li>Lorem Ipsum is simply dummy text</li> 
              <li>Lorem Ipsum is simply dummy text</li> 
              <li>Lorem Ipsum is simply dummy text</li> 
              <li>Lorem Ipsum is simply dummy text</li>
            </ol>
            <h5 className='fw-bold my-3'>About Company</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default JobModal;