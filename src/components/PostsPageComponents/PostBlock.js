import React from "react";


export default function PostBlock(props) {
    const { data } = props;

    return (
        <li className="list-group-item mt-3 mb-3" style={{ borderRadius: '12px' }}>
            <div className="d-flex justify-content-between">
                <h3>Название</h3>
                <div className="dropdown">
                    <button className="btn btn-sm" type="button" id="dropdownMenuButton1"
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
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, nihil
                    neque facilis doloremque fuga vero quam? Praesentium in optio nihil ut esse
                    omnis? Iste deleniti enim saepe, explica...
                </p>
                <div className="d-flex justify-content-start mb-3 align-items-center">
                </div>
            </div>
        </li>
    )
}
