import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";

const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span className="ms-2"> Qualities </span>
        </h5>
        <p className="card-text">
          <Qualities qualities={qualities} />
        </p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesCard;
