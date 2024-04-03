import React from "react";
import { useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import Select from 'react-select';
import { colourOptions } from '../../data/dataSelect.ts';
import {Link, useParams} from "react-router-dom";
import { toast } from "react-toastify";
import sendRequest from "../../api/sendRequest.js";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone';
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {ADD_POST_TOUR_CONF} from "../../data/onboarding/configs";
import {toISOStringWithTimeZone} from "../../utils/Posts/toISOStringWIthTimeZone";
// import { Redirect } from 'react-router'

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
      "video"],
    ['emoji'],
    ["clean"],
  ],
  'emoji-toolbar': true,
  "emoji-textarea": true,
  "emoji-shortname": true,
};

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

export default function EditPostPage() {
  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    })
  };
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const { idproject, idpost } = useParams()


  const loginToken = localStorage.getItem("accessToken");
  const header = "Authorization: Bearer " + loginToken
  useEffect(() => {
    sendRequestWrapper(
        "GET",
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/posts/${idpost}/`,
        null,
        header,
        response => {
          setPostTitle(response.message.name)
          setDescription(response.message.text)
          if (response.message.schedule_time !== null) {
            let iso = toISOStringWithTimeZone(
                new Date(response.message.schedule_time))
            let date_c = iso.slice(0, 10);
            let time_c = iso.slice(11, 16);
            setDate(date_c)
            setTime(time_c)
          }
        }
    )
  }, []);

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }
  const handleChangeTime = (e) => {
    setTime(e.target.value)
  }

  const createPost = (e) => {
    e.preventDefault();
    const data = {
      name: postTitle,
      text: description,
      schedule_time: (date && time) ? new Date(date + ' ' + time).toISOString() : null
    }
    sendRequestWrapper(
        "PATCH",
        `https://trinau-backend.nalinor.dev/api/projects/${idproject}/posts/${idpost}/`,
        data,
        header,
        response => {
          toast("Пост обновлен", {
            autoClose: 500,
            type: "action",
            theme: "dark",
            onClose: () => {
              navigate("/posts/all");
            },
          });
        }
    )
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

  const handleOnclickRefactor = (e) => {
    e.preventDefault();
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

  return (<div className=" min-vh-100 d-flex justify-content-center align-items-center mw-30" id="content">
    <form className="m-5">
      <h1 className="text-center">Редактировать пост</h1>
      <div className="form-group p-2">
        <input value={postTitle} onChange={e => setPostTitle(e.target.value)} type="text" className="form-control" id="name" placeholder="Название поста" />
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
          <button type="button" onClick={handleOnclickGenerate} className="ai-button"><i className="bi bi-robot"></i> Сгенерировать</button>
          <button type="button" onClick={handleOnclickRefactor} className="ai-button refactor-ai-button"><i className="bi bi-robot"></i> Исправить</button>
        </div>
      </div>
      <div className="form-group p-2 d-flex" id="schedule-fields">
        <label htmlFor="date_field" className="p-2">Дата публикации </label>
        <input type="date" id="date_field" className="form-control" onChange={handleChangeDate} value={date}/>
        <input type="time" className="form-control" onChange={handleChangeTime} value={time}/>
      </div>
      <div className="d-flex form-group p-2 justify-content-center">
        <button type="submit" className="btn btn-warning btn-block" style={{width: '100%'}} onClick={createPost}>Применть</button>
      </div>
    </form>
  </div>
  )
}
