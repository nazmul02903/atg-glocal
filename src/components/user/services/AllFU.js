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
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tempJobList = [
  {
    id: 0,
    name: "All",
    selected: true,
  },
  {
    id: 1,
    name: "Govt. Funds",
    selected: false,
  },
  {
    id: 2,
    name: "Foreign Funds",
    selected: false,
  },
  {
    id: 3,
    name: "CSR Funds",
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
  },
];

const AllFundingUpdate = (props) => {
  const dispatch = useDispatch();
  const [fus, setFus] = useState([]);
  const [filteredFus, setFilteredFus] = useState([]);
  const [jobList, setJobList] = useState(tempJobList);
  // const [selectedFU, setSelectedFU] = useState({});
  // const [modalShowDelete, setModalShowDelete] = useState(false);
  const { id } = props.match.params;
  const history = useHistory();
  const [selectedFundType, setSelectedFundType] = useState(null);
  const { t } = useTranslation();

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

  // useEffect(() => {
  //   const job = jobList.find((job) => job.id === parseInt(id));
  //   if (!job) return;
  //   let tempjob = jobList.map((ev) => {
  //     if (ev.id === parseInt(id)) {
  //       return { ...ev, selected: true };
  //     } else {
  //       return { ...ev, selected: false };
  //     }
  //   });
  //   setJobList(tempjob);
  // }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchFundingUpdateByCategory(0, 1)
      .then((res) => {
        dispatch(clearLoader());
        setFus(res.data.fundingUpdateBeans);
      })
      .catch(() => dispatch(clearLoader()));
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
    const selected = jobList.find((item) => item.selected === true);
    if (selected === undefined) return;
    // console.log(selected);
    const cat = getCategoryName(selected.id);
    // console.log(cat);
    if (cat === "All") {
      return setFilteredFus(fus);
    }
    let filtered = fus.filter((item) => item.fundingUpdateCategory === cat);
    setFilteredFus(filtered);
  }, [jobList, fus]);

  const getCategoryName = (id) => {
    if (id === 0) return "All";

    if (id === 1) {
      return "Govt. Funds";
    } else if (id === 2) {
      return "Foreign Funds";
    } else if (id === 3) {
      return "CSR Funds";
    }
  };

  useEffect(() => {
    console.log("fus: ", fus);
  }, [fus]);

  const handleSelection = (e) => {
    console.log(e.target.id);
    setSelectedFundType(e.target.id);
  };

  const handleSubmit = () => {
    selectedFundType && history.push(`/user/create/fundingUpdate`);
  };

  const handleNavigate = (url) => {
    if (url === null || url === undefined || !url) {
      history.push("/user/create/fundingUpdate");
      return;
    }
    window.open(url);
  };

  return (
    <div className="pt-0 md:m-5 md:p-5 funding-page">
      <div className="grid grid-cols-12 p-5 bg-white funding-header d-none d-md-grid">
        <div className="grid items-center cols-span-4 justify-right">
          <div>
            <h1>Connecting people working in NGOs to Opportunities</h1>
            <p>
              Whatever you’re looking to do this year, Meetup can help. For 20
              years, people have turned to Meetup to meet people, make friends,{" "}
            </p>
          </div>
        </div>
        <div className="cols-span-4">
          <img src={fundingBanner} alt="" />
        </div>
        <div className="grid justify-center items-center p-4 text-gray-400 shadow-md cols-span-4">
          <div>
            <h4 className="mb-4 text-center fw-normal">
              Looking for Implementation Partner?
            </h4>
            <div className="grid justify-center">
              <div className="grid gap-2 mb-4 w-96">
                <div className="p-4 rounded border form-check">
                  <input
                    className="p-3 m-0 form-check-input shadow-radio"
                    onChange={handleSelection}
                    name="select-event"
                    id="govt_funds"
                    type="radio"
                  />
                  <label
                    className="m-1 text-blue-600 form-check-label"
                    for="govt_funds"
                  >
                    <span className="ms-3">{t("Govt. Funds.1")}</span>
                  </label>
                </div>
                <div className="p-4 rounded border form-check">
                  <input
                    className="p-3 m-0 form-check-input shadow-radio"
                    onChange={handleSelection}
                    name="select-event"
                    id="foreign_funds"
                    type="radio"
                  />
                  <label
                    className="m-1 text-blue-600 form-check-label"
                    for="foreign_funds"
                  >
                    <span className="ms-3">{t("Foreign Funds.1")}</span>
                  </label>
                </div>
                <div className="p-4 rounded border form-check">
                  <input
                    className="p-3 m-0 form-check-input shadow-radio"
                    onChange={handleSelection}
                    name="select-event"
                    id="csr_funds"
                    type="radio"
                  />
                  <label
                    className="m-1 text-blue-600 form-check-label"
                    for="csr_funds"
                  >
                    <span className="ms-3">{t("CSR Funds.1")}</span>
                  </label>
                </div>
              </div>
              <button onClick={handleSubmit} className="my-2 btn fs-4">
                Search
              </button>
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
              <p> {t(`${event.name}.1`)}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2">
        {filteredFus?.map((funding) => {
          return (
            <div
              key={funding.id}
              // onClick={() => handleSelectedJob(job.jobId)}
              className={`flex p-4 mb-4 bg-white shadow-sm cursor-pointer lg:mr-4 align-items-start`}
              onClick={() => handleNavigate(funding.externalLink)}
              // ${
              //   selectedJob.jobId === job.jobId
              //     ? "lg:bg-gray-50"
              //     : "bg-white"
              // }`}
            >
              <span
                style={{
                  textTransform: "capitalize",
                  padding: "10px 20px",
                  backgroundColor: "pink",
                  borderRadius: "5px",
                  marginRight: "20px",
                }}
              >
                {funding.postedBy[0]}
              </span>
              <div className="grid grid-cols-2 justify-between w-full">
                <div className="event-card-content">
                  <p className="mb-2 text-blue-600 event-title fw-bold">
                    {funding?.title}
                  </p>
                  <p className="m-0">{funding.createdAtText}</p>
                  <p className="m-0">{funding.location}</p>
                  <p className="m-0 text-sm text-gray-500">
                    {funding.expiryLabel}
                  </p>
                  {/* <small><u>Send me a job like this</u></small> */}
                </div>
                <div className="grid justify-end justify-items-end">
                  <p className="text-blue-600 fw-bold">
                    {funding.fundingUpdateCategory}
                  </p>
                  <div className="grid items-end">
                    <img
                      src={ShareIcon}
                      style={{ width: "25px", height: "25px" }}
                      className="p-1 rounded-full hover:bg-gray-100"
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
