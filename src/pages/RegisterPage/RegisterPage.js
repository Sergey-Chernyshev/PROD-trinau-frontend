import React from "react";
import { useState } from 'react';


import { toast } from 'react-toastify';

import sendRequest from "../../api/sendRequest";
import validatePassword from "../../utils/ValidateText/validatePassword";
import validateLogin from "../../utils/ValidateText/validateLogin";

export default function RegisterPage() {
    const [inputPassword, setInputPassword] = useState("")
    const [inputLogin, setInputLogin] = useState("")

    const successOnClose = () => {
        console.log("regirect")
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()

        const validPassword = validatePassword(inputPassword)
        const validLogin = validateLogin(inputLogin)

        if (validLogin.code === -1) {
            toast(validLogin.message, {
                autoClose: 3000,
                type: "error",
                theme: "dark"
            });
        }
        else if (validPassword.code === -1) {
            toast(validPassword.message, {
                autoClose: 3000,
                type: "error",
                theme: "dark"
            });
        }
        else {
            const data = {
                username: inputLogin,
                password: inputPassword,
                time: new Date().getTime()
            }

            sendRequest('POST', 'https://api.example.com/register', data)
                .then(response => {
                    console.log(response);
                    if (response.code === 0) {
                        toast("Регистрация успешна!", {
                            autoClose: 2500,
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


    }
    return (
        <>
            <form onSubmit={handleSubmitRegister}>
                <input placeholder='Логин' type='login' value={inputLogin} onChange={e => setInputLogin(e.target.value)} />
                <input placeholder='Пароль' type='password' value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
                <button type='submit'>Зарегестрироваться</button>
            </form>
        </>
    )
}
