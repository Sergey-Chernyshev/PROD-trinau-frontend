import React, { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import sendRequest from "../../api/sendRequest";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {ADD_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";


export default function CreationProjectPage() {

  const { idproject } = useParams();
  const [titlePage, setTitlePage] = useState("Создание проекта")



  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    })
  };

  const navigate = useNavigate();
  const [data_channels, setdata_channels] = useState([])
  const [data_users, setdata_users] = useState([])
  const [default_channels, setdefault_channels] = useState([])
  const [default_users, setdefault_users] = useState([])

  const [inputTitleProject, setInputTitleProject] = useState('')
  const [selectedChannelOption, setSelectedChannelOption] = useState(null);
  const [selectedUserOption, setSelectedUserOption] = useState([]);

  const [allUsersForSelect, setAllUsersForSelect] = useState([])
  const [allChannelsForSelect, setAllChannelsForSelect] = useState([])
  const [defaultUsersForSelect, setDefaultUsersForSelect] = useState([])
  const [defaultChannelsForSelect, setDefaultChannelsForSelect] = useState([])

  const [endAddAllUsersForSelect, setEndAddAllUsersForSelect] = useState(true)
  const [endAddAllChannelsForSelect, setEndAddAllChannelsForSelect] = useState(true)
  const [endAddDefaultUsersForSelect, setEndAddDefaultUsersForSelect] = useState(true)
  const [endAddDefaultChannelsForSelect, setEndAddDefaultChannelsForSelect] = useState(true)


  const [respIdProject, setRespIdProject] = useState()

  const [idUsersSelected, setIdUsersSelected] = useState([])

  const loginToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const header = "Authorization: Bearer " + loginToken
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

    sendRequest('GET', 'https://trinau-backend.nalinor.dev/api/bindings/getChannels/', null, header)
      .then(response => {
        if (response.code === 0) {
          console.log(response)
          setAllChannelsForSelect(response.message)
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
    setdata_channels(prevDataChannels => {
      return [
        ...prevDataChannels,
        ...allChannelsForSelect.map(channel => ({
          value: channel.id, 
          text: channel.name,
          binding: channel.binding,
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        }))
      ];
    });
    setEndAddAllChannelsForSelect(false);
  }, [allChannelsForSelect]);

  useEffect(() => {
    setdefault_users(prevDataUsers => {
      return [
        ...prevDataUsers,
        ...defaultUsersForSelect.map(user => ({
          value: user.id,
          text: user.username,
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        }))
      ];
    });
    setEndAddDefaultUsersForSelect(false);
  }, [defaultUsersForSelect]);

  useEffect(() => {
    setdefault_channels(prevDataChannels => {
      return [
        ...prevDataChannels,
        ...defaultChannelsForSelect.map(channel => ({
          value: channel.id,
          text: channel.name,
          binding: channel.binding,
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        }))
      ];
    });
    setEndAddDefaultChannelsForSelect(false);
    setSelectedChannelOption(defaultChannelsForSelect)
  }, [defaultChannelsForSelect]);

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

  useEffect( () => {
    console.log(selectedUserOption)
    const usersIds = selectedUserOption.map(obj => obj.value);
    setIdUsersSelected(usersIds)
  }, [selectedUserOption])

  const handleSubmitProjectForm = (e) => {
    e.preventDefault()
    // const usersIds =
    console.log(idUsersSelected)
    const dataTitle = {
      name: inputTitleProject,
      participants: idUsersSelected
    }
    let req_method =  "POST"
    let req_url = 'https://trinau-backend.nalinor.dev/api/projects/'
    const header = "Authorization: Bearer " + loginToken
    sendRequest(req_method, req_url, dataTitle, header)
      .then(response => {
        if (response.code === 0) {
          setRespIdProject(response.message.id)
          toast("Изменения сохранены", {
            autoClose: 1500,
            type: "action",
            theme: "dark",
            onClose: () => {
              navigate("/posts/all");
          },
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
  useEffect(() => {
    if (respIdProject !== undefined) {
      let already_created_channels_ids = []
      defaultChannelsForSelect.forEach(
          el => already_created_channels_ids.push(el.value))
      selectedChannelOption?.filter(el => !already_created_channels_ids.includes(el.value))
        .forEach(el => {
        const dataChannel = {
          type: "telegram",
          name: el.text,
          channel_id: el.value,
          binding: el.binding
        }
  
        const header = "Authorization: Bearer " + loginToken
        sendRequest('POST', `https://trinau-backend.nalinor.dev/api/projects/${respIdProject}/channels/`, dataChannel, header)
          .then(response => {
            if (response.code === 0) {
              toast("Каналы добавлены", {
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
      });


    }
  }, [respIdProject]);
  
  return (<div className=" min-vh-100 d-flex justify-content-center" id="content">
    <Display_onboarding_if_needed data={ADD_PROJECT_TOUR_CONF}/>
    <form >
      <h1 className="text-center">{titlePage}</h1>
      <div className="form-group p-2">
        <input value={inputTitleProject} onChange={(e) => { handleChangeInputTitleProject(e) }} type="text" className="form-control" id="name" placeholder="Название проекта" />
      </div>
      <div className="form-group p-2">
        <Select
          isMulti
          placeholder="Выберите или введите название канала"
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
          backspaceRemovesValue={false}
          filterOption={filterOption}
          styles={style}
          isLoading={endAddAllChannelsForSelect}
          isDisabled={endAddAllChannelsForSelect}
          id="channel-list"
        />
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
        <button onClick={handleSubmitProjectForm} className="btn btn-outline-success">Создать</button>
      </div>
    </form>
  </div>
  )
}
