import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import UserService from '../../../../services/user.service';
import { useSelector } from "react-redux";
import S3FileUpload from "react-s3";
import { S3_CONFIG_RESUME } from '../../../../constants/variables';
import { alertCustom } from '../../../../helpers/alerts';
import { useHistory } from 'react-router-dom';

const ApplyJobForm = (job) => {
  const [showText, setShowText] = useState(false);
  // const { user } = useSelector((state) => state.auth);
  console.log('job', job);
  const [resume, setResume] = useState(null)
  const history = useHistory()
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector('.file-input').click();
    setShowText(true);
  }

  const handleSubmit = (e) => {
    console.log('resume', resume);
    e.preventDefault();
    if (resume === null) return alert('Please upload resume')
    S3FileUpload.uploadFile(resume, S3_CONFIG_RESUME)
      .then((data) => {
        console.log('data', data.location);
        const name = e.target.name.value;
        const contactNumber = e.target.contactNumber.value;
        const email = e.target.email.value;
        const qualification = e.target.qualification.value;
        const experience = e.target.experience.value;
        const skills = e.target.skills.value;

        const reqBody = {
          name, contactNumber, email, qualification, experience, skills,
          resumeLink: data.location,
          jobId: job.location.state.id,
          address: 'asd'
        }

        UserService.applyForJob(reqBody)
          .then(res => {
            console.log(res);
            alert('Applied Successfully!')
            setResume(null)
            history.push('/jobs/0')
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch((err) => {
        alertCustom("error", err.message, "/home");
      });

  }
  return (
    <form className='grid gap-4 apply-job-form px-3' onSubmit={handleSubmit}>
      <div className='mx-auto'>
        <h3 className='text-center'>
          Apply for Job
        </h3>
      </div>
      <div className='form-group form-control'>
        <label style={{ fontSize: "14px", color: "grey" }} htmlFor='eventTitle'>Name of the Candidate / Applicant</label>
        <input
          className="border-0 focus:border-opacity-0"
          type='text'
          name='name'
        />
      </div>
      <div className='form-group form-control'>
        <label style={{ fontSize: "14px", color: "grey" }} htmlFor='eventTitle'>Contact Number</label>
        <input
          className="border-0 phone-number focus:border-opacity-0"
          type='number'
          name='contactNumber'
        />
      </div>
      <div className='form-group form-control'>
        <label style={{ fontSize: "14px", color: "grey" }} htmlFor='eventTitle'>Email</label>
        <input
          className="border-0 focus:border-opacity-0"
          type='text'
          name='email'
        />
      </div>
      <div className='form-group form-control'>
        <input
          className="border-0 focus:border-opacity-0"
          type='text'
          placeholder="What is your Qualification"
          name='qualification'
        />
      </div>
      <div className='form-group form-control'>
        <input
          className="border-0 focus:border-opacity-0"
          type='text'
          placeholder="How many years of Experience do you have?"
          name='experience'
        />
      </div>
      <div className='form-group form-control'>
        <input
          className="border-0 focus:border-opacity-0"
          type='text'
          placeholder="Please tell us about your skills"
          name='skills'
        />
      </div>
      <div>
        <label style={{ fontSize: "14px", marginBottom: "4px" }}>Kindly request to upload your CV / Resume</label>
        <div className="mb-3 rounded-xl flex bg-white" style={{ border: "2px solid #0275d8" }}>
          <input
            className={`border-0 file-input grid pl-4 pt-2 bg-white rounded-lg items-center ${showText && 'opacity-100'}`}
            type='file'
            placeholder="Upload Resume"
            name='resume'
            onClick={() => setShowText(true)}
            onChange={e => setResume(e.target.files[0])}
          />
          <Button onClick={handleClick} style={{ borderRadius: "8px" }} className='w-64' variant="primary" id="button-addon2">
            Upload Resume
          </Button>
        </div>
      </div>
      <input className="rounded-lg btn btn-primary w-100" type="submit" value="Apply Now" />
    </form>
  );
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { states } = state.states;

  return {
    isLoading,
    states,
  };
}

export default connect(mapStateToProps)(ApplyJobForm);