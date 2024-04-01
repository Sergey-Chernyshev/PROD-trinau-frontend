import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const [showNatification, setShowNatification] = useState()
    const [responseData, setResponseData] = useState(
        { username: "Загрузка..." }
    )
    const navigate = useNavigate()

    const loginToken = localStorage.getItem("accessToken")

    const successOnClose = () => {
        console.log("regirect")
    }
    useEffect(() => {
        if (loginToken !== null) {
            const header = "Authorization: Bearer " + loginToken
            sendRequest('GET', 'https://trinau-backend.nalinor.dev/api/profile/', null, header)
                .then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        setResponseData(response.message)
                        toast("Профиль загружен", {
                            autoClose: 1500,
                            type: "success",
                            theme: "dark",
                            onClose: successOnClose()
                        });
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
                    toast("Произошла ошибка при получении данных", {
                        autoClose: 2500,
                        type: "error",
                        theme: "dark"
                    });
                });
        }
        else {
            toast("Вы не авторизованы. Редирект...", {
                autoClose: 1500,
                type: "error",
                theme: "dark",
                onClose: () => {
                    navigate('/login');
                }
            });
        }
    }, [])



    return (
        <>
            <div className="">
                <h1>{responseData.username}</h1>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                    </div>
                </div>
            </div>
        </>


    )
}