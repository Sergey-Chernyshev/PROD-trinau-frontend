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


export default function WorkflowStagesPage() {

  const { idproject } = useParams();

  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    })
  };

  const navigate = useNavigate();
  const [stages, setStages] = useState([])

  const loginToken = localStorage.getItem("accessToken");
  const header = "Authorization: Bearer " + loginToken

  useEffect(() => {
    sendRequest(
        'GET',
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/workflow/stages/`,
        null,
        header)
      .then(response => {
        if (response.code === 0) {
          setStages(response.message)
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

  const handleAddStage = (e) => {
    e.preventDefault()
    let stage = prompt("Enter stage name")
    if (stage === null) return;
    sendRequestWrapper(
        "POST",
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/workflow/stages/`,
        {"name": stage, "is_end": false},
        header,
        response => {
          window.location.href = `/workflow/${idproject}/`
        }
    )
  }

  const handleRemoveStage = (e) => {
    e.preventDefault()
    let p_id = e.target.getAttribute("projectId");
    let s_id = e.target.getAttribute("stageId");
    // eslint-disable-next-line no-restricted-globals
    let ans = confirm("Точно удалить эту стадию?")
    if (ans === null || ans === false)
      return;
    sendRequestWrapper(
        "DELETE",
        `https://trinau-backend.nalinor.dev/api/projects/${p_id}/workflow/stages/${s_id}`,
        null,
        header,
        response => {
          window.location.href = `/workflow/${idproject}/`
        }
    )
  }
  
  return (<div className=" min-vh-100" id="content">
        <h1 className="text-center">Рабочие стадии проекта #{idproject}</h1>
          <Link to={`/workflow/${idproject}/pushes`} className="">Лог изменений</Link>
          <br/>
        <button className="btn btn-primary mb-3" onClick={handleAddStage}>Добавить стадию</button>
        <div className="list-group">
          {stages.map((e, i) => (
              <div className="list-group-item d-flex gap-3 py-3" aria-current="true">
                <i className="bi bi-flag-fill"></i>
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <p className="mb-0 opacity-75">{e.name}</p>
                  </div>
                  <button className="btn btn-danger"
                          projectId={idproject} stageId={e.id}
                          onClick={handleRemoveStage}>Удалить
                  </button>
                </div>
              </div>
          ))
          }
        </div>
      </div>
  )
}
