import React from "react";
import { useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css"; // Добавьте этот импорт
import Select from 'react-select';
import { colourOptions } from '../../data/dataSelect.ts';
// import Quill from "quill";

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
        ["link", "image", "video"],
        ['emoji'],
        ["clean"],
    ],
    'emoji-toolbar': true,
    "emoji-textarea": true,
    "emoji-shortname": true,
};

export default function CreationPostPage() {

    const [value, setValue] = useState("");
    console.log(value);
    return (<div className=" min-vh-100 d-flex justify-content-center align-items-cente" id="content">
        <form>
            <h1 className="text-center">Новый пост</h1>
            <div className="form-group p-2">
                <input type="text" className="form-control" id="name" placeholder="Название поста" />
            </div>
            <div className="form-group p-2">
                <Select
                    defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="colors"
                    options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Выберите каналы"
                />
                <p className="p-2">Не нашли нужный канал? <a className="link-success">Добавить</a></p>
            </div>
            <div className="p-2">
                <Select
                    defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="colors"
                    options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Выберите проект"

                />
                <p className="p-2">Нет проекта? <a className="link-success">Создать</a></p>
            </div>
            <div className="form-group p-2">
                <ReactQuill modules={modules} theme="snow" onChange={setValue} placeholder="The content starts here..." />
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
