import React, {useEffect, useState} from "react";
import sendRequest from "../../api/sendRequest";
import {toast} from "react-toastify";
import dateConverter from "../../utils/Posts/dateConverter";

function sendRequestWrapper(method, url, data, header,
                            on_success, on_error=null) {
    if (on_error === null)
        on_error = error => {
            toast("Произошла ошибка", {
                autoClose: 2500,
                type: "error",
                theme: "dark"
            })
        }
    sendRequest(method, url, data, header)
        .then(response => {
            if (response.code === 0) {
                on_success(response)
            }
            else {
                toast(response.message.message, {
                    autoClose: 4000,
                    type: "error",
                    theme: "dark"
                })
            }
        })
        .catch(on_error);
}

export default function NotificationsPage(){

    const [notifications, setNotifications] = useState([]);
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken

    useEffect(() => {
        sendRequestWrapper(
            "GET",
            "https://trinau-backend.nalinor.dev/api/profile/notifications/",
            null,
            header,
            response => {
                setNotifications(response.message)
            }
        )
    }, []);

    return (
        <div>
            Уведомления по статистике
            <div className="list-group">
            {notifications.map((e, i) => (
                <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-bell-fill"></i>
                    <div>
                        <div>
                            <p className="mb-0 opacity-75">{e.text}</p>
                        </div>
                        <small className="opacity-50 text-nowrap">{dateConverter(e.issued_at)}</small>
                    </div>
                </div>
            ))
            }
            </div>
        </div>
    )
}