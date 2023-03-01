import Modal from 'react-bootstrap/Modal';
import jobType from "./../assets/Icons/jobType.svg";
import financialServices from "./../assets/Icons/financialServices.svg";
import alumni from "./../assets/Icons/alumni.svg";
import applicants from "./../assets/Icons/applicants.svg";
import skills from "./../assets/Icons/skills.svg";
import parse from "html-react-parser";

function JobModal(props) {
  const { selectedJob, handleApplyJobForm } = props;
  console.log(selectedJob)
  const date = new Date(selectedJob?.createdDate);
  const day = date.getDate();

  if (!selectedJob) return <></>
  return (
    <Modal
      {...props}
      size="lg"
      className="fs-4"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h2 className='fw-bold'>Career opportunity for {selectedJob.designation} at {selectedJob.location}</h2>
          <div className='flex items-center'>
            <img src={selectedJob.jobCategoryImageUrl} alt="" />
            <div className='mt-4'>
              <p>{selectedJob.companyName}</p>
              <p>{selectedJob.location}</p>
            </div>
          </div>
          <p>Posted: {day} day{day > 1 && 's'} ago</p>
          <div className="text-gray-500 border-bottom">
            {/* <div className="m-3 flex">
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
              <button className="btn w-1/2 fs-3 mx-5 rounded-lg" style={{ backgroundColor: '#E6E6E6' }}>Apply</button>
              <button className="btn w-1/2 fs-3 mx-5 rounded-lg" style={{ backgroundColor: '#E6E6E6' }}>Save</button>
            </div> */}
            {
              selectedJob?.requirement && parse(selectedJob.requirement)
            }
            <div className='px-1 mb-3 mt-3'>
              <button onClick={() => handleApplyJobForm(selectedJob?.jobId)} className="btn px-4 py-2 bg-[#0057A8]  fs-5  rounded-lg fw-lighter text-white" style={{background: '#0057A8'}} >Apply</button>

            </div>
          </div>
          <div className='mt-5'>
            {/* <h4 className='fw-bold my-3'>Job Description</h4>
            <h4 className='fw-bold my-3'>Job Summary</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <h4 className='fw-bold my-3'>Duties and Responsibilities</h4>
            <ol>
              <li>Lorem Ipsum is simply dummy text</li>
              <li>Lorem Ipsum is simply dummy text</li>
              <li>Lorem Ipsum is simply dummy text</li>
              <li>Lorem Ipsum is simply dummy text</li>
              <li>Lorem Ipsum is simply dummy text</li>
            </ol> */}
            {/* <h4 className='fw-bold my-3'>About Company</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
            <div>
              {
                selectedJob?.jobDescription && parse(selectedJob.jobDescription)
              }
            </div>
            <div>
              {
                selectedJob?.companyDetails && parse(selectedJob.companyDetails)
              }
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default JobModal;