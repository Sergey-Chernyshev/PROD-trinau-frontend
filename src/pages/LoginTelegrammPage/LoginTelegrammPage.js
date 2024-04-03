import React, { useState } from "react";
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'



export default function LoginTelegrammPage() {
    const [inputPassword, setInputPassword] = useState("")
    const [inputPhone, setInputPhone] = useState("")
    const [inputCode, setInputCode] = useState("")
    const [authCode, setAuthCode] = useState(null)
    const [loginStage, setLoginStage] = useState(1)

    const navigate = useNavigate()

    const loginToken = localStorage.getItem("accessToken")


    const successOnClose = () => {
        console.log("regirect")
        navigate("/profile")
    }

    const errorOnClose = () => {
        navigate("/logintelegramm")

    }

    const handleLoginChangeStage = (e) => {
        e.preventDefault()
        if (loginStage === 1) {
            const data = {
                phone: inputPhone
            }
            const header = "Authorization: Bearer " + loginToken
            sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/bindings/add/send_code/', data, header)
                .then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        setAuthCode(response.message.auth_id)
                        toast("Введите код из телеграмм", {
                            autoClose: 1500,
                            type: "success",
                            theme: "dark",
                            onOpen: setLoginStage(prevLoginStage => prevLoginStage + 1)
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
        if (loginStage === 2) {
            const data = {
                auth_id: authCode,
                code: inputCode
            }
            const header = "Authorization: Bearer " + loginToken
            sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/bindings/add/enter_code/', data, header)
                .then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        if (response.message.status === "ok") {
                            toast("Телеграмм привязан успешно", {
                                autoClose: 1500,
                                type: "success",
                                theme: "dark",
                                onClose: () => {successOnClose()}
                            });
                        }
                        else if (response.message.status === "need_password"){
                            setLoginStage(prevLoginStage => prevLoginStage + 1)
                            toast("Введите пароль от двухфакторной антификации", {
                                autoClose: 1500,
                                type: "success",
                                theme: "dark",
                            });
                        }
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
        if (loginStage === 3) {
            const data = {
                auth_id: authCode,
                password: inputPassword
            }
            const header = "Authorization: Bearer " + loginToken
            sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/bindings/add/enter_password/', data, header)
                .then(response => {
                    console.log(response)
                    if (response.code === 0) {
                        if (response.message.status === "ok") {
                            toast("Телеграмм привязан успешно", {
                                autoClose: 1500,
                                type: "success",
                                theme: "dark",
                                onClose: () => {successOnClose()}
                            });
                        }
                        else{
                            toast("Ошибка авторизации, повторите еще раз", {
                                autoClose: 1500,
                                type: "error",
                                theme: "dark",
                                onClose: () => {errorOnClose()}
                            });
                        }
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
    };

    return (
        <div className="d-flex justify-content-center">
            <div className=" mt-3" style={{ borderRadius: "12px", backgroundColor: "rgb(24, 24, 24)" }}>
                <form className="p-5">
                    <div className="text-center">
                        <h1 className="text-light">Привязка телеграмма</h1>
                    </div>

                    <div className="form-group pt-3">
                        {
                            loginStage === 1 && (
                                <PhoneInput
                                international
  countryCallingCodeEditable={false}
                                defaultCountry="RU"
                                placeholder="Номер телефона"
                                className="form-control"
                                value={inputPhone}
                                onChange={(e) => {
                                    setInputPhone(e)
                                }
                                }/>
                            )
                        }
                        {
                            loginStage === 2 && (
                                <input
                                    type="number"
                                    value={inputCode}
                                    onChange={e => setInputCode(e.target.value)}
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Код из telegramm"
                                />
                            )
                        }
                        {
                            loginStage === 3 && (
                                <input
                                    type="password"
                                    value={inputPassword}
                                    onChange={e => setInputPassword(e.target.value)}
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Пароль двухфакторной аутентификации"
                                />
                            )
                        }

                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button onClick={handleLoginChangeStage} className="btn btn-outline-success mb-4">Далее</button>
                    </div>
                </form>
            </div>
        </div>
    )
}