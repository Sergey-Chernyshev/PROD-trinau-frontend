import React from "react";
import ProjectBlock from "../../components/PostsPageComponents/ProjectBlock";
import { useOutletContext } from "react-router-dom";


export default function PostsPageAll() {





    const [allData] = useOutletContext();
    // console.log(allData)

    // Проверяем, определен ли allData
    if (!allData || !allData.message) {
        return <div>Loading...</div>; // Можно также отобразить загрузочное сообщение
    }

    // Если allData.message определен, отображаем список проектов
    return (
        <div className="tab-pane fade show active" id="pills-all" role="tabpanel"
            aria-labelledby="pills-all-tab">
            <ul className="list-group">
                {allData.message.map((e, i) => (
                    <ProjectBlock key={i} data={e} type="all" />
                ))}
            </ul>
        </div>
    );
}