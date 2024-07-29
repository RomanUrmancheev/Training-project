import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsCard from "../../ui/Comments/commentsCard";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4  mb-3">
            <UserCard user={user} onClick={() => handleEdit()} />

            <QualitiesCard qualities={user.qualities} />

            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <CommentsCard userId={userId} />
          </div>
        </div>
      </div>
    );
  } else {
    return "loading...";
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
