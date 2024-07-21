import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logOut } from "../../store/users";

const NavProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (!currentUser) return "Loding...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        role="button"
      >
        <div className="me-2"> {currentUser.name} </div>
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${currentUser.name}`}
          className="img-responive rounded-circle"
          width="40"
          alt="avatar"
        ></img>
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link className="dropdown-item" to={`/users/${currentUser._id}`}>
          Profile
        </Link>
        <a
          className="dropdown-item"
          onClick={() => dispatch(logOut())}
          type="button"
        >
          Log Out
        </a>
      </div>
    </div>
  );
};

export default NavProfile;
