import React, { useState } from "react";
import PostBlock from "./PostBlock";
import { Link } from "react-router-dom";

export default function ProjectBlock(props) {

    const {data} = props
    let dataPosts = data
      // Проверяем, определен ли allData
      if (!dataPosts || !dataPosts.posts) {
        return <div>Loading...</div>; // Можно также отобразить загрузочное сообщение
    }
    console.log(data)
    return (
        <li className="list-group-item mt-3 mb-4 project text-light" style={{ borderRadius: '12px' }}>
            <div className='d-flex justify-content-between align-items-center'>
            <h1>{data.name}</h1>
                <Link to="/createpost" className="mx-2 btn btn-warning" role="button">Добавить пост</Link>
            </div>
            <ul className="list-group">
                {dataPosts.posts.map((e, i) => (
                    <PostBlock key={i} data={e} />
                ))}
            </ul>
    </li>
    )
}
