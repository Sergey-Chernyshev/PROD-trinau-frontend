import React, { useEffect } from "react";
import PostsPageHeader from "./PostsPageHeader";
import { Outlet } from "react-router-dom";
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";


export default function PostsPage() {
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
            <div className="tab-content" id="pills-tabContent">
                <Outlet />
            </div>
        </>
    )
}