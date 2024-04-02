import React, { useEffect } from "react";
import NavBarLink from "./NavBarLink";

export default function Navbar() {
  const handleResize = () => {
    const w = window.innerWidth;
    const navbar = document.getElementById("navbar");
    const content = document.getElementById("content");
    if (w >= 576) {
      navbar.setAttribute('style', `width: 20%;
      height: 100vh;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      height: 100%;`)
      content.setAttribute('style', `padding-left: 21% !important;
width:  100% !important;`)
      navbar.classList.remove("fixed-bottom");
    } else {
      navbar.removeAttribute("style")
      content.removeAttribute("style")
      navbar.classList.add("fixed-bottom");
    }
  }

  useEffect(() => {
    handleResize()
  }, []);

  useEffect(() => {

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="col p-3 bg-black" id="navbar">
      <ul className="nav nav-pills flex-sm-column justify-content-between ps-sm-0 mb-auto">
        <NavBarLink linkTo="/posts" text=" Проекты" icon="bi-house" />
        <NavBarLink linkTo="/calendar" text=" Календарь" icon="bi-calendar3" />
        <NavBarLink linkTo="/statistic" text=" Статистика" icon="bi-sliders" />
        <NavBarLink linkTo="/profile" text=" Профиль" icon="bi-person-circle" />
      </ul>
    </div>
  );
}

