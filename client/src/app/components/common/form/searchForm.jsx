import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({ name, type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

SearchForm.defaultProps = {
  type: "text"
};

SearchForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchForm;
