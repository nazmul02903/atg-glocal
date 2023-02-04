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
    name: "NGO Jobs",
    selected: false,
  },
  {
    id: 2,
    name: "CSR Jobs",
    selected: false,
  },
  {
    id: 3,
    name: "Govt Jobs",
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
      <div className="pt-0 md:m-5 md:p-5 jobs-page contai">
        <div className='jobs-header bg-white pt-0 p-5 d-none d-md-grid'>
          <div className='grid items-center justify-right'>
            <div>
              <h1>Connecting people working in NGOs to Opportunities</h1>
              <p>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, </p>
            </div>
          </div>
          <div>
            <img src={jobsBanner} alt="" />
          </div>

          <div className="px-4 py-4 flex flex-col justify-around all-events-form-wrapper md:ml-8">
            <p className="mb-4 text-center text-center text-[24px] text-[#8A8A8A]">Post Your Job</p>
            <input className="flex- mb-4" />
            <textarea className="flex-1 mb-4">

            </textarea>
            <button className="w-full bg-[#0058A9] text-white">
              Post Job Free
            </button>
          </div>
        </div>

        <div className="flex items-center lg:bg-white all-events-categories md:mb-8">
          {jobList.map((event) => {
            return (
              <div
                key={event.id}
                className={`category-item fs-4 lg:fs-6 ${event.selected ? "selected font-bold" : "font-semibold"
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
                    onClick={() => handleSelectedJob(job?.jobId)}
                    className={`flex p-4 lg:mb-4 lg:mr-4 shadow-sm cursor-pointer fs-4 lg:fs-6 ${selectedJob?.jobId === job?.jobId
                      ? "lg:bg-gray-50"
                      : "bg-white"
                      }`}
                  >
                    <div className="job-img-container">
                      <p>
                        {job.designation.split('')[0]}
                      </p>
                      {/* <img src={EventCardImg} alt="" className="w-full h-full" /> */}
                    </div>
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
                        <p className="mb-0 pl-3">{selectedJob?.jobType}</p>
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
                      {/* <h6 className="fw-bold my-3">Job Description </h6> */}
                      <p className="text-grey-800">
                       <div dangerouslySetInnerHTML={{ __html: selectedJob?.jobDescription }} />
                      </p>

                      <p className="text-grey-800 mt-4">
                       <div dangerouslySetInnerHTML={{ __html: selectedJob?.requirement }} />
                      </p>

                      <p className="text-grey-800 mt-4">
                       <div dangerouslySetInnerHTML={{ __html: selectedJob?.companyDetails }} />
                      </p>
                      {/* <h6 className="fw-bold my-4">Responsibilities:</h6> */}
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
