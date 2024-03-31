import React from "react";
import { useState } from 'react';


import { toast } from 'react-toastify';

import sendRequest from "../../api/sendRequest";
import validatePassword from "../../utils/ValidateText/validatePassword";
import validateLogin from "../../utils/ValidateText/validateLogin";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate()


    const [inputPassword, setInputPassword] = useState("")
    const [inputLogin, setInputLogin] = useState("")

    const successOnClose = () => {
        navigate('/login')
        console.log("regirect")
    }

    const handleSubmitLogin = (e) => {
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
                password: inputPassword
            }

            sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/profile/register/', data)
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
        <div className="d-flex justify-content-center">
            <div className=" mt-3" style={{ borderRadius: "12px", backgroundColor: "rgb(24, 24, 24)" }}>
                <form className="p-5" onSubmit={handleSubmitLogin}>
                    <div className="text-center">
                        <h1 className="text-light">Регистрация</h1>
                    </div>
                    <div className="form-group py-3">
                        <input type="text" value={inputLogin} onChange={e => setInputLogin(e.target.value)} className="form-control" id="login" placeholder="Логин" />
                    </div>
                    <div>
                        <input type="password" value={inputPassword} onChange={e => setInputPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Пароль" />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-outline-success mb-4">Зарегистрироваться</button>
                    </div>

                    <div className="text-center mt-3 text-light">
                        <p>Есть аккаунт? <Link className="link-success" to="/login">Войти</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
