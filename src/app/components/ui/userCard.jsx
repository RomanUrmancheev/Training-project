import React from "react";
import PropTypes from "prop-types";
import { getProfessionById } from "../../store/professions";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const UserCard = ({ user, onClick }) => {
  const currentUserID = useSelector(getCurrentUserId());
  const profession = useSelector(getProfessionById(user.profession));

  return (
    <div className="card mb-3">
      <div className="card-body">
        {user._id === currentUserID && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={onClick}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
            className="rounded-circle"
            width="150"
            alt="avatar"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func
};

export default UserCard;
