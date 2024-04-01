import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBarLink(props) {
  const { linkTo, text, icon } = props;


  return (
    <li className="nav-item py-2 px-auto">
      <NavLink
        to={linkTo}
        className={({ isActive }) => {
          return isActive
            ? 'nav-link link-light li-currentlink px-2'
            : 'nav-link link-light px-2';
        }}
      >
        <i className={"bi icons " + icon}></i>
        <span className="ms-1 d-none d-sm-inline">{text}</span>
      </NavLink>
    </li>
  )
}