import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const [showNatification, setShowNatification] = useState();
    const [responseData, setResponseData] = useState({
        username: "Загрузка...",
    });
    const navigate = useNavigate();

    const loginToken = localStorage.getItem("accessToken");

    const successOnClose = () => {
        console.log("regirect");
    };
    useEffect(() => {
        if (loginToken !== null) {
            const header = "Authorization: Bearer " + loginToken;
            sendRequest(
                "GET",
                "https://trinau-backend.nalinor.dev/api/profile/",
                null,
                header
            )
                .then((response) => {
                    console.log(response);
                    if (response.code === 0) {
                        setResponseData(response.message);
                        toast("Профиль загружен", {
                            autoClose: 1500,
                            type: "success",
                            theme: "dark",
                            onClose: successOnClose(),
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
        } else {
            toast("Вы не авторизованы. Редирект...", {
                autoClose: 1500,
                type: "error",
                theme: "dark",
                onClose: () => {
                    navigate("/login");
                },
            });
        }
    }, []);

    return (
        <>
                <h1 className="text-center">{responseData.username}</h1>
                <ul class="nav nav-pills nav-fill mb-3 bg-black"  style={{borderRadius : "6px"}} role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-projects-tab" data-bs-toggle="pill" data-bs-target="#pills-projects" type="button" role="tab" aria-controls="pills-projects" aria-selected="true">Проекты</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-channels-tab" data-bs-toggle="pill" data-bs-target="#pills-channels" type="button" role="tab" aria-controls="pills-channels" aria-selected="false">Каналы</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-acounts-tab" data-bs-toggle="pill" data-bs-target="#pills-acounts" type="button" role="tab" aria-controls="pills-acounts" aria-selected="false">Аккаунты</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-projects" role="tabpanel" aria-labelledby="pills-projects-tab">...</div>
                    <div class="tab-pane fade" id="pills-channels" role="tabpanel" aria-labelledby="pills-channels-tab">...</div>
                    <div class="tab-pane fade" id="pills-acounts" role="tabpanel" aria-labelledby="pills-acounts-tab">

                    <Link to="/logintelegramm" className="btn btn-primary" role="button"><i class="bi-telegram"></i> Привязать аккаунт Discord </Link>
                    </div>
                </div>
        </>
    );
}
