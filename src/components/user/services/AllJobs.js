import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import "bootstrap/dist/css/bootstrap.min.css";
// import EventDetailModal from "../../../helpers/eventDetailModal";
import { setLoader, clearLoader } from "../../../store/actions/loader";
// import ConfirmationModal from "../../../helpers/confirmationModal";
// import { useInterval } from "../../../helpers/useInterval";
// import { POLLING_INTERVAL } from "../../../constants/variables";
// import CommunityImg from "../../../assets/Icons/community-full.svg";
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
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { API_FETCH_SINGLE_JOB_USER } from "../../../constants/urls";

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
    name: "Govt. Jobs",
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
  const history = useHistory();
  const [selectedJobType, setSelectedJobType] = useState(null);
  const { t } = useTranslation();
  const [jobApplied, setJobApplied] = useState(false)
  const query = props?.location?.search.split('=')[1];
  const screen = window.screen;
  const [shareUrl, setShareUrl] = useState('');
  const user = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    if (jobs.length === undefined) return
    if (jobs.length === 0) return
    setSelectedJob(jobs.find(job => job.jobId === query));
    // console.log(screen.width);
    if (screen.width < 768) {
      setJobModalActive(true);
    }
  }, [query, jobs, screen.width]);

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
        setJobs(res?.data?.jobDetailsBeans);
        setSelectedJob(res?.data?.jobDetailsBeans[0]);
      }).catch(() => dispatch(clearLoader()));
    } else {
      AdminService.fetchJobsByCategory(id, 1).then((res) => {
        dispatch(clearLoader());
        setJobs(res?.data?.jobDetailsBeans);
        setSelectedJob(res?.data?.jobDetailsBeans[0]);
      }).catch(() => dispatch(clearLoader()));
    }
  }, [jobList, dispatch]);

  useEffect(() => {
    console.log('jobs', jobs);
    console.log('selectedJob', selectedJob);
  }, [jobs, selectedJob]);

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
    // console.log(selectedJob?.jobId);
    setJobApplied(false)
    if (!selectedJob?.jobId) return
    // console.log('fetching..');
    AdminService.fetchSingleJob(selectedJob.jobId)
      .then(res => {
        console.log('res', res);
        if (res?.data?.jobApplicationStatus === null) {
          setJobApplied(false)
        } else {
          setJobApplied(true)
        }
      })
      .catch(err => {
        setJobApplied(false)
        console.log('err', err);
      })
  }, [selectedJob]);

  const handleSelection = (e) => {
    console.log(e.target.id);
    setSelectedJobType(e.target.id);
  };

  const handleSubmit = () => {
    selectedJobType && history.push(`/user/create/job`)
  }

  const handleApplyJobForm = (id) => {
    // console.log(id);
    if(user) {
      history.push({ pathname: '/user/apply/applyJobForm', state: { id } });
    } else {
      document.getElementById('login').click();
    }
  };
  // console.log(jobApplied);

  const handleShare = (id) => {
    console.log(id);
    //copy job id in clipboard
    // navigator.clipboard.writeText(`https://glocal-bodh-test.netlify.app/jobs/0?jobid=${id}`);
    navigator.clipboard.writeText(`https://glocal-bodh-test.netlify.app/jobs/0?jobid=${id}`);
    setShareModalActive(true);
    setShareUrl(`https://glocal-bodh-test.netlify.app/jobs/0?jobid=${id}`)
  };

  return (
    <>
      <div className="pt-0 md:mx-5 md:px-5 jobs-page">
        <div className='grid grid-cols-12 p-5 bg-white jobs-header d-none d-md-grid'>
          <div className='grid items-center cols-span-4 justify-right'>
            <div>
              <h1>Connecting people working in NGOs to Opportunities</h1>
              <p>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, </p>
            </div>
          </div>
          <div className="-mt-5 cols-span-4">
            <img className="-mt-5" src={jobsBanner} alt="" />
          </div>
          <div className='p-4 text-gray-400 shadow-md cols-span-4 fw-lighter'>
            <div>
              <h4 className='mb-4 text-center'>Post Jobs</h4>
              <div className='grid justify-center'>
                <div className="grid gap-2 mb-4 w-80">
                  <div className="p-4 rounded border form-check">
                    <input className="p-3 m-0 form-check-input shadow-radio" onChange={handleSelection} name="select-event" id="ngo_jobs" type="radio" />
                    <label className="m-1 text-blue-600 form-check-label fw-bolder" for="ngo_jobs"><span className="ms-3">
                      {t("NGO Jobs.1")}
                    </span></label>
                  </div>
                  <div className="p-4 rounded border form-check">
                    <input className="p-3 m-0 form-check-input shadow-radio" onChange={handleSelection} name="select-event" id="csr_jobs" type="radio" />
                    <label className="m-1 text-blue-600 form-check-label fw-bolder" for="csr_jobs"><span className="ms-3">
                      {t("CSR Jobs.1")}
                    </span></label>
                  </div>
                  <div className="p-4 rounded border form-check">
                    <input className="p-3 m-0 form-check-input shadow-radio" onChange={handleSelection} name="select-event" id="govt_jobs" type="radio" />
                    <label className="m-1 text-blue-600 form-check-label fw-bolder" for="govt_jobs"><span className="ms-3">
                      {t("Govt. Jobs.1")}
                    </span></label>
                  </div>
                </div>
                <button onClick={handleSubmit} className='my-2 btn fs-5'>Post Jobs Free</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center lg:bg-white all-events-categories md:mb-8">
          {jobList.map((event) => {
            return (
              <div
                key={event.id}
                className={`category-item ${event.selected ? "selected font-bold" : "font-semibold"
                  }`}
                onClick={() => handleCategoryChange(event.id)}
              >
                <p>
                  {t(`${event.name}.1`)}
                </p>
              </div>
            );
          })}
        </div>

        <div>
          <div className="grid grid-cols-1 lg:mx-5 lg:px-5 lg:grid-cols-2">

            <div className="col-span-1">
              {jobs.map((job) => {
                return (
                  <div
                    key={job.jobId}
                    onClick={() => handleSelectedJob(job?.jobId)}
                    className={`flex p-4 lg:mb-4 lg:mr-4 shadow-sm cursor-pointer ${selectedJob?.jobId === job?.jobId
                      ? "lg:bg-gray-50"
                      : "bg-white"
                      }`}
                  >
                    {/* <img src={EventCardImg} alt="" className="pr-5 pb-5 w-25" /> */}
                    <div className="w-32 h-24 mr-4 d-flex items-center justify-center bg-pink-500">
                      <div className="text-white fw-bold fs-1">{(job.designation).split("")[0]}</div>
                    </div>
                    <div className="grid grid-cols-2 justify-between w-full">
                      <div className="event-card-content">
                        <p className="mb-2 text-blue-600 event-title fw-bold">{job.designation}</p>
                        <p className="m-0">{job.companyName}</p>
                        <p className="m-0">{job.location}</p>
                        <p className="m-0 text-sm text-gray-500">{job.expiryLabel}</p>
                        <small><u>Send me a job like this</u></small>
                      </div>
                      <div className="grid justify-end justify-items-end">
                        <p className="text-blue-600 fw-bold">{job.jobCategory}</p>
                        <div className="grid items-end">
                          <img
                            src={ShareIcon}
                            style={{ width: "25px", height: "25px" }}
                            className="hover:bg-gray-100 rounded-full p-1"
                            onClick={(e) => {e.stopPropagation(); handleShare(job.jobId)}}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-span-1 pt-4 bg-white d-none d-md-block ps-4">
              {
                selectedJob ?
                  <>

                    <h2 className="fw-bold">{selectedJob?.designation}</h2>
                    <p>{selectedJob?.location} On-site 1 day ago 24 applicants</p>
                    <div className="text-gray-500">
                      <div className="flex my-3">
                        <img src={jobType} alt="" />
                        <p className="pl-3 m-0">{selectedJob?.jobType}</p>
                      </div>
                      {/* <div className="flex my-3">
                        <img src={financialServices} alt="" />
                        <p className="pl-3 m-0">₹ 10,001+ employees · Financial Services</p>
                      </div> */}
                      <div className="flex my-3">
                        <img src={alumni} alt="" />
                        <p className="pl-3 m-0">1 company alumni </p>
                      </div>
                      <div className="flex my-3">
                        <img src={applicants} alt="" />
                        <p className="pl-3 m-0">See how you compare to 24 applicants</p>
                      </div>
                      {/* <div className="flex my-3">
                        <img src={skills} alt="" />
                        <p className="pl-3 m-0">Skills: Spring Framework, Systems Analysis,</p>
                      </div> */}
                    </div>
                    <div className="flex gap-3 my-5">
                      {
                        jobApplied ?
                          <button className="p-0 px-2 h-8 rounded-lg btn fs-5 fw-lighter">
                            Already Applied
                          </button> :
                          <button onClick={() => handleApplyJobForm(selectedJob?.jobId)} className="p-0 w-24 h-8 rounded-lg btn fs-5 fw-lighter">
                            Apply
                          </button>
                      }

                      <button onClick={(e) => {e.stopPropagation(); handleShare(selectedJob.jobId)}} className="p-0 w-24 h-8 bg-white rounded-lg btn fs-5" style={{ border: "1px solid #0057A8", color: "#0057A8" }}>Share</button>
                    </div>
                    <div>
                      <h6 className="my-3 fw-bold">Job Id: {selectedJob?.jobId}</h6>
                      {/* <p className="text-grey-800 fs-6">
                        The Applications Development Team Lead is an intermediate level position responsible for driving and delivering implementation of new or revised application systems and programs in coordination with the Technology team. The overall objective of this role is to contribute to applications systems analysis and project deliveries activities.
                      </p> */}
                      {
                        selectedJob?.companyDetails && parse(selectedJob?.companyDetails)
                      }
                      {/* <h6 className="my-4 fw-bold">Responsibilities:</h6> */}
                      <div className="mt-3">
                        {
                          // selectedJob?.jobDescription && parse(selectedJob?.jobDescription)
                        }
                      </div>
                    </div>
                  </> : <></>
              }
            </div>
          </div>

        </div>
      </div>

      {/* <JobModal onHide={() => setJobModalActive(false)} show={jobModalActive} selectedJob={selectedJob} /> */}
      <ShareEventModal
        show={shareModalActive}
        handleClose={() => setShareModalActive(false)}
        selectedJob={selectedJob}
        shareUrl={shareUrl}
        shareText='Checkout this job'
        isJob={true}
      />

      <JobModal jobApplied={jobApplied} handleShare={handleShare} handleApplyJobForm={handleApplyJobForm} onHide={() => setJobModalActive(false)} show={jobModalActive} selectedJob={selectedJob} />
    </>
  );
};

export default AllJobs;
