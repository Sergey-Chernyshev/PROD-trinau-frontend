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
    const [allChannels, setAllChannels] = useState([])

    const navigate = useNavigate();

    const loginToken = localStorage.getItem("accessToken");
    const exit = () => {
        localStorage.setItem("accessToken", "");
        navigate("/login")
    }
    const refreshChannels = ()  => {
        const loginToken = localStorage.getItem("accessToken"); 
        const header = {
          "Authorization": `Bearer ${loginToken}`
        };
        sendRequest('POST', `https://trinau-backend.nalinor.dev/api/bindings/getChannels/reload/`, null, header)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error('Request error:', error);
          });
    }
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

            sendRequest('GET', 'https://trinau-backend.nalinor.dev/api/bindings/getChannels/', null, header)
                .then(response => {
                  if (response.code === 0) {
                    console.log(response)
                    setAllChannels(response.message)
                    toast("Получены каналы", {
                      autoClose: 500,
                      type: "action",
                      theme: "dark",
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
                  toast("Произошла ошибка при получении данных", {
                    autoClose: 2500,
                    type: "error",
                    theme: "dark"
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
        <div className='d-flex justify-content-between text-align-center'>
           <div>

            <h1 >{responseData.username}</h1>
           </div>
            <div>
            <button type="button" onClick={exit} className="ms-2 btn btn-danger"> <i className="bi bi-box-arrow-right"></i> </button>
</div>
        </div>
            <ul className="nav nav-pills nav-fill mb-3 bg-black" style={{ borderRadius: "6px" }} role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-channels-tab" data-bs-toggle="pill" data-bs-target="#pills-channels" type="button" role="tab" aria-controls="pills-channels" aria-selected="true">Каналы</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-acounts-tab" data-bs-toggle="pill" data-bs-target="#pills-acounts" type="button" role="tab" aria-controls="pills-acounts" aria-selected="false">Аккаунты</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className=" tab-pane fade show active" id="pills-channels" role="tabpanel" aria-labelledby="pills-channels-tab">
                <div className='d-flex justify-content-center'>
                <div>
                            <h3>Добавленные каналы</h3>
                        <ul className="list-group user-data-group ms-5">
                            {
                                 allChannels.map((e, i) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                                    <div>
                                    <i className="bi bi-telegram me-2"></i>
                                    {e.name}
                                    </div>
                                    </li>    
                                    ))
                            }
                        </ul>
                    </div>
                    <div>
                <button type="button" onClick={refreshChannels} className="ms-2 btn btn-dark"> <i className="bi bi-arrow-clockwise"></i></button>
                        </div>
                        </div>
                </div>
                <div className="d-flex justify-content-between tab-pane fade" id="pills-acounts" role="tabpanel" aria-labelledby="pills-acounts-tab">
                    <div>
                            <h3>Привязанные аккаунты</h3>
                        <ul className="list-group user-data-group">
                            {
                                 accounts.map((e, i) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                                    <div>
                                    <i className="bi bi-telegram me-2"></i>
                                    {e.name}
                                    </div>
                                    </li>    
                                    ))
                            }
                        </ul>
                    </div>
                    <div>
                        <Link to="/logintelegramm" className="btn btn-primary" role="button"><i className="bi-telegram"></i> Привязать аккаунт Telegram </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
