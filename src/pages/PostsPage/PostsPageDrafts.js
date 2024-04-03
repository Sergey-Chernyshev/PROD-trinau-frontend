import React from 'react';
import PostBlock from '../../components/PostsPageComponents/PostBlock';
import ProjectBlock from '../../components/PostsPageComponents/ProjectBlock';
import { useOutletContext } from 'react-router-dom';

export default function PostsPageDrafts(){

    const [allData] = useOutletContext();

    if (!allData || !allData.message) {
        return <div>Loading...</div>; // Можно также отобразить загрузочное сообщение
    }

    return (
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
            aria-labelledby="pills-home-tab">
            <ul className="list-group">
                {allData.message.map((e, i) => (
                    <ProjectBlock key={i} data={e} type="drafts" />
                ))}
            </ul>
        </div>
    )
}
