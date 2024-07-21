import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const BackHistoryButton = () => {
  const history = useHistory();
  return (
    <div className="offset-md-3 mb-3">
      <button className="btn btn-primary" onClick={() => history.goBack()}>
        Go back
      </button>
    </div>
  );
};

export default BackHistoryButton;
