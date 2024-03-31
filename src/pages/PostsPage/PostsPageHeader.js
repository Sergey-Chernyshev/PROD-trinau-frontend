import React from "react";
import { NavLink } from "react-router-dom";


export default function PostsPageHeader() {

    return (

        <ul className="nav nav-pills nav-fill mb-3 ml-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/public">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Опубликованные</button>
                </NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/planned">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" tabindex="-1">Запланированные</button>
                </NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink to="/posts/drafts">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" tabindex="-1">Черновики</button>
                </NavLink>
            </li>
            <a className="mx-2 btn btn-outline-success" href="create.html" role="button">+</a>
        </ul>
    )
}