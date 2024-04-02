import React from "react";


export default function PostBlock(props) {
    const { data } = props;
    console.log(data)
    return (
        <li className="list-group-item mt-3 mb-3 c-post-card" style={{ borderRadius: '12px' }}>
            <div className="d-flex justify-content-between">
                <h3>{data.name}</h3>
                <div className="dropdown">
                    <button className="btn btn-sm c-post-actions" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Предпросмотр</a></li>
                        <li><a className="dropdown-item" href="#">Изменить</a></li>
                        <li><a className="dropdown-item" href="#">Удалить</a></li>
                    </ul>
                </div>
            </div>
            <div className="p-2">
                <p dangerouslySetInnerHTML={{__html: data.text}}>
                    {/* {data.text} */}
                </p>
                <div className="d-flex justify-content-start mb-3 align-items-center">
                </div>
            </div>
        </li>
    )
}
