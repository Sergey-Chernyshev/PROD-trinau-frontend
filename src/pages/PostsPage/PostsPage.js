import React from "react";
import PostsPageHeader from "./PostsPageHeader";
import { Outlet, Route, Routes } from "react-router-dom";
import Contact from "./PostsPagePublic";

export default function PostsPage() {

    return (
        <>
            <PostsPageHeader />
            <div className="tab-content" id="pills-tabContent">
                <Outlet />
            </div>
        </>
    )
}