import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailModal from "../../../helpers/eventDetailModal";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import allEventsImg from "../../../assets/Icons/allEvents.svg";
import EventCardImg from "../../../assets/event-card.png";
import ShareIcon from "../../../assets/Icons/share.svg";
import ShareEventModal from "../../../helpers/shareEventModal";
import { useTranslation } from "react-i18next";

const tempeventList = [
  {
    id: 0,
    name: "All",
    selected: true,
  },
  {
    id: 1,
    name: "Workshops & Trainings",
    selected: false,
  },
  {
    id: 2,
    name: "Awards & Competitions",
    selected: false,
  },
  {
    id: 3,
    name: "Exhibitions & Summits",
    selected: false,
  },
];

const AllEvents = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [eventList, setEventList] = useState(tempeventList);
  const [shareModalActive, setShareModalActive] = useState(false);
  const history = useHistory();
  const [selectedEventType, setSelectedEventType] = useState(null);
  const { t } = useTranslation();

  // useInterval(async () => {
  //   dispatch(setLoader());
  //   await AdminService.fetchEventsByCategory(id, 1).then((res) => {
  //     dispatch(clearLoader());
  //     setEvents(res.data.eventBeans);
  //   });
  // }, POLLING_INTERVAL);

  useEffect(() => {
    const event = eventList.find((event) => event.id === parseInt(id));
    if (!event) return;
    let tempevent = eventList.map((ev) => {
      if (ev.id === parseInt(id)) {
        return { ...ev, selected: true };
      } else {
        return { ...ev, selected: false };
      }
    });
    setEventList(tempevent);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(setLoader());
    const selectedEvent = eventList.find((event) => event.selected === true);
    if (!selectedEvent) return;
    const id = selectedEvent.id;
    if (id === 0) {
      AdminService.fetchAllEvents(1)
        .then((res) => {
          dispatch(clearLoader());
          console.log("data", res.data.eventBeans);
          setAllEvents(res.data.eventBeans);
          setEvents(res.data.eventBeans);
        })
        .catch(() => dispatch(clearLoader()));
    } else {
      AdminService.fetchEventsByCategory(id, 1)
        .then((res) => {
          dispatch(clearLoader());
          console.log("data", res.data.eventBeans);
          setEvents(res.data.eventBeans);
        })
        .catch(() => dispatch(clearLoader()));
    }
  }, [eventList]);

  const handlEventChange = (id) => {
    let tempevent = eventList.map((ev) => {
      if (ev.id === id) {
        return { ...ev, selected: true };
      } else {
        return { ...ev, selected: false };
      }
    });
    setEventList(tempevent);
    if(id !== 0){
      const tempEvents = allEvents.filter((event) => parseInt(event.eventCategoryId) === id);
      console.log("tempEvents", tempEvents);
      setEvents(tempEvents);
    }
  };
  const getEventName = () => {
    if (id === "1") return "Workshops & Trainings";
    if (id === "2") return "Awards & Competitions";
    if (id === "3") return "Exhibitions & Summits";
    return "";
  };
  const handleSelection = (e) => {
    console.log(e.target.id);
    setSelectedEventType(e.target.id);
  };
  const handleSubmit = () => {
    history.push(`/user/create/event/${selectedEventType}`);
  };
  return (
    <>
      <div className="pt-0 md:pt-10 md:p-5 md:m-5">
        <div className="mb-6 md:bg-white md:m-5 md:pt-5 md:mb-10">
          <div className="hidden grid-cols-12 items-center p-5 md:grid-cols-12 md:grid">
            <div className="md:col-span-4">
              <h1>Connecting people working in NGOs to Opportunities</h1>
              <p>
                Whatever you’re looking to do this year, Meetup can help. For 20
                years, people have turned to Meetup to meet people, make
                friends,{" "}
              </p>
            </div>
            <div className="col-span-4 mb-5 md:mb-0">
              <img src={allEventsImg} className="w-full" alt="" />
            </div>
            <div className="col-span-4 all-events-form">
              <div className="flex flex-col justify-center p-4 all-events-form-wrapper">
                <p className="mb-4 text-center text-gray-400 fs-4">
                  Post Your Event
                </p>
                <form onSubmit={handleSubmit} className="grid gap-2 mb-4">
                  <div className="rounded border form-check lg:p-4 d-flex">
                    <input
                      className="p-3 m-0 form-check-input shadow-radio"
                      onChange={handleSelection}
                      name="select-event"
                      id="workshopEvent"
                      type="radio"
                    />
                    <label
                      className="m-1 text-blue-600 form-check-label whitespace-nowrap"
                      for="workshopEvent"
                    >
                      <span className="ms-3">
                        {t("Workshops & Trainings.2")}
                      </span>
                    </label>
                  </div>
                  <div className="p-4 rounded border form-check">
                    <input
                      className="p-3 m-0 form-check-input shadow-radio"
                      onChange={handleSelection}
                      name="select-event"
                      id="awardEvent"
                      type="radio"
                    />
                    <label
                      className="m-1 text-blue-600 form-check-label whitespace-nowrap"
                      for="awardEvent"
                    >
                      <span className="ms-3">
                        {t("Awards & Competitions.2")}
                      </span>
                    </label>
                  </div>
                  <div className="p-4 rounded border form-check">
                    <input
                      className="p-3 m-0 form-check-input shadow-radio"
                      onChange={handleSelection}
                      name="select-event"
                      id="exhibitionEvent"
                      type="radio"
                    />
                    <label
                      className="m-1 text-blue-600 form-check-label whitespace-nowrap"
                      for="exhibitionEvent"
                    >
                      <span className="ms-3">
                        {t("Exhibitions & Summits.2")}
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0058A9] text-white fs-4 fw-light"
                  >
                    Post Event Free
                  </button>
                </form>
                {/* <textarea className="flex-1 mb-4"></textarea> */}
              </div>
            </div>
          </div>
          <div className="flex items-center all-events-categories">
            {eventList.map((event) => {
              return (
                <div
                  key={event.id}
                  className={`category-item ${
                    event.selected ? "selected font-bold" : "font-semibold"
                  }`}
                  onClick={() => handlEventChange(event.id)}
                >
                  <p className="md:w-64">{t(`${event.name}.1`)}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="ml-0 w-full list-group row">
          {/* <h3 className="mt-4 mb-4"> {getEventName()} </h3> */}
          <div className="grid grid-cols-12 gap-y-4 event-cards md:mx-6 md:gap-x-5">
            {events.map((event, index) => {
              return (
                <div
                  key={event.id}
                  className="col-span-12 event-card md:col-span-4"
                  onClick={(e) =>{
                    e.stopPropagation();
                    window.open(
                      `${process.env.REACT_APP_URL}/event/${event.eventCategoryText}/${event.id}/${event.eventId}`
                    )
                  }}
                >
                  <div className="flex">
                    <img
                      style={{ objectFit: "cover" }}
                      src={
                        event.posterImageLink
                          ? event.posterImageLink
                          : EventCardImg
                      }
                      className="event-img"
                      alt=""
                    />
                  </div>
                  <div className="event-card-content">
                    <div className="flex items-center mb-0">
                      <img
                        src={event.eventCategoryImageUrl}
                        className="event-icon"
                        alt=""
                      />
                      <p className="event-title">{event.title}</p>
                      <p className="event-fees">{`₹${event.fees}`}</p>
                    </div>

                    <div className="flex justify-between event-footer">
                      <p className="created-at"> {event.createdAtText} </p>
                      <img
                        src={ShareIcon}
                        className="cursor-pointer"
                        onClick={() => setShareModalActive(true)}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="event-venue">{event.venue}</p>
                      <p className="organizer">
                        organized by <span> {event.organisedBy.name} </span>
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

export default AllEvents;
