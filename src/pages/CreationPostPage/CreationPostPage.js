import React from "react";
import { useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import Select from 'react-select';
import { colourOptions } from '../../data/dataSelect.ts';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest.js";
import { useEffect } from "react";

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register({
  'formats/emoji': EmojiBlot,
  'modules/emoji-shortname': ShortNameEmoji,
  'modules/emoji-toolbar': ToolbarEmoji,
  'modules/emoji-textarea': TextAreaEmoji
}, true);

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [
      "link",
      // "image",
      "video"],
    ['emoji'],
    ["clean"],
  ],
  'emoji-toolbar': true,
  "emoji-textarea": true,
  "emoji-shortname": true,
};

export default function CreationPostPage() {
  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    })
  };


  const [projects, setProjects] = useState([])
  const [data_projects, setdata_projects] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postChanal, setPostChanal] = useState('')
  const [postProject, setPostProject] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')


  const [backDataChannels, setBackDataChannels] = useState([])
  const [dataChannelsForSelect, setDataChannelsForSelect] = useState([])

  useEffect(() => {
    console.log(backDataChannels)
    const newDataProjects = backDataChannels.map(project => ({
      value: project.id,
      text: project.name,
    }));

    setDataChannelsForSelect(prevDataChannels => [...prevDataChannels, ...newDataProjects]);

    console.log("ds", dataChannelsForSelect)
  }, [backDataChannels]);

  const loginToken = localStorage.getItem("accessToken");


  useEffect(() => {

    const header = "Authorization: Bearer " + loginToken;
    sendRequest(
      "GET",
      "https://trinau-backend.nalinor.dev/api/projects/",
      null,
      header
    )
      .then((response) => {
        console.log(response);
        if (response.code === 0) {
          setProjects(response.message)
          toast("Данные загружены", {
            autoClose: 1500,
            type: "success",
            theme: "dark"
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

  }, [])


  useEffect(() => {
    // Создаем новый массив проектов для data_projects
    const newDataProjects = projects.map(project => ({
      value: project.id,
      text: project.name,
    }));

    // Обновляем состояние data_projects
    setdata_projects(prevDataProjects => [...prevDataProjects, ...newDataProjects]);

    console.log("d", data_projects)
  }, [projects]);


  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }
  const handleChangeTime = (e) => {
    setTime(e.target.value)
  }
  const handleChangeSelectChanals = (e) => {
    setPostChanal(e)
  }

  const handleChangeSelectProject = (e) => {
    console.log(e)
    setPostProject(e)
  }
  const formedChannel = (channels) => {
    let ans = [];
    for (let i in channels) {
      ans.push(channels[i].value)
    }
    return ans
  }


  const filterOption = (option, inputValue) => {
    return option.data.text.toLowerCase().includes(inputValue.toLowerCase());
  }
  const createPost = (e) => {
    e.preventDefault();
    const data = {
      name: postTitle,
      text: description,
      target_channels: formedChannel(postChanal),
      schedule_time: (date && time) ? new Date(date + ' ' + time).toISOString().replace('Z', '+03:00') : null
    }
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken;
    sendRequest('POST', `https://trinau-backend.nalinor.dev/api/projects/${postProject.value}/posts/`, data, header)
      .then(response => {
        if (response.code === 0) {
          console.log("r", response)
          setDescription(response.message.response)
          toast("Пост создан", {
            autoClose: 500,
            type: "action",
            theme: "dark",
          });
        }
        else {
          console.log(response)
          toast(response.message.message, {
            autoClose: 4000,
            type: "error",
            theme: "dark"
          })
        }
      })
      .catch(error => {
        console.error(error);
        toast("Произошла ошибка при создании поста", {
          autoClose: 2500,
          type: "error",
          theme: "dark"
        });
      });
  }

  const handleOnclickGenerate = (e) => {
    e.preventDefault();
    const data = {
      text: description
    }
    console.log(data)
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken;
    sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/ai/generate/', data, header)
      .then(response => {
        if (response.code === 0) {
          console.log("r", response)
          setDescription(response.message.response)
          toast("Текст сгенерирован", {
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
  }
  useEffect(() => {
    if (postProject.value !== undefined) {
      
    
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken;
    sendRequest('GET', `https://trinau-backend.nalinor.dev/api/projects/${postProject.value}`, null, header)
      .then(response => {
        if (response.code === 0) {
          console.log("r", response)
          setBackDataChannels(response.message.channels)
          toast("Получение каналов проекта", {
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
    }

  }, [postProject])


  return (<div className=" min-vh-100 d-flex justify-content-center align-items-cente" id="content">
    <form>
      <h1 className="text-center">Новый пост</h1>
      <div className="form-group p-2">
        <input value={postTitle} onChange={e => setPostTitle(e.target.value)} type="text" className="form-control" id="name" placeholder="Название поста" />
      </div>
      <div className="form-group p-2">
        <Select
          options={data_projects}
          value={postProject}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Выберите проект"
          onChange={handleChangeSelectProject}
          styles={style}
          backspaceRemovesValue={false}

          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <span style={{ marginLeft: 5 }}>{e.text}</span>
            </div>
          )}

        />
        <p className="p-2">Нет проекта? <Link to={"/creationproject"} className="link-success">Создать</Link></p>
      </div>
      <div className="form-group p-2">
        <Select
          isMulti
          options={dataChannelsForSelect}
          value={postChanal}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Выберите каналы"
          filterOption={filterOption}
          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <span style={{ marginLeft: 5 }}>{e.text}</span>
            </div>
          )}
          onChange={handleChangeSelectChanals}
          styles={style}
        />
        <p className="p-2">Не нашли нужный канал? <Link to={"/addchannel"} className="link-success">Добавить</Link></p>
      </div>
      <div className="form-group p-2">
        <ReactQuill
          value={description}
          onChange={(e) => {
            console.log(e)
            setDescription(e)
          }}
          modules={modules}
          theme="snow"
          placeholder="Введите содержимое для поста или запрос для генерации"
        />
        <button type="button" onClick={handleOnclickGenerate} className="btn btn-warning"><i class="bi bi-robot"></i>Сгенерировать</button>

      </div>
      <div className="form-group p-2 d-flex">
        <input type="date" className="form-control" onChange={handleChangeDate} value={date} />
        <input type="time" className="form-control" onChange={handleChangeTime} value={time} />
      </div>
      <div className="form-group p-2 d-flex justify-content-center">
        <button type="submit" className="btn btn-outline-success" onClick={createPost}>Создать</button>
      </div>
    </form>
  </div>
  )
}
