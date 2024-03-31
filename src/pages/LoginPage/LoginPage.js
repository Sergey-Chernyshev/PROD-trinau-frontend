import React, { useState } from "react";
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [inputPassword, setInputPassword] = useState("")
    const [inputLogin, setInputLogin] = useState("")

    const navigate = useNavigate()

    const successOnClose = () => {
        console.log("regirect")
        navigate("/profile")
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()

        const data = {
            username: inputLogin,
            password: inputPassword
        }

        sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/profile/login/', data)
            .then(response => {
                console.log(response);
                if (response.code === 0) {
                    localStorage.setItem('accessToken', response.message.token);
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
        <div className="d-flex justify-content-center">
            <div className=" mt-3" style={{ borderRadius: "12px", backgroundColor: "rgb(24, 24, 24)" }}>
                <form className="p-5" onSubmit={handleSubmitLogin}>
                    <div className="text-center">
                        <h1 className="text-light">Вход</h1>
                    </div>
                    <div className="form-group py-3">
                        <input type="text" value={inputLogin} onChange={e => setInputLogin(e.target.value)} className="form-control" id="login" placeholder="Логин" />
                    </div>
                    <div>
                        <input type="password" value={inputPassword} onChange={e => setInputPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Пароль" />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-outline-success mb-4">Войти</button>
                    </div>

                    <div className="text-center mt-3 text-light">
                        <p>Нет записи? <Link className="link-success" to="/register">Регистрация</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}