import React from "react";
import sendRequest from "../../api/sendRequest";
import {toast} from "react-toastify";


export default function PostBlock(props) {
    const { data, project_id } = props;
    console.log(data)
    const loginToken = localStorage.getItem("accessToken");

    const handlePostDelete = (e) => {
        e.preventDefault()
        let proj_id = e.target.getAttribute("projectId");
        let post_id = e.target.getAttribute("postId");
        // eslint-disable-next-line no-restricted-globals
        let ans = confirm("Точно удалить этот пост?")
        if (ans === null || ans === false)
            return;
        const header = "Authorization: Bearer " + loginToken
        sendRequest('DELETE',
            'https://trinau-backend.nalinor.dev/api/projects/' + proj_id +
            '/posts/' + post_id + "/",
            null,
            header)
            .then(response => {
                if (response.code === 0) {
                    toast("Пост удален", {
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


    const handlePostPreview = (e) => {
        e.preventDefault()
        let proj_id = e.target.getAttribute("projectId");
        let post_id = e.target.getAttribute("postId");
        console.log(proj_id, post_id)
        toast("Начата генерация превью", {
            autoClose: 2500,
            type: "error",
            theme: "dark"
        });
        const header = "Authorization: Bearer " + loginToken
        sendRequest('POST',
            'https://trinau-backend.nalinor.dev/api/projects/' + proj_id +
            '/posts/' + post_id + "/preview/",
            null,
            header)
            .then(response => {
                if (response.code === 0) {
                    window.open(response.message.link, '_blank').focus();
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
        <li className="list-group-item mt-3 mb-3 c-post-card" style={{ borderRadius: '12px' }}>
            <div className="d-flex justify-content-between">
                <h3>{data.name}</h3>
                <div className="dropdown">
                    <button className="btn btn-sm c-post-actions" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#"
                            onClick={handlePostPreview}
                           projectId={project_id} postId={data.id}>
                            Предпросмотр</a></li>
                        <li><a className="dropdown-item" href="#">Изменить</a></li>
                        <li><a className="dropdown-item" href="#"
                             projectId={project_id} postId={data.id}
                        onClick={handlePostDelete}>Удалить</a></li>
                    </ul>
                </div>
            </div>
            <div className="p-2">
                <p dangerouslySetInnerHTML={{__html: data.text}}>
                    {/* {data.text} */}
                </p>
                <div className="d-flex justify-content-start mb-3 align-items-center">
                </div>
            </div>
        </li>
    )
}
