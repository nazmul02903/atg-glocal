import { Link } from "react-router-dom";
import eventIcon from "./../assets/Icons/navbar/event.svg";
import jobsIcon from "./../assets/Icons/navbar/jobs.svg";
import mailIcon from "./../assets/Icons/navbar/mail.svg";
import fundIcon from "./../assets/Icons/navbar/fund.svg";
import searchIcon from "./../assets/Icons/navbar/search.svg";
import langIcon from "./../assets/Icons/navbar/LangIcon.svg";

const navObj = [
  {
    name: "Events",
    icon: eventIcon,
  },
  {
    name: "Jobs",
    icon: jobsIcon,
  },
  {
    name: "Fundings",
    icon: fundIcon,
  },
  {
    name: "Contact",
    icon: mailIcon,
  },
  {
    name: "Eng",
    icon: langIcon,
  },
];

const Navbar = () => {
  return (
    <>
      {navObj.map((nav, i) => (
        <div className="navbar-item">
          <img src={nav.icon} alt="" />
          <span>{nav?.name}</span>
        </div>
      ))}
      <div className="nav-search-icon">
        <img src={searchIcon} alt=""  height={40} width={40}/>
      </div>
      <button className="login-button"> Login</button>
    </>
  );
};

export default Navbar;
