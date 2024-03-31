import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavBarLink from "./NavBarLink";

export default function Navbar() {
  return (
    <div className="col p-3 bg-black" id="navbar">
      <ul className="nav nav-pills flex-sm-column justify-content-center mb-auto">
        <NavBarLink
          linkTo="/posts/public"
          text=" Посты"
          icon="bi-house"
        />
        <NavBarLink
          linkTo="/calendar"
          text=" Календарь"
          icon="bi-calendar3"
        />
        <NavBarLink
          linkTo="/statistic"
          text=" Статистика"
          icon="bi-sliders"
        />
      </ul>
    </div>
  );
}
