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
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {ADD_POST_TOUR_CONF} from "../../data/onboarding/configs";
// import { Redirect } from 'react-router'


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register({
  'formats/emoji': EmojiBlot,
  'modules/emoji-shortname': ShortNameEmoji,
  'modules/emoji-toolbar': ToolbarEmoji,
  'modules/emoji-textarea': TextAreaEmoji
}, true);
var icons = Quill.import("ui/icons");
icons["undo"] = 'UNDO';
icons["redo"] = 'REDO';

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    ["link"],
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
  const navigate = useNavigate();

  const [projects, setProjects] = useState([])
  const [data_projects, setdata_projects] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postChanal, setPostChanal] = useState('')
  const [postProject, setPostProject] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [generation, setGeneration] = useState('')
  const [refactoring, setRefactoring] = useState('')
  const [videoNote, setVideoNote] = useState(false)

  const [backDataChannels, setBackDataChannels] = useState([])
  const [dataChannelsForSelect, setDataChannelsForSelect] = useState([])

  const [creationPostId,setCreationPostId] = useState()


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

  const changeVideoNote = (e) => {
    setVideoNote(e.target.checked)
  }

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
      schedule_time: (date && time) ? new Date(date + ' ' + time).toISOString() : null
    }
    console.log(data)
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken;
    sendRequest('POST', `https://trinau-backend.nalinor.dev/api/projects/${postProject.value}/posts/`, data, header)
      .then(response => {
        if (response.code === 0) {

          console.log("r", response)
          setCreationPostId(response.message.id)
          toast("Пост создан", {
            autoClose: 500,
            type: "action",
            theme: "dark",
            onClose: () => {
              navigate("/posts/all");
          },
          });
        }
        else {
          // console.log(response)
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
    if (description === '') {
      toast("Введите запрос в поле для ввода текста", {
        autoClose: 2500,
        type: "error",
        theme: "dark"
      })
      return;
    }
    setGeneration(true)
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
          setGeneration(false)
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

  const handleOnclickRefactor = (e) => {
    e.preventDefault();
    if (description === '') {
      toast("Введите запрос в поле для ввода текста", {
        autoClose: 2500,
        type: "error",
        theme: "dark"
      })
      return;
    }
    setRefactoring(true)
    const data = {
      text: description
    }
    console.log(data)
    const loginToken = localStorage.getItem("accessToken");
    const header = "Authorization: Bearer " + loginToken;
    sendRequest('POST', 'https://trinau-backend.nalinor.dev/api/ai/refactor/', data, header)
      .then(response => {
        if (response.code === 0) {
          console.log("r", response)
          setDescription(response.message.response)
          setRefactoring(false)
          toast("Текст исправлен", {
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

  



  const successOnClose = () => {
    console.log("regirect");
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: videoNote ?  {
      'video/*': ['.mp4', '.mov'],
     } : {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov'],
     },
    maxFiles: videoNote ? 1 : 10,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="File"
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);


  const uploadFiles = () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file); // 'photos' - это имя, по которому файлы будут доступны на сервере
    });
    formData.set('is_video_note', videoNote)

    sendRequest(
      "POST",
      `https://trinau-backend.nalinor.dev/api/projects/${postProject.value}/posts/${creationPostId}/files/upload/`, // Поменяйте на URL вашего сервера для загрузки фотографий
      formData,
      {
        "Authorization": `Bearer ${loginToken}`,
        "Content-Type": "multipart/form-data"
      }
    )
      .then(response => {
        // Обработка успешного ответа от сервера
        console.log(response);
        toast("Фотографии успешно загружены", {
          autoClose: 1500,
          type: "success",
          theme: "dark",
          onClose: successOnClose,
        });
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
        toast("Произошла ошибка при загрузке фотографий", {
          autoClose: 2500,
          type: "error",
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    if(creationPostId !== undefined) {
      uploadFiles()
    }
  }, [creationPostId])
  return (<div className=" min-vh-100 d-flex justify-content-center align-items-center mw-30" id="content">
    <Display_onboarding_if_needed data={ADD_POST_TOUR_CONF}/>
    <form className="m-5">
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
          id="project-select"

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
          id="channel-select"
        />
      </div>
      <div className="form-group p-2 border" id='fileUploader'>
          <div {...getRootProps({ className: 'dropzone d-flex' })}>
            <input {...getInputProps()} />
            <i className="bi-cloud-upload-fill pe-3"></i>
            <p>Перетащите файлы сюда или кликните для загрузки</p>
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
          {/* <button type="button" onClick={toggleVideoNote} className="btn-primary">Это кружочек</button> */}
          <input className="form-check-input" type="checkbox" onChange={changeVideoNote} checked={videoNote} id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault" style={{marginLeft: 6}}>Запостить как кружочек</label>
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
          id="content-field"
        />
        <div className="p-2 d-flex justify-content-between">
          <button type="button" onClick={handleOnclickGenerate} className={generation ? "ai-button ai-process" : "ai-button"}><i className="bi bi-robot"></i> Сгенерировать</button>
          <button type="button" onClick={handleOnclickRefactor} className={refactoring ? "ai-button refactor-ai-button ai-process" : "ai-button refactor-ai-button"}><i className="bi bi-pencil-square"></i> Исправить</button>
        </div>
      </div>
      <div className="form-group p-2 d-flex" id="schedule-fields">
        <label htmlFor="date_field" className="p-2">Дата публикации </label>
      <input type="date" id="date_field" min={new Date(new Date().setHours(new Date().getHours() + 3)).toISOString().split('T')[0]} className="form-control" onChange={handleChangeDate} value={date} />
        <input type="time" className="form-control" onChange={handleChangeTime} value={time} />
      </div>
      <div className="d-flex form-group p-2 justify-content-center">
        <button type="submit" className="btn btn-warning btn-block" style={{width: '100%'}} onClick={createPost}>Создать пост</button>
      </div>
    </form>
  </div>
  )
}
