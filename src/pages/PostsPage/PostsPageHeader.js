import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSharedData } from "../../utils/SharedDataContext";


export default function PostsPageHeader() {
    // const { sharedData, setSharedData } = useSharedData();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        // setSharedData(event.target.value);
      };
    return (
        <>
            <ul className="nav nav-pills flex-column flex-sm-row c-posts-cat-pills nav-fill mb-3 bg-black border-1" style={{ borderRadius: "6px" }} role="tablist">
                <li className="nav-item" role="presentation">
                    <NavLink to="/posts/all">
                        {({ isActive }) => (
                            <button className={`nav-link ${isActive ? "active" : ""}`} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">Все</button>
                        )}
                    </NavLink>
                </li>
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
                <input value={inputValue} onChange={handleInputChange}  className="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Search" id="search-projects-field"/>
                <Link to="/creationproject" className="ms-3 me-3 p-2 btn btn-warning text-nowrap text-center" role="button" id="add-project-button">Добавить проект</Link>
            </div>
        </>
    )
}