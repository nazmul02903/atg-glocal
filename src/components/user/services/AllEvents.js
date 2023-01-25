import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailModal from "../../../helpers/eventDetailModal";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import CommunityImg from '../../../assets/Icons/community-full.svg'
import EventCardImg from '../../../assets/event-card.png'
import ShareIcon from '../../../assets/Icons/share.svg'

const tempeventList = [
  {
    id: 0,
    name: 'All',
    selected: true
  },
  {
    id: 2,
    name: 'Awards',
    selected: false
  },
  {
    id: 3,
    name: 'Exhibitions',
    selected: false
  },
  {
    id: 1,
    name: 'Trade Shows',
    selected: false
  },
]
const AllEvents = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [eventList, setEventList] = useState(tempeventList)

  useInterval(async () => {
    // dispatch(setLoader());
    // await AdminService.fetchEventsByCategory(id, 1).then((res) => {
    //   dispatch(clearLoader());
    //   setEvents(res.data.eventBeans);
    // });
  }, POLLING_INTERVAL);

  useEffect(() => {
    const event = eventList.find(event => event.id === parseInt(id))
    if(!event) return
    let tempevent = eventList.map(ev => {
      if (ev.id === parseInt(id)) {
        return { ...ev, selected: true }
      } else {
        return { ...ev, selected: false }
      }
    })
    setEventList(tempevent)
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(setLoader());
    const selectedEvent = eventList.find(event => event.selected === true)
    if (!selectedEvent) return
    const id = selectedEvent.id
    if (id === 0) {
      AdminService.fetchAllEvents(1).then((res) => {
        dispatch(clearLoader());
        console.log('data', res.data.eventBeans);
        setEvents(res.data.eventBeans);
      });
    } else {
      AdminService.fetchEventsByCategory(id, 1).then((res) => {
        dispatch(clearLoader());
        console.log('data', res.data.eventBeans);
        setEvents(res.data.eventBeans);
      });
    }
  }, [eventList])

  const handlEventChange = id => {
    let tempevent = eventList.map(ev => {
      if (ev.id === id) {
        return { ...ev, selected: true }
      } else {
        return { ...ev, selected: false }
      }
    })
    setEventList(tempevent)
  }
  const getEventName = () => {
    if (id === '1') return 'Workshops & Trainings'
    if (id === '2') return 'Awards & Competitions'
    if (id === '3') return 'Exhibitions & Summits'
    return ''
  }
  return (
    <div className="pt-6 md:pt-10">
      <div className="grid grid-cols-12 md:grid-cols-12 mb-6 md:mb-10">
        <div className="col-span-12 md:col-span-8 mb-5 md:mb-0">
          <img src={CommunityImg} className='w-full' />
        </div>
        <div className="col-span-12 md:col-span-4 all-events-form">
          <div className="px-4 py-4 flex flex-col justify-center all-events-form-wrapper md:ml-8">
            <p className="mb-4  text-base">Post Your Event</p>
            <input className="flex-1 mb-4" />
            <textarea className="flex-1 mb-4">

            </textarea>
            <button className="w-full bg-[#0058A9] text-white">
              Post Event Free
            </button>
          </div>
        </div>
      </div>
      <div className="list-group row ml-0">
        <div className="all-events-categories flex items-center mb-6 md:mb-8">
          {eventList.map(event => {
            return <div key={event.id}
              className={`category-item ${event.selected ? 'selected' : ''}`}
              onClick={() => handlEventChange(event.id)} >
              <p> {event.name} </p>
            </div>
          })}
        </div>
        {/* <h3 className="mt-4 mb-4"> {getEventName()} </h3> */}
        <div className='event-cards grid grid-cols-12 gap-y-4 md:gap-x-5 md:gap-x-5'>
          {events.map((event, index) => {
            return (
              <div key={event.id} className='event-card col-span-12 md:col-span-4'>
                <div className="flex">
                  <img src={EventCardImg} className='event-img' />
                </div>
                <div className="event-card-content">
                  <div className="flex items-center mb-0">
                    <img src={event.eventCategoryImageUrl} className='event-icon' />
                    <p className="event-title">
                      {event.title}
                    </p>
                    <p className="event-fees">
                      {`₹${event.fees}`}
                    </p>
                  </div>

                  <div className="flex justify-between event-footer">
                    <p className="created-at"> {event.createdAtText} </p>
                    <img src={ShareIcon} className='cursor-pointer' />
                  </div>
                  <div className="flex justify-between">
                    <p className="event-venue">
                      {event.venue}
                    </p>
                    <p className="organizer">
                      organized by <span> {event.organisedBy.name} </span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
