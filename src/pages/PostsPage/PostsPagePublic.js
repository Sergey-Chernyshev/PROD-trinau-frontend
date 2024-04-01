import React from "react";
import PostBlock from "../../components/PostsPageComponents/PostBlock";


export default function PostsPagePublic() {


    return (
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
            aria-labelledby="pills-home-tab">
            <ul className="list-group">
                <PostBlock />
                <PostBlock />
            </ul>
        </div>
    )
}