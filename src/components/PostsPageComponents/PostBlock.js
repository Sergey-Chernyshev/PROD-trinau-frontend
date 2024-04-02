import React from "react";
import { Link } from "react-router-dom";
import dateConverter from '../../utils/Posts/dateConverter'
import getFirst100Chars from '../../utils/Posts/textFormater'
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest";
export default function PostBlock(props) {
    const { data, statusText, projectid } = props;
    
    const loginToken = localStorage.getItem("accessToken");

    const handlePostDelete = (e) => {
        e.preventDefault()



        let proj_id = e.target.getAttribute("projectid");
        let post_id = e.target.getAttribute("postid");
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
        let proj_id = e.target.getAttribute("projectid");
        let post_id = e.target.getAttribute("postid");
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
        <li className="list-group-item mt-3 mb-3" style={{ borderRadius: '12px' }}>
            <div className="d-flex justify-content-between">
                <Link to={`/statistic/${data.id}/${projectid}`}><h4> <i className="bi-graph-up me-2"></i>{data.name}</h4></Link>
                <div className="dropdown">
                    <button className="btn btn-sm" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item"  >TGstat</Link></li>
                        <li>
                            <Link
                                className="dropdown-item" onClick={handlePostPreview}
                                projectid={projectid} postid={data.id}
                            >
                                Предпросмотр
                            </Link>
                        </li>
                        <div className="dropdown-divider"></div>
                        <li>
                            <Link className="dropdown-item" >
                                Изменить
                            </Link>
                        </li>
                        <li>
                            <Link 
                                className="dropdown-item" 
                                projectid={projectid} 
                                postid={data.id}
                                onClick={handlePostDelete}
                            >
                                Удалить
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="p-2">
                <p dangerouslySetInnerHTML={{ __html: getFirst100Chars(data.text) }}>
                </p>
                <div className="d-flex justify-content-start mb-3 align-items-center">
                </div>
            </div>
            <div className='p-2 d-flex justify-content-end'>
                <p style={{ fontSize: "16px" }}> {statusText} {dateConverter(data.schedule_time)}</p>
            </div>
        </li>
    )
}
