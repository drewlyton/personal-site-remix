import { Link } from "@remix-run/react";
import React from "react";
import routes from "../helpers/routes";

const Logo = () => {
  return (
    <Link to={routes.index} className="inline-flex items-baseline not-text">
      <div className="logo-image" />
      <div className="leading-none header-font">REW</div>
    </Link>
  );
};

export default Logo;
