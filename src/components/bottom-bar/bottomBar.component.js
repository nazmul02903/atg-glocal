import React, { useEffect, useState } from 'react';
import homeBB from '../../assets/Icons/homeBB.svg';
import homeBBActive from '../../assets/Icons/homeBBActive.svg';
import eventsBB from '../../assets/Icons/eventsBB.svg';
import eventsBBActive from '../../assets/Icons/eventsBBActive.svg';
import fundingBB from '../../assets/Icons/fundingBB.svg';
import fundingBBActive from '../../assets/Icons/fundingBBActive.svg';
import jobsBB from '../../assets/Icons/jobsBB.svg';
import jobsBBActive from '../../assets/Icons/jobsBBActive.svg';
import menuBB from '../../assets/Icons/menuBB.svg';
import menuBBActive from '../../assets/Icons/menuBBActive.svg';
import BottomBarButton from './bottomBarButton.component';
import { useLocation } from 'react-router-dom';

const bottomBarItems = [
    {
        id: 1,
        icon: homeBB,
        activeIcon: homeBBActive,
        name: 'Home',
        linkTo: '/',
        pathname: '/'
    },
    {
        id: 2,
        icon: eventsBB,
        activeIcon: eventsBBActive,
        name: 'Events',
        linkTo: "/event/0",
        pathname: '/event'
    },
    {
        id: 3,
        icon: fundingBB,
        activeIcon: fundingBBActive,
        name: 'Funding',
        linkTo: "/fundingUpdates/1",
        pathname: '/fundingUpdates'
    },
    {
        id: 4,
        icon: jobsBB,
        activeIcon: jobsBBActive,
        name: 'Jobs',
        linkTo: "/jobs/0",
        pathname: '/jobs'
    },
    // {
    //     id: 5,
    //     icon: menuBB,
    //     activeIcon: menuBBActive,
    //     name: 'Menu',
    //     pathname: '/menu'
    // }
];

const BottomBar = () => {
    const [clickedItem, setClickedItem] = useState(1);
    const location = useLocation()
    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    useEffect(() => {
        if(location.pathname === '/'){
            setCurrentLocation('/')
        }else{
            setCurrentLocation(`/${location.pathname.split('/')[1]}`)
        }
    }, [location.pathname])

    return (
        <div className="bottom-bar">
            {
                bottomBarItems.map((item) => {
                    return (
                        <BottomBarButton
                            key={item.id}
                            item={item}
                            clickedItem={clickedItem}
                            setClickedItem={setClickedItem}
                            currentLocation={currentLocation}
                        ></BottomBarButton>
                    )
                })
            }
        </div>
    );
};

export default BottomBar;