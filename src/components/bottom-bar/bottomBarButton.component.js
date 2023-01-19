import React from 'react';

const BottomBarButton = ({item, clickedItem, setClickedItem}) => {
    const {id, icon, activeIcon, name} = item;

    return (
        <button onClick={() => setClickedItem(id)}>     
            <img src={clickedItem === id ? activeIcon : icon} alt="" />
            <p className={clickedItem === id && "btn-active-text"}>{name}</p>
        </button>
    );
};

export default BottomBarButton;