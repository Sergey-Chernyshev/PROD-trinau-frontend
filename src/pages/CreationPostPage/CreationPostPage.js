import React from "react";
import { useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css"; // Добавьте этот импорт
import Select from 'react-select';
import { colourOptions } from '../../data/dataSelect.ts';
import { Link } from "react-router-dom";


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


  const [postTitle, setPostTitle] = useState('')
  const [postChanal, setPostChanal] = useState('')
  const [postProject, setPostProject] = useState('')


  const handleChangeSelectChanals = (e) => {
    setPostChanal(e)
  }

  const handleChangeSelectProject = (e) => {
    setPostProject(e)
  }
  const filterOption = (option, inputValue) => {
    return option.data.text.toLowerCase().includes(inputValue.toLowerCase());
  }

  const data = [
    {
      value: 1,
      text: 'Мы в центре',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
    </svg>
    },
    {
      value: 2,
      text: 'Central University',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
    </svg>
    },
    {
      value: 3,
      text: 'Prod Channel',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
    </svg>
    },
    {
      value: 4,
      text: ' Right Arrow',
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
    </svg>
    }
  ];

    return (<div className=" min-vh-100 d-flex justify-content-center align-items-cente" id="content">
        <form>
            <h1 className="text-center">Новый пост</h1>
            <div className="form-group p-2">
                <input value={postTitle} onChange={e => setPostTitle(e.target.value)}  type="text" className="form-control" id="name" placeholder="Название поста" />
            </div>
            <div className="form-group p-2">
                <Select
                    isMulti
                    name="colors"
                    options={data}
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
                />
                <p className="p-2">Не нашли нужный канал? <Link to={"/addchannel"} className="link-success">Добавить</Link></p>
            </div>
            <div className="p-2">
                <Select
                    isMulti
                    name="colors"
                    options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Выберите проект"
                    onChange={handleChangeSelectProject}

                />
                <p className="p-2">Нет проекта? <Link to={"/creationproject"} className="link-success">Создать</Link></p>
            </div>
            <div className="form-group p-2">
                <ReactQuill
                  // value={}
                  modules={modules} 
                  theme="snow"  
                  placeholder="The content starts here..." 
                />
            </div>
            <div className="form-group p-2 d-flex">
                <input type="date" className="form-control" />
                <input type="time" className="form-control" />
            </div>
            <div className="form-group p-2 d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-success">Создать</button>
            </div>
        </form>
    </div>
    )
}
