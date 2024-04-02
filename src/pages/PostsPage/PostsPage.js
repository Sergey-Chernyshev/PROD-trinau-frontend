import React, { useEffect, useState } from "react";
import PostsPageHeader from "./PostsPageHeader";
import { Outlet } from "react-router-dom";
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";
import Joyride from "react-joyride";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {ADD_PROJECT_TOUR_CONF, FIRST_TOUR_CONF, VIEW_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";


export default function PostsPage() {
    const [allData, setAllData] = useState()
    const loginToken = localStorage.getItem("accessToken");
    useEffect(() => {

        const header = "Authorization: Bearer " + loginToken;
        sendRequest(
            "GET",
            "https://trinau-backend.nalinor.dev/api/projects/",
            null,
            header
        )
            .then((response) => {
                console.log(response);
                
                if (response.code === 0) {
                    setAllData(response)
                    toast("Данные загружены", {
                        autoClose: 1500,
                        type: "success",
                        theme: "dark"
                    });
                } else {
                    toast(response.message.message, {
                        autoClose: 4000,
                        type: "error",
                        theme: "dark",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                toast("Произошла ошибка при получении данных", {
                    autoClose: 2500,
                    type: "error",
                    theme: "dark",
                });
            });

    }, [])
    return (
        <>
            <div className=''>
                <PostsPageHeader />
            </div>
            <div className="tab-content c-posts-page" id="pills-tabContent">
                <Outlet context={[allData]} />
                <Display_onboarding_if_needed data={FIRST_TOUR_CONF}/>
            </div>
        </>
    )
}