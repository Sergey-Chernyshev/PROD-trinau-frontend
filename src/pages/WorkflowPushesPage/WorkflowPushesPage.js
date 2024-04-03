import React, { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {ADD_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";
import data from "bootstrap/js/src/dom/data";
import app from "../../App";
import dateConverter from "../../utils/Posts/dateConverter";


function sendRequestWrapper(method, url, data, header,
                            on_success, on_error=null) {
  if (on_error === null)
    on_error = error => {
      toast("Произошла ошибка", {
        autoClose: 2500,
        type: "error",
        theme: "dark"
      })
    }
  sendRequest(method, url, data, header)
      .then(response => {
        if (response.code === 0) {
          on_success(response)
        }
        else {
          toast(response.message.message, {
            autoClose: 4000,
            type: "error",
            theme: "dark"
          })
        }
      })
      .catch(on_error);
}


export default function WorkflowPushesPage() {

  const { idproject } = useParams();

  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    })
  };

  const navigate = useNavigate();
  const [pushes, setPushes] = useState([])

  const loginToken = localStorage.getItem("accessToken");
  const header = "Authorization: Bearer " + loginToken

  useEffect(() => {
    sendRequest(
        'GET',
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/workflow/pushes/`,
        null,
        header)
      .then(response => {
        if (response.code === 0) {
          setPushes(response.message)
          toast("Получены стадии", {
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
  }, []);
  
  return (<div className=" min-vh-100" id="content">
        <h1 className="text-center">Изменения рабочих стадий проекта #{idproject}</h1>
          <Link to={`/workflow/${idproject}/`} className="">Назад к стадиям</Link>
          <br/>
        <div className="list-group">
          {pushes.map((e, i) => (
              <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                <i className="bi bi-flag-fill"></i>
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <small>{e.user.username}: {dateConverter(e.pushed_at)}</small>
                    <p className="mb-0 opacity-75">{e.from_stage?.name} -> {e.to_stage?.name}</p>
                    <small>{e.post.name}</small>
                  </div>
                </div>
              </div>
          ))
          }
        </div>
      </div>
  )
}
