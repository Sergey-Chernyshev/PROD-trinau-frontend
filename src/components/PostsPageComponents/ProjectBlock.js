import React, {useEffect, useState} from "react";
import PostBlock from "./PostBlock";
import { Link } from "react-router-dom";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {VIEW_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";
import sendRequest from "../../api/sendRequest";
import {toast} from "react-toastify";
import { useRef } from 'react';

const loginToken = localStorage.getItem("accessToken");
let projectRefs = {}

const handleProjectDelete = (e) => {
    e.preventDefault()
    let p_id = e.target.getAttribute("projectId");
    // eslint-disable-next-line no-restricted-globals
    let ans = confirm("Точно удалить этот проект?")
    if (ans === null || ans === false)
        return;
    const header = "Authorization: Bearer " + loginToken
    sendRequest('DELETE',
        'https://trinau-backend.nalinor.dev/api/projects/' + p_id + '/',
        null,
        header)
        .then(response => {
            if (response.code === 0) {
                toast("Проект удален", {
                    autoClose: 1500,
                    type: "action",
                    theme: "dark",
                });
                window.location.href = window.location.pathname
            }
            else {
                toast(response.message.message, {
                    autoClose: 4000,
                    type: "error",
                    theme: "dark"
                })
            }
        })
        .catch(error => {
            console.error(error);
            toast("Произошла ошибка при обработке запроса", {
                autoClose: 2500,
                type: "error",
                theme: "dark"
            });
        });
}


export default function ProjectBlock(props) {
    const {data} = props
    //projectRefs[data.id] = useRef();
    let dataPosts = data
      // Проверяем, определен ли allData
      if (!dataPosts || !dataPosts.posts) {
        return <div>Loading...</div>; // Можно также отобразить загрузочное сообщение
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //     let url = window.location.href
    //     let id = url.substring(url.lastIndexOf("#project_"))
    //     projectRefs[parseInt(id)].current?.scrollIntoView({behavior: smo})
    // });
    console.log(data)
    return (
        <li className="list-group-item mt-3 mb-4 project text-light c-project-card"
            style={{ borderRadius: '12px' }} id={"project_"+data.id}
            //ref={projectRefs[data.id]}
        >
            <div className='d-flex justify-content-between align-items-center'>
                <h1>{data.name}</h1>
                <div className="d-flex">
                <Link to="/createpost" className="mx-2 btn btn-warning c-create-post" role="button">Добавить пост</Link>
                <div className="dropdown">
                    <button className="btn btn-sm c-post-actions" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Изменить</a></li>
                        <li><a onClick={handleProjectDelete} projectId={data.id} className="dropdown-item" href="/">Удалить</a></li>
                    </ul>
                </div>
                </div>
            </div>
            <ul className="list-group">
                {dataPosts.posts.map((e, i) => (
                    <PostBlock key={i} data={e} project_id={data.id}/>
                ))}
            </ul>

        </li>
    )
}
