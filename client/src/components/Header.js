import React from "react";
import PropTypes from "prop-types";

export const Header = ({ title, size }) => {
  if (size === "small") {
    return <h3>{title}</h3>;
  } else if (size === "medium") {
    return <h2>{title}</h2>;
  } else if (size === "large") {
    return <h1>{title}</h1>;
  }
};

Header.propTypes = {
  title: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

Header.defaultProps = {
  title: "Example Header",
  size: "large",
};
