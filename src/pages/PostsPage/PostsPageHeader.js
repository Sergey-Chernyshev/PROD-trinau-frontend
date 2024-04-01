import React from "react";
import { Link, NavLink } from "react-router-dom";


export default function PostsPageHeader() {

    return (

        <ul className="nav nav-pills nav-fill mb-3 ml-3 mt-2" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/public">
                    {({ isActive }) => (
                        <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Опубликованные</button>
                    )}
                </NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/planned">
                    {({ isActive }) => (
                        <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" tabIndex="-1">Запланированные</button>
                    )}
                </NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/drafts">
                {({ isActive }) => (
                        <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" tabIndex="-1">Черновики</button>
                    )}
                </NavLink>
            </li>
            <Link to="/creationproject" className="mx-2 btn btn-outline-success" href="create.html" role="button">Добавить проект</Link>
        </ul>
    )
}