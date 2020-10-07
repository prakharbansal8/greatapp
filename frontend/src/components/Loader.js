import React from "react";

const Loader = (props) => {
  const isLoading = props;
  return (
    <div class="loading-dots">
      {isLoading ? (
        <div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default Loader;
