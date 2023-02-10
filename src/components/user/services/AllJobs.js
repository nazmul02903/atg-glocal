import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailModal from "../../../helpers/eventDetailModal";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import CommunityImg from "../../../assets/Icons/community-full.svg";
import EventCardImg from "../../../assets/event-card.png";
import ShareIcon from "../../../assets/Icons/share.svg";
import ShareEventModal from "../../../helpers/shareEventModal";
import jobsBanner from "../../../assets/jobspg/jobsBanner.svg";
import jobType from "../../../assets/Icons/jobType.svg";
import financialServices from "../../../assets/Icons/financialServices.svg";
import alumni from "../../../assets/Icons/alumni.svg";
import applicants from "../../../assets/Icons/applicants.svg";
import skills from "../../../assets/Icons/skills.svg";
import JobModal from "../../../helpers/jobModal";

const tempJobList = [
  {
    id: 0,
    name: "All",
    selected: true,
  },
  {
    id: 1,
    name: "NGO JOBS",
    selected: false,
  },
  {
    id: 2,
    name: "CSR JOBS",
    selected: false,
  },
  {
    id: 3,
    name: "GOVT JOBS",
    selected: false,
  },
 
];

const AllJobs = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [jobs, setJobs] = useState([]);
  const [jobList, setJobList] = useState(tempJobList);
  const [shareModalActive, setShareModalActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [jobModalActive, setJobModalActive] = useState(false);


  // useInterval(async () => {
  //   // dispatch(setLoader());
  //   // await AdminService.fetchEventsByCategory(id, 1).then((res) => {
  //   //   dispatch(clearLoader());
  //   //   setEvents(res.data.eventBeans);
  //   // });
  // }, POLLING_INTERVAL);

  useEffect(() => {
    const job = jobList.find((job) => job.id === parseInt(id));
    if (!job) return;
    let tempjob = jobList.map((ev) => {
      if (ev.id === parseInt(id)) {
        return { ...ev, selected: true };
      } else {
        return { ...ev, selected: false };
      }
    });
    setJobList(tempjob);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(setLoader());
    const selectedJob = jobList.find((job) => job.selected === true);
    if (!selectedJob) return;
    const id = selectedJob.id;
    if (id === 0) {
      AdminService.fetchAllJobs(1).then((res) => {
        dispatch(clearLoader());
        setJobs(res.data.jobDetailsBeans);
      });
    } else {
      AdminService.fetchJobsByCategory(id, 1).then((res) => {
        dispatch(clearLoader());
        setJobs(res.data.jobDetailsBeans);
        setSelectedJob(res.data.jobDetailsBeans[0]);
      });
    }
  }, [jobList]);

  const handleCategoryChange = (id) => {
    let tempjob = jobList.map((ev) => {
      if (ev.id === id) {
        return { ...ev, selected: true };
      } else {
        return { ...ev, selected: false };
      }
    });
    setJobList(tempjob);
  };

  const handleSelectedJob = (id) => {
    const newSelection = jobs.find((job) => job.jobId === id);
    setSelectedJob(newSelection);
    if (window.innerWidth < 768) {
      setJobModalActive(true);
    }
  };

  useEffect(() => {
    console.log(selectedJob);
  }, [selectedJob]);

  return (
    <>
      <div className="pt-0 md:m-5 md:p-5 jobs-page">
        <div className='jobs-header bg-white p-5 d-none d-md-grid'>
          <div className='grid items-center justify-right'>
            <div>
              <h1>Connecting people working in NGOs to Opportunities</h1>
              <p>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, </p>
            </div>
          </div>
          <div>
            <img src={jobsBanner} alt="" />
          </div>
          <div className='grid items-center p-4 shadow-md w-75  text-gray-400'>
            <div>
              <h4 className='mb-4 text-center'>Post Jobs</h4>
              <div className='grid justify-center'>
                <div className="grid gap-2 mb-4 w-80">
                  <div className="form-check border p-4">
                    <input className="form-check-input p-3 m-0" name="select-event" id="ngo_jobs" type="radio" />
                    <label className="form-check-label m-1 text-blue-600" for="ngo_jobs"><span className="ms-3">NGO Jobs</span></label>
                  </div>
                  <div className="form-check border p-4">
                    <input className="form-check-input p-3 m-0" name="select-event" id="csr_jobs" type="radio" />
                    <label className="form-check-label m-1 text-blue-600" for="csr_jobs"><span className="ms-3">CSR Jobs</span></label>
                  </div>
                  <div className="form-check border p-4">
                    <input className="form-check-input p-3 m-0" name="select-event" id="govt_jobs" type="radio" />
                    <label className="form-check-label m-1 text-blue-600" for="govt_jobs"><span className="ms-3">Govt Jobs</span></label>
                  </div>
                </div>
                <button className='btn my-2 fs-5'>Post Jobs Free</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center lg:bg-white all-events-categories md:mb-8">
          {jobList.map((event) => {
            return (
              <div
                key={event.id}
                className={`category-item ${
                  event.selected ? "selected font-bold" : "font-semibold"
                }`}
                onClick={() => handleCategoryChange(event.id)}
              >
                <p> {event.name} </p>
              </div>
            );
          })}
        </div>

        <div>
          <div className="grid grid-cols-1 lg:mx-5 lg:p-5 lg:grid-cols-2">

            <div className="col-span-1">
              {jobs.map((job) => {
                return (
                  <div
                    key={job.jobId}
                    onClick={() => handleSelectedJob(job.jobId)}
                    className={`flex p-4 lg:mb-4 lg:mr-4 shadow-sm cursor-pointer ${
                      selectedJob.jobId === job.jobId
                        ? "lg:bg-gray-50"
                        : "bg-white"
                      }`}
                  >
                    <img src={EventCardImg} alt="" className="w-25 pb-5 pr-5" />
                    <div className="w-full grid grid-cols-2 justify-between">
                      <div className="event-card-content">
                        <p className="event-title fw-bold mb-2 text-blue-600">{job.designation}</p>
                        <p className="m-0">{job.companyName}</p>
                        <p className="m-0">{job.location}</p>
                        <p className="text-gray-500 text-sm m-0">{job.expiryLabel}</p>
                        <small><u>Send me a job like this</u></small>
                      </div>
                      <div className="grid justify-end justify-items-end">
                        <p className="text-blue-600 fw-bold">{job.jobCategory}</p>
                        <div className="grid items-end">
                          <img
                            src={ShareIcon}
                            style={{ width: "25px", height: "25px" }}
                            className="hover:bg-gray-100 rounded-full p-1"
                            onClick={() => setShareModalActive(true)}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="d-none col-span-1 bg-white d-md-block " style={{ paddingLeft: "45px" }}>
              {
                selectedJob ?
                  <>

                    <h2 className="fw-bold">{selectedJob?.designation}</h2>
                    <p>{selectedJob?.location} On-site 1 day ago 24 applicants</p>
                    <div className="text-gray-500">
                      <div className="my-3 flex">
                        <img src={jobType} alt="" />
                        <p className="m-0 pl-3">{selectedJob?.jobType}</p>
                      </div>
                      <div className="my-3 flex">
                        <img src={financialServices} alt="" />
                        <p className="m-0 pl-3">₹ 10,001+ employees · Financial Services</p>
                      </div>
                      <div className="my-3 flex">
                        <img src={alumni} alt="" />
                        <p className="m-0 pl-3">1 company alumni </p>
                      </div>
                      <div className="my-3 flex">
                        <img src={applicants} alt="" />
                        <p className="m-0 pl-3">See how you compare to 24 applicants</p>
                      </div>
                      <div className="my-3 flex">
                        <img src={skills} alt="" />
                        <p className="m-0 pl-3">Skills: Spring Framework, Systems Analysis,</p>
                      </div>
                    </div>
                    <div className="flex gap-3 my-5">
                      <button className="btn w-24 fs-5 h-8 p-0 rounded-lg fw-lighter">Apply</button>
                      <button className="btn w-24 fs-5 h-8 p-0 rounded-lg bg-white" style={{ border: "1px solid #0057A8", color: "#0057A8" }}>Save</button>
                    </div>
                    <div>
                      <h6 className="fw-bold my-3">Job Id: {selectedJob?.jobId}</h6>
                      <p className="text-grey-800">
                        The Applications Development Team Lead is an intermediate level position responsible for driving and delivering implementation of new or revised application systems and programs in coordination with the Technology team. The overall objective of this role is to contribute to applications systems analysis and project deliveries activities.
                      </p>
                      <h6 className="fw-bold my-4">Responsibilities:</h6>
                    </div>
                  </> : <></>
              }
            </div>
          </div>

        </div>
      </div>

      <ShareEventModal
        show={shareModalActive}
        handleClose={() => setShareModalActive(false)}
      />

      <JobModal onHide={() => setJobModalActive(false)} show={jobModalActive} selectedJob={selectedJob} />
    </>
  );
};

export default AllJobs;
