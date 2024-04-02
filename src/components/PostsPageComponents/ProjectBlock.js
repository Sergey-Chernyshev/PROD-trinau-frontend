import React, { useState } from "react";
import PostBlock from "./PostBlock";
import { Link } from "react-router-dom";

export default function ProjectBlock(props) {

    const { data, type } = props
    let dataPosts = data
    // Проверяем, определен ли allData
    if (!dataPosts || !dataPosts.posts) {
        return <div>Loading...</div>; // Можно также отобразить загрузочное сообщение
    }
    return (
        <li className="list-group-item mt-3 mb-4 project text-light" style={{ borderRadius: '12px' }}>
            <div className='d-flex justify-content-between align-items-center'>
                <h1>{data.name}</h1>
                <Link to="/createpost" className="mx-2 btn btn-warning" role="button">Добавить пост</Link>
            </div>
            <ul className="list-group">
                {
                    type === "public" && (
                        dataPosts.posts
                            .filter(e => e.is_sent)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Было опубликовано'} projectId={data.id}/>
                            ))
                    )
                }
                {
                    type === "planned" && (
                        dataPosts.posts
                            .filter(e => !e.is_sent && e.schedule_time !== null)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Будет опубликовано в'} projectId={data.id} />
                            ))
                    )
                }
                {
                    type === "drafts" && (
                        dataPosts.posts
                            .filter(e => e.schedule_time === null)
                            .map((e, i) => (
                                <PostBlock key={i} data={e} statusText={'Время публикации не добавлено'} projectId={data.id}/>
                            ))
                    )
                }
                {
                    type === "all" && (
                        dataPosts.posts.map((e, i) => (
                            <PostBlock key={i} data={e}  statusText={'Было опубликовано в'} projectId={data.id} />
                        ))
                    )
                }
            </ul>
        </li>
    )
}
