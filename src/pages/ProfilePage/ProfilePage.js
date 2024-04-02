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
    const [accounts, setAccounts] = useState([])

    const navigate = useNavigate();

    const loginToken = localStorage.getItem("accessToken");


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
                            // onClose: successOnClose(),
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

    useEffect(()=>{
        const header = "Authorization: Bearer " + loginToken;
            sendRequest(
                "GET",
                "https://trinau-backend.nalinor.dev/api/bindings/",
                null,
                header
            )
            .then((response) => {
                console.log(response);
                if (response.code === 0) {
                    setAccounts(response.message);
                    toast("Привязки загружены", {
                        autoClose: 1500,
                        type: "success",
                        theme: "dark",
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
    }, []);



    return (
        <>
            <h1 className="text-center">{responseData.username}</h1>
            <ul className="nav nav-pills nav-fill mb-3 bg-black" style={{ borderRadius: "6px" }} role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-projects-tab" data-bs-toggle="pill" data-bs-target="#pills-projects" type="button" role="tab" aria-controls="pills-projects" aria-selected="true">Проекты</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-channels-tab" data-bs-toggle="pill" data-bs-target="#pills-channels" type="button" role="tab" aria-controls="pills-channels" aria-selected="false">Каналы</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-acounts-tab" data-bs-toggle="pill" data-bs-target="#pills-acounts" type="button" role="tab" aria-controls="pills-acounts" aria-selected="false">Аккаунты</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-projects" role="tabpanel" aria-labelledby="pills-projects-tab">



                </div>
                <div className="tab-pane fade" id="pills-channels" role="tabpanel" aria-labelledby="pills-channels-tab">...</div>
                <div className="d-flex justify-content-between tab-pane fade" id="pills-acounts" role="tabpanel" aria-labelledby="pills-acounts-tab">
                    <div>
                            <h3>Привязанные аккаунты</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                    <div className="">
                        <Link to="/logintelegramm" className="btn btn-primary" role="button"><i className="bi-telegram"></i> Привязать аккаунт Telegram </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
