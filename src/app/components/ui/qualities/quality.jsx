import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getQualitiesList,
  getQualitiesLoadingStatus
} from "../../../store/qualities";

const Quality = ({ id }) => {
  const qualities = useSelector(getQualitiesList());
  const isLoading = useSelector(getQualitiesLoadingStatus());

  if (!isLoading) {
    const quality = qualities.find((qual) => qual._id === id);
    return (
      <span className={"badge m-1 bg-" + quality.color} key={id}>
        {quality.name}
      </span>
    );
  } else {
    return "Loading";
  }
};
Quality.propTypes = {
  id: PropTypes.string.isRequired
};

export default Quality;
