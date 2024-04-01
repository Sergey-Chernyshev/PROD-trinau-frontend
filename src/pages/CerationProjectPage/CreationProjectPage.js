import React, { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";



export default function CreationProjectPage() {
  let data_channels = [
    {
      value: 1,
      text: 'Мы в центре',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
      </svg>
    },
    {
      value: 2,
      text: 'Central University',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
      </svg>
    },
    {
      value: 3,
      text: 'Prod Channel',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
      </svg>
    },
    {
      value: 4,
      text: ' Right Arrow',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
      </svg>
    }
  ];
  let data_users = []

  const [inputTitleProject, setInputTitleProject] = useState(null)
  const [selectedChannelOption, setSelectedChannelOption] = useState(null);
  const [selectedUserOption, setSelectedUserOption] = useState(null);

  const [allUsersForSelect, setAllUsersForSelect] = useState([])

  const loginToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const header = "Authorization: Bearer " + loginToken
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
        console.error(error);
        toast("Произошла ошибка при получении данных", {
          autoClose: 2500,
          type: "error",
          theme: "dark"
        });
      });

  }, []);

  useEffect(() => {
    console.log(allUsersForSelect)
    allUsersForSelect.forEach(user => {
      data_users.push({
        value: user.id,
        text: user.username,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
      })
    });
  }, [allUsersForSelect]);
  
  const handleChangeSelectChannels = e => {
    setSelectedChannelOption(e);
  }
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
    const dataTitle = {
      name: inputTitleProject
    }

    const header = "Authorization: Bearer " + loginToken
    sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/projects/', dataTitle, header)
      .then(response => {
        console.log(response)
        if (response.code === 0) {
          toast("Имя проекта добавлено", {
            autoClose: 1500,
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
        console.error(error);
        toast("Произошла ошибка при получении данных", {
          autoClose: 2500,
          type: "error",
          theme: "dark"
        });
      });



  }

  return (<div className=" min-vh-100 d-flex justify-content-center align-items-cente" id="content">
    <form >
      <h1 className="text-center">Новый проект</h1>
      <div className="form-group p-2">
        <input value={inputTitleProject} onChange={(e) => { handleChangeInputTitleProject(e) }} type="text" className="form-control" id="name" placeholder="Название проекта" />
      </div>
      <div className="form-group p-2">
        <Select
          isMulti
          placeholder="Выберите или введите название проекта"
          isClearable={true}
          value={selectedChannelOption}
          options={data_channels}
          onChange={handleChangeSelectChannels}
          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <span style={{ marginLeft: 5 }}>{e.text}</span>
            </div>
          )}
          filterOption={filterOption}
        />
        <p className="p-2">Не нашли нужный канал? <a className="link-success">Добавить</a></p>
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
          filterOption={filterOption}
        />
      </div>

      <div className="form-group p-2 d-flex justify-content-center">
        <button onClick={handleSubmitProjectForm} className="btn btn-outline-success">Создать</button>
      </div>
    </form>
  </div>
  )
}
