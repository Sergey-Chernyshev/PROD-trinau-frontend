import React from "react";
import { Link, NavLink } from "react-router-dom";


export default function PostsPageHeader() {

    return (
<>
        <ul className="nav nav-pills nav-fill mb-3 ml-3 bg-black border-1" style={{borderRadius : "6px"}} role="tablist">
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/public">
                    {({ isActive }) => (
                        <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-published-tab" data-bs-toggle="pill" data-bs-target="#pills-published" type="button" role="tab" aria-controls="pills-published" aria-selected="true">Опубликованные</button>
                    )}
                </NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/planned">
                    {({ isActive }) => (
                        <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-planned-tab" data-bs-toggle="pill" data-bs-target="#pills-planned" type="button" role="tab" aria-controls="pills-planned" aria-selected="false" tabIndex="-1">Запланированные</button>
                    )}
                </NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/drafts">
                {({ isActive }) => (
                        <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-drafts-tab" data-bs-toggle="pill" data-bs-target="#pills-drafts" type="button" role="tab" aria-controls="pills-drafts" aria-selected="false" tabIndex="-1">Черновики</button>
                    )}
                </NavLink>
            </li>

        </ul>
        <div className="d-flex justify-content-center my-1">
            <Link to="/creationproject" className="mx-2 p-1 btn btn-outline-success" role="button">Добавить проект</Link>
            </div>
      <input class="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Search"/>
</>
    )
}