import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBarLink(props){
    const {linkTo, text, icon} = props;


    return(
        <li className="nav-item py-2">
          <NavLink to={linkTo}
            className={({ isActive }) => {
              return isActive
                ? 'nav-link link-light li-currentlink'
                : 'nav-link link-light';
            }}
          >
            <i className={"bi icons " + icon}></i> 
            {text}
          </NavLink>
        </li>
    )
}