import React, { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {ADD_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";
import data from "bootstrap/js/src/dom/data";
import app from "../../App";


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


export default function EditProjectPage() {

  const { idproject } = useParams();

  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    })
  };

  const navigate = useNavigate();
  const [data_users, setdata_users] = useState([])
  const [projectData, setProjectData] = useState({})

  const [inputTitleProject, setInputTitleProject] = useState('')
  const [selectedUserOption, setSelectedUserOption] = useState();

  const [allUsersForSelect, setAllUsersForSelect] = useState([])

  const [endAddAllUsersForSelect, setEndAddAllUsersForSelect] = useState(true)

  const loginToken = localStorage.getItem("accessToken");
  const header = "Authorization: Bearer " + loginToken

  useEffect(() => {
    sendRequest(
        'GET',
        'https://trinau-backend.nalinor.dev/api/users/',
        null,
        header)
      .then(response => {
        if (response.code === 0) {
          setAllUsersForSelect(response.message)
          toast("Получены имена", {
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

    sendRequest('GET', 'https://trinau-backend.nalinor.dev/api/users/', null, header)
        .then(response => {
          if (response.code === 0) {
            setAllUsersForSelect(response.message)
            toast("Получены имена", {
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

  useEffect(() => {
    setdata_users(prevDataUsers => {
      return [
        ...prevDataUsers,
        ...allUsersForSelect.map(user => ({
          value: user.id,
          text: user.username,
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        }))
      ];
    });
    setEndAddAllUsersForSelect(false);
  }, [allUsersForSelect]);

  useEffect(() => {
    sendRequestWrapper(
        "GET",
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/`,
        null,
        header,
        response => {
          setProjectData(response.message)
          setInputTitleProject(response.message.name)
        }
    )
  }, []);

  useEffect(() => {
    let options = []
    console.log(projectData?.participants, data_users)
    data_users.forEach((e, i) => {
      if (projectData.participants.includes(e.value))
        options.push(e)
    })
    console.log(options)
    setSelectedUserOption(options)
  }, [allUsersForSelect, projectData]);


  const handleChangeSelectUsers = e => {
    setSelectedUserOption(e);
  }
  const handleChangeInputTitleProject = e => {
    setInputTitleProject(e.target.value);
  }
  const filterOption = (option, inputValue) => {
    return option.data.text.toLowerCase().includes(inputValue.toLowerCase());
  }

  const handleSubmitProjectForm = (e) => {
    e.preventDefault()
    let participants = []
    selectedUserOption?.forEach((e, i) => {
      participants.push(e.value)
    })
    sendRequestWrapper(
        "PATCH",
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/`,
        {
          name: inputTitleProject,
          participants: participants
        },
        header,
        response => {
          toast("Проект обновлен", {
            autoClose: 500,
            type: "action",
            theme: "dark",
            onClose: () => {
              navigate("/posts/all");
            },
          })
        }
    )
  }
  
  return (<div className=" min-vh-100 d-flex justify-content-center" id="content">
    <form >
      <h1 className="text-center">Редактировать проект</h1>
      <div className="form-group p-2">
        <input value={inputTitleProject} onChange={(e) => { handleChangeInputTitleProject(e) }} type="text" className="form-control" id="name" placeholder="Название проекта" />
      </div>
      <div className="p-2">
        <Select
          isMulti
          placeholder="Выберите или введите участников"
          isClearable={true}
          value={selectedUserOption}
          options={data_users}
          onChange={handleChangeSelectUsers}
          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <span style={{ marginLeft: 5 }}>{e.text}</span>
            </div>
          )}
          backspaceRemovesValue={false}
          filterOption={filterOption}
          styles={style}
          isLoading={endAddAllUsersForSelect}
          isDisabled={endAddAllUsersForSelect}
          id="participant-list"
        />
      </div>

      <div className="form-group p-2 d-flex justify-content-center">
        <button onClick={handleSubmitProjectForm} className="btn btn-outline-success">Применить</button>
      </div>
    </form>
  </div>
  )
}
