import React from "react";
import PostBlock from "./PostBlock";
import { Link } from "react-router-dom";
import {Display_onboarding_if_needed} from "../../utils/Display_onboarding_if_needed";
import {VIEW_PROJECT_TOUR_CONF} from "../../data/onboarding/configs";

export default function ProjectBlock(props) {
    const { data } = props;
    return (
        <li className="list-group-item mt-3 mb-4 project text-light c-project-card" style={{ borderRadius: '12px' }}>
            <div className='d-flex justify-content-between align-items-center'>
            <h1>Название проекта</h1>
                <Link to="/createpost" className="mx-2 btn btn-warning c-create-post" role="button">Добавить пост</Link>
            </div>
            <ul className="list-group">
                     <PostBlock/>  
                     <PostBlock/>
                     <PostBlock/>
            </ul>

    </li>
    )
}
