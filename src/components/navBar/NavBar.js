import React, { useEffect } from "react";
import NavBarLink from "./NavBarLink";

export default function Navbar() {
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const navbar = document.getElementById("navbar");
      if (w >= 576) {
        navbar.classList.remove("fixed-bottom");
      } else {
        navbar.classList.add("fixed-bottom");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="col p-3 bg-black" id="navbar">
      <ul className="nav nav-pills flex-sm-column justify-content-center mb-auto">
        <NavBarLink linkTo="/posts" text=" Посты" icon="bi-house" />
        <NavBarLink linkTo="/calendar" text=" Календарь" icon="bi-calendar3" />
        <NavBarLink linkTo="/statistic" text=" Статистика" icon="bi-sliders" />
        <NavBarLink linkTo="/profile" text=" Профиль" icon="bi-person-circle" />
      </ul>
    </div>
  );
}
