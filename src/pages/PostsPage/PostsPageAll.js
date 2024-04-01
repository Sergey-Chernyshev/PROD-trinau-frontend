import React from "react";
import ProjectBlock from "../../components/PostsPageComponents/ProjectBlock";


export default function PostsPageAll() {

    return (
        <div className="tab-pane fade show active" id="pills-all" role="tabpanel"
            aria-labelledby="pills-all-tab">
            <ul className="list-group">
                <ProjectBlock />
                <ProjectBlock />
            </ul>
        </div>
    )
}