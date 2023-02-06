import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const BottomBarButton = ({ item, currentLocation }) => {
    const { id, icon, activeIcon, name, pathname, linkTo } = item;
    const history = useHistory()

    const onClick = () => history.push(linkTo)

    return (
        <button onClick={onClick}>
            <img src={currentLocation === pathname ? activeIcon : icon} alt="" />
            <p className={currentLocation === pathname ? "btn-active-text" : ''}>{name}</p>
        </button>
    );
};

export default BottomBarButton;