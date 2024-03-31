import React, { useState } from "react";
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";


export default function LoginPage() {
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
        <div className="d-flex justify-content-center">
            <div className=" mt-3" style={{ borderRadius: "12px", backgroundColor: "rgb(24, 24, 24)" }}>
                <form className="p-5" onSubmit={handleSubmitLogin}>
                    <div className="text-center">
                        <h1 className="text-light">Вход</h1>
                    </div>
                    <div className="form-group py-3">
                        <input type="text" className="form-control" id="login" placeholder="Вход" />
                    </div>
                    <div>
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль" />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-outline-success mb-4">Войти</button>
                    </div>

                    <div className="text-center mt-3 text-light">
                        <p>Нет записи? <a className="link-success" href="#!">Регистрация</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}