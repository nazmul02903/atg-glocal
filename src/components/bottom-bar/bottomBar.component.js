import React, { useState } from 'react';
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

const bottomBarItems = [
    {
        id: 1,
        icon: homeBB,
        activeIcon: homeBBActive,
        name: 'Home',
    },
    {
        id: 2,
        icon: eventsBB,
        activeIcon: eventsBBActive,
        name: 'Events',
    },
    {
        id: 3,
        icon: fundingBB,
        activeIcon: fundingBBActive,
        name: 'Funding',
    },
    {
        id: 4,
        icon: jobsBB,
        activeIcon: jobsBBActive,
        name: 'Jobs',
    },
    {
        id: 5,
        icon: menuBB,
        activeIcon: menuBBActive,
        name: 'Menu',
    }
];

const BottomBar = () => {
    const [clickedItem, setClickedItem] = useState(1);

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
                        ></BottomBarButton>
                    )
                })
            }
        </div>
    );
};

export default BottomBar;