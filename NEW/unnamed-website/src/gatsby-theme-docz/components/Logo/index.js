import React from "react";
import logo from "./logo.svg";
import { Link } from "docz";

export const Logo = () => (
  <Link to="/">
    <img src={logo} width={48} alt="That's my logo" />
  </Link>
);
