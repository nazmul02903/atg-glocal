import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import fundingBanner from "./../../../assets/fundpg/fundingBanner.svg";
import example from "./../../../assets/fundpg/example.svg";
import ShareIcon from "../../../assets/Icons/share.svg";


const tempJobList = [
  {
    id: 0,
    name: "All",
    selected: true,
  },
  {
    id: 2,
    name: "CSR Fund",
    selected: false,
  },
  {
    id: 3,
    name: "GOVT Fund",
    selected: false,
  },
  {
    id: 1,
    name: "NGO Fund",
    selected: false,
  },
];

const fundings = [
  {
    id: 1,
    designation: "Funding for Awareness",
    issue: "Key Issues will go here",
    location: "Location",
    expiryLabel: "2 days left",
    fundingCategory: "CSR Fund",
  },
  {
    id: 2,
    designation: "Funding for Awareness",
    issue: "Key Issues will go here",
    location: "Location",
    expiryLabel: "2 days left",
    fundingCategory: "CSR Fund",
  },
  {
    id: 3,
    designation: "Funding for Awareness",
    issue: "Key Issues will go here",
    location: "Location",
    expiryLabel: "2 days left",
    fundingCategory: "CSR Fund",
  },
  {
    id: 4,
    designation: "Funding for Awareness",
    issue: "Key Issues will go here",
    location: "Location",
    expiryLabel: "2 days left",
    fundingCategory: "CSR Fund",
  }
]

const AllFundingUpdate = (props) => {
  const dispatch = useDispatch();
  const [fus, setFus] = useState([]);
  const [jobList, setJobList] = useState(tempJobList);
  // const [selectedFU, setSelectedFU] = useState({});
  // const [modalShowDelete, setModalShowDelete] = useState(false);
  const { id } = props.match.params;

  // useInterval(async () => {
  //   dispatch(setLoader());
  //   //console.log("Checking for data updates");
  //   await AdminService.fetchFundingUpdateByCategory(id, { dataType: 1 }).then(
  //     (res) => {
  //       dispatch(clearLoader());
  //       setFus(res.data.fundingUpdateBeans);
  //     }
  //   );
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
    AdminService.fetchFundingUpdateByCategory(id, 1).then((res) => {
      dispatch(clearLoader());
      setFus(res.data.fundingUpdateBeans);
    });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    console.log("fus: ", fus);
  }, [fus]);

  return (
    // <div className="list-group row">
    //   {fus.map((fu, index) => {
    //     return (
    //       <div
    //         className="list-group-item col-sm-8 align-items-start rounded mb-2 bg-light bg-gradient custom-card"
    //         key={index}
    //       >
    //         <div className="flex ">
    //           <div className="w-75">
    //             <h5 className="mb-1">{fu.title}</h5>
    //           </div>

    //           <div className="expire-text-box p-2 self-center">
    //             {fu.applicationDeadlineText}
    //           </div>
    //         </div>
    //         <div className="mt-3">
    //           <span
    //             className="p-2 rounded-pill"
    //             style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
    //           >
    //             {fu.createdBy}
    //           </span>
    //         </div>
    //         <div className="mt-3">{parse(fu.description)}</div>

    //         <div className="mt-3">
    //           <a
    //             className="btn btn-primary ms-2"
    //             href={`${process.env.REACT_APP_URL}/fundingUpdate/${id}/${fu.id}`}
    //             role="button"
    //             target="_blank"
    //             rel="noreferrer noopener"
    //           >
    //             Go To Link
    //           </a>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="pt-0 md:m-5 md:p-5 funding-page">
      <div className='funding-header  bg-white p-5 d-none d-md-grid'>
          <div className='grid items-center justify-right'>
              <div>
                  <h1>Connecting people working in NGOs to Opportunities</h1>
                  <p>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, </p>
              </div>
          </div>
          <div>
              <img src={fundingBanner} alt="" />
          </div>
          <div className='grid items-center p-4 shadow-md w-96 justify-center text-gray-400'>
              <div className="w-96">
                  <h4 className='mb-4 text-center'>Looking for Funds?</h4>
                  <div className='grid justify-center w-96'>
                  <div className="grid gap-2 mb-4 w-80">
                    <div className="form-check border p-4 rounded">
                      <input className="form-check-input p-3 m-0 shadow-radio" name="select-event" id="govt_funds" type="radio" />
                      <label className="form-check-label m-1 text-blue-600" for="govt_funds"><span className="ms-3">Govt Funds</span></label>
                    </div>
                    <div className="form-check border p-4 rounded">
                      <input className="form-check-input p-3 m-0 shadow-radio" name="select-event" id="foreign_funds" type="radio" />
                      <label className="form-check-label m-1 text-blue-600" for="foreign_funds"><span className="ms-3">Foreign Funds</span></label>
                    </div>
                    <div className="form-check border p-4 rounded">
                      <input className="form-check-input p-3 m-0 shadow-radio" name="select-event" id="csr_funds" type="radio" />
                      <label className="form-check-label m-1 text-blue-600" for="csr_funds"><span className="ms-3">CSR Funds</span></label>
                    </div>
                  </div>
                      <button className='btn my-2 fs-4'>Search</button>
                  </div>
              </div>
          </div>
      </div>

      <div className="flex items-center lg:bg-white all-events-categories md:px-24 md:mb-8">
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

      <div className="grid md:grid-cols-2 md:mx-24">
        {fundings.map((funding) => {
          return (
            <div
              key={funding.fundingId}
              // onClick={() => handleSelectedJob(job.jobId)}
              className={`flex bg-white p-4 mb-4 lg:mr-4 shadow-sm cursor-pointer`} 
              // ${
              //   selectedJob.jobId === job.jobId
              //     ? "lg:bg-gray-50"
              //     : "bg-white"
              // }`}
            >
              <img src={example} alt="" className="w-25 pb-5 pr-5" />
              <div className="w-full grid grid-cols-2 justify-between">
                <div className="event-card-content">
                  <p className="event-title fw-bold mb-2 text-blue-600">{funding.designation}</p>
                  <p className="m-0">{funding.issue}</p>
                  <p className="m-0">{funding.location}</p>
                  <p className="text-gray-500 text-sm m-0">{funding.expiryLabel}</p>
                  {/* <small><u>Send me a job like this</u></small> */}
                </div>
                <div className="grid justify-end justify-items-end">
                  <p className="text-blue-600 fw-bold">{funding.fundingCategory}</p>
                  <div className="grid items-end">
                    <img
                      src={ShareIcon}
                      style={{ width: "25px", height: "25px" }}
                      className="hover:bg-gray-100 rounded-full p-1"
                      // onClick={() => setShareModalActive(true)}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AllFundingUpdate;
