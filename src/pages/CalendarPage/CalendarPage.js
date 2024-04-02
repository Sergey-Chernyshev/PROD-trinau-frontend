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

export default function CalendarPage(){

    const [schedules, setSchedules] = useState({});
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken

    useEffect(() => {
        sendRequestWrapper(
            "GET",
            "https://trinau-backend.nalinor.dev/api/calendar",
            null,
            header,
            response => {
                setSchedules(response.message)
            }
        )
    }, []);

    return (
        <div>
            Календарь
            {Object.keys(schedules).map((k, ki) => (
            <div>
            <h3>{k}</h3>
            <table className="table">
                <tbody>{schedules[k].map((e, i) => (<tr>
                    <th scope="row">{dateConverter(e.schedule_time)}</th>
                    <td>{e.name}</td>
                </tr>))
                }</tbody>
            </table>
            </div>
            ))
            }
        </div>
    )
}