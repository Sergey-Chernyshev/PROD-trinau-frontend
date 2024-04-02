import React, { useState } from "react";
import PostBlock from "./PostBlock";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest";

export default function ProjectBlock(props) {

    const loginToken = localStorage.getItem("accessToken");
    let projectRefs = {}

    const { data, type } = props
    let dataPosts = data
    // Проверяем, определен ли allData
    if (!dataPosts || !dataPosts.posts) {
        return <div>Loading...</div>; // Можно также отобразить загрузочное сообщение
    }

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

    return (
        <li className="list-group-item mt-3 mb-4 project text-light" style={{ borderRadius: '12px' }}>
            <div className='d-flex justify-content-between align-items-center'>
                <h1>{data.name}</h1>
                <>
            <div className="btn-group" role="group">
                <div className="dropdown">
                <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      
    </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">                        
                        <li><a className="dropdown-item">Изменить</a></li>
                        <li><a onClick={handleProjectDelete} projectId={data.id} className="dropdown-item" href="/">Удалить</a></li>
                    </div>
                </div>
                <Link to="/createpost" className="mx-2 btn btn-warning c-create-post" role="button">Добавить пост</Link>
                            </div>
                </>
            </div>
            <ul className="list-group">
                {
                    type === "public" && (
                        dataPosts.posts
                            .filter(e => e.is_sent)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Было опубликовано'} projectId={data.id}/>
                            ))
                    )
                }
                {
                    type === "planned" && (
                        dataPosts.posts
                            .filter(e => !e.is_sent && e.schedule_time !== null)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Будет опубликовано в'} projectId={data.id} />
                            ))
                    )
                }
                {
                    type === "drafts" && (
                        dataPosts.posts
                            .filter(e => e.schedule_time === null)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Время публикации не добавлено'} projectId={data.id}/>
                            ))
                    )
                }
                {
                    type === "all" && (
                        dataPosts.posts.map((e, i) => (
                            <PostBlock key={i} data={e}  statusText={'Было опубликовано в'} projectId={data.id} />
                        ))
                    )
                }
            </ul>
        </li>
    )
}
