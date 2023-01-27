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

const tempJobList = [
  {
    id: 0,
    name: "All",
    selected: true,
  },
  {
    id: 2,
    name: "Csr Jobs",
    selected: false,
  },
  {
    id: 3,
    name: "Govt Jobs",
    selected: false,
  },
  {
    id: 1,
    name: "Ngo Jobs",
    selected: false,
  },
];

const AllJobs = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [jobs, setJobs] = useState([]);
  // const [selectedEvent, setSelectedEvent] = useState({});
  // const [modalShow, setModalShow] = React.useState(false);
  // const [modalShowDelete, setModalShowDelete] = useState(false);
  const [jobList, setJobList] = useState(tempJobList);
  const [shareModalActive, setShareModalActive] = useState(false);

  //debuging ----------------------------------------------
  console.log(jobs);

  useInterval(async () => {
    // dispatch(setLoader());
    // await AdminService.fetchEventsByCategory(id, 1).then((res) => {
    //   dispatch(clearLoader());
    //   setEvents(res.data.eventBeans);
    // });
  }, POLLING_INTERVAL);

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
      });
    }
  }, [jobList]);

  const handlJobChange = (id) => {
    let tempjob = jobList.map((ev) => {
      if (ev.id === id) {
        return { ...ev, selected: true };
      } else {
        return { ...ev, selected: false };
      }
    });
    setJobList(tempjob);
  };
  // const getEventName = () => {
  //   if (id === "1") return "Workshops & Trainings";
  //   if (id === "2") return "Awards & Competitions";
  //   if (id === "3") return "Exhibitions & Summits";
  //   return "";
  // };
  return (
    <>
      <div className="pt-0 md:pt-10">
        <div className="grid hidden grid-cols-12 mb-6 md:grid-cols-12 md:mb-10 md:grid">
          <div className="col-span-12 mb-5 md:col-span-8 md:mb-0">
            <img src={CommunityImg} className="w-full" />
          </div>
          <div className="col-span-12 md:col-span-4 all-events-form">
            <div className="flex flex-col justify-center px-4 py-4 all-events-form-wrapper md:ml-8">
              <p className="mb-4 text-base">Post Your Job</p>
              <input className="flex-1 mb-4" />
              <textarea className="flex-1 mb-4"></textarea>
              <button className="w-full bg-[#0058A9] text-white">
                Post Job Free
              </button>
            </div>
          </div>
        </div>
        <div className="ml-0 list-group row">
          <div className="flex items-center mb-6 all-events-categories md:mb-8">
            {jobList.map((event) => {
              return (
                <div
                  key={event.id}
                  className={`category-item ${
                    event.selected ? "selected font-bold" : "font-semibold"
                  }`}
                  onClick={() => handlJobChange(event.id)}
                >
                  <p> {event.name} </p>
                </div>
              );
            })}
          </div>
          {/* <h3 className="mt-4 mb-4"> {getEventName()} </h3> */}
          <div className="grid grid-cols-12 event-cards gap-y-4 md:gap-x-5">
            {jobs.map((job, index) => {
              return (
                <div
                  key={job.jobId}
                  className="col-span-12 event-card md:col-span-4"
                >
                  <div className="flex">
                    <img src={EventCardImg} className="event-img" />
                  </div>
                  <div className="event-card-content">
                    <div className="flex items-center mb-0">
                      <img
                        src={job.jobCategoryImageUrl}
                        className="event-icon"
                      />
                      <p className="event-title">{job.companyName}</p>
                      <p className="event-fees">{`₹${job?.minSalary}`}</p>
                    </div>

                    <div className="flex justify-between event-footer">
                      <p className="created-at"> {job.createdAtText} </p>
                      <img
                        src={ShareIcon}
                        className="cursor-pointer"
                        onClick={() => setShareModalActive(true)}
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="event-venue">{job.location}</p>
                      <p className="organizer">
                        organized by <span> {job.designation} </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ShareEventModal
        show={shareModalActive}
        handleClose={() => setShareModalActive(false)}
      />
    </>
  );
};

export default AllJobs;
