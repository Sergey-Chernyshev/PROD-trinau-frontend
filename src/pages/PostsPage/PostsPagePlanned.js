import React from 'react';
import PostBlock from '../../components/PostsPageComponents/PostBlock';

export default function PostsPagePlanned(){

    return(
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
            aria-labelledby="pills-home-tab">
            <ul className="list-group">
                <PostBlock />
            </ul>
        </div>
    )
}
