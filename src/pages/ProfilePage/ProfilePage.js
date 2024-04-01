import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest";
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){
    const [showNatification, setShowNatification] = useState()
    const [responseData, setResponseData] = useState(
        {username: "Загрузка..."}
    )
    const navigate = useNavigate()

    const loginToken = localStorage.getItem("accessToken")

    const successOnClose = () => {
        console.log("regirect")
    }
    useEffect( () => {
        if (loginToken !== null){
            const header = "Authorization: Bearer " + loginToken
            console.log(header)
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
        else{
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
            <div>Профиль</div>
            <h1>{responseData.username}</h1>
        </>


    )
}