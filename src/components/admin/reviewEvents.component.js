import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import AdminService from '../../services/admin.service';
import { clearLoader, setLoader } from '../../store/actions/loader';
import LocationImg from "../../assets/Icons/location.svg";
import EventReviewModal from '../../helpers/eventReviewModal';

const ReviewEvent = (props) => {
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});

    useEffect(() => {
        props.dispatch(setLoader());
        AdminService.fetchEvents().then((res) => {
            props.dispatch(clearLoader());
            setEvents(res.data.eventBeans);
            console.log(res.data.eventBeans);
        });
    }, []);

    return (
        <div className='list-group row'>
            {events.map((event, index) => {
                return (
                <div
                    className='list-group-item  col-sm-6 align-items-start rounded mb-2 bg-light bg-gradient'
                    key={index}
                >
                    <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{event?.companyName}</h5>
                    <p className='mt-1'>
                        <span
                        className='rounded-pill p-2 '
                        style={{
                            color: "#F9F9F9",
                            backgroundColor:
                            event?.eventStatusText === "Reviewed" ? "#d43530" : "#00CCA9",
                        }}
                        >
                        {event?.eventStatusText === "Reviewed" ? "Live" : "In Review"}
                        </span>
                        <span
                        className='rounded-pill p-2 font-weight-bold ms-2'
                        style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                        >
                        {event?.expiryDate}
                        </span>
                    </p>
                    </div>
                    <div className='mt-2 mb-2'>
                    <span
                        className='rounded-pill p-2'
                        style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
                    >
                        {event?.eventCategoryText}
                    </span>

                    <span
                        className='rounded-pill p-2 ms-3'
                        style={{ backgroundColor: "#FFF9E6" }}
                    >
                        {`${event?.eventTimeText}`}
                    </span>
                    </div>
                    <div className='mt-4'>
                    <span
                        className='rounded-pill p-2'
                        style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
                    >
                        {event?.title}
                    </span>
                    </div>
                    <div className='mt-3'>
                    <span className='py-2 text-muted'>
                        <img src={LocationImg} height='25' alt='' />
                        {' '}{event?.venue}
                    </span>
                    </div>
                    <div className='mt-2'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={(e) => {
                            setSelectedEvent(event);
                            setModalShow(true);
                        }}
                    >
                        View event details
                    </button>
                    
                    </div>
                </div>
                );
            })}

            {modalShow && (
                <EventReviewModal
                data={selectedEvent}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
            )}

        </div>
    );
};
function matchPropsToState(state) {
    const { isLoading } = state.loader;
    return {
      isLoading,
    };
  }
export default connect(matchPropsToState)(ReviewEvent);
