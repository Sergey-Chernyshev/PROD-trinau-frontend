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
        let p_id = e.target.getAttribute("projectid");
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
    console.log(dataPosts.posts
        .filter(e => e.schedule_time === null))

    return (
        <li className="list-group-item mt-3 mb-4 project text-light c-project-card" style={{ borderRadius: '12px' }}>
            <div className='d-flex justify-content-between align-items-center'>
                <h1>{data.name}</h1>
                <div className="d-flex align-items-center">
                    <div className="dropdown">
                        <button className="btn btn-warning noborder-right c-post-actions" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false"
                        ><i className="bi bi-list"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link to={`/workflow/${data.id}/`} className="dropdown-item">Рабочии стадии</Link></li>
                            <li><Link to={`/editproject/${data.id}/`} className="dropdown-item">Изменить</Link></li>
                            <li><Link onClick={handleProjectDelete} projectid={data.id} className="dropdown-item">Удалить</Link></li>
                        </ul>
                    </div>
                    <Link to="/createpost" className="me-2 btn btn-warning c-create-post noborder-left c-create-post" role="button">Добавить пост</Link>
                </div>
            </div>
            <ul className="list-group">
                {
                    type === "public" && (
                        dataPosts.posts
                            .filter(e => e.is_sent)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Было опубликовано'} projectid={data.id} />
                            ))
                    )
                }
                {
                    type === "planned" && (
                        dataPosts.posts
                            .filter(e => !e.is_sent && e.schedule_time !== null)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Будет опубликовано в'} projectid={data.id} />
                            ))
                    )
                }
                {
                    type === "drafts" && (
                        dataPosts.posts
                            .filter(e => e.schedule_time === null)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Время публикации не добавлено'} projectid={data.id} />
                            ))
                    )
                }
                {
                    // const filteredTags = storeData.filter((tag) =>
                    // tag.title.toLowerCase().includes(searchTerm.toLowerCase())
                    // );
                     type === "all" && (
                        dataPosts.posts.map((element, i) => {
                            if (element.schedule_time === null){
                                return <PostBlock key={i} data={element} statusText={'Время публикации не добавлено'} projectid={data.id} />;
                            } else {
                                const postDate = new Date(element.schedule_time).getTime();
                                if (postDate >= new Date().getTime()) {
                                    return <PostBlock key={i} data={element} statusText={'Будет опубликовано в'} projectid={data.id} />;
                                }
                                return <PostBlock key={i} data={element} statusText={'Было опубликовано в'} projectid={data.id} />;
                            }
                        })
                    )

                }
            </ul>
        </li>
    )
}
