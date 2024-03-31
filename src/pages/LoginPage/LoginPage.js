import React, { useState } from "react";
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";


export default function LoginPage(){
    const [inputPassword, setInputPassword] = useState("")
    const [inputLogin, setInputLogin] = useState("")


    const successOnClose = () => {
        console.log("regirect")
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()

        const data = {
            username: inputLogin,
            password: inputPassword,
            time: new Date().getTime()
        }

        sendRequest('POST', 'https://api.example.com/login', data)
            .then(response => {
                console.log(response);
                if (response.code === 0) {
                    toast("Вы вошли!", {
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
                toast("Произошла ошибка при отправке данных", {
                    autoClose: 2500,
                    type: "error",
                    theme: "dark"
                });
            });
        


    }
    return (
        <>
            <form onSubmit={handleSubmitLogin}>
                <input placeholder='Логин' type='login' value={inputLogin} onChange={e => setInputLogin(e.target.value)} />
                <input placeholder='Пароль' type='password' value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
                <button type='submit'>Войти</button>
            </form>
        </>
    )
}