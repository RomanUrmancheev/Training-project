import React from "react";
import PropTypes from "prop-types";

const textAreaField = ({
  name,
  type,
  value,
  onChange,
  label,
  error,
  rows,
  ...rest
}) => {
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          rows={rows}
          {...rest}
        />

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

textAreaField.defaultProps = {
  type: "text",
  rows: "3"
};

textAreaField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.string
};

export default React.memo(textAreaField);
