import React from "react";
import ProjectBlock from "../../components/PostsPageComponents/ProjectBlock";


export default function PostsPagePublic() {


    return (
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
            aria-labelledby="pills-home-tab">
            <ul className="list-group">
                <ProjectBlock />
                <ProjectBlock />
            </ul>
        </div>
    )
}