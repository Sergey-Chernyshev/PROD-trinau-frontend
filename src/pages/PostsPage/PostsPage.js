import React from "react";
import PostsPageHeader from "./PostsPageHeader";
import { Outlet, Route, Routes } from "react-router-dom";
import Contact from "./PostsPagePublic";
import {VIEW_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";

export default function PostsPage() {

    return (
        <>
        <div className=''>
            <PostsPageHeader />
        </div>
            <div className="tab-content" id="pills-tabContent">
                <Outlet />

                <Display_onboarding_if_needed
                    data={VIEW_PROJECT_TOUR_CONF}/>
            </div>
        </>
    )
}