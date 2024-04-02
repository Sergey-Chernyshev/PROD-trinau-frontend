import React from "react";
import { Link } from "react-router-dom";
import dateConverter from '../../utils/Posts/dateConverter'
import getFirst100Chars from '../../utils/Posts/textFormater'
export default function PostBlock(props) {
    const { data, statusText, projectId } = props;
    console.log("projectId", projectId)
    
    return (
        <li className="list-group-item mt-3 mb-3" style={{ borderRadius: '12px' }}>
            <div className="d-flex justify-content-between">
                <Link to={`/statistic/${data.id}/${projectId}`}><h4> <i class="bi-graph-up me-2"></i>{data.name}</h4></Link>
                <div className="dropdown">
                    <button className="btn btn-sm" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" href="#">TGstat</Link></li>
                        <li><Link className="dropdown-item" href="#">Предпросмотр</Link></li>
                        <div class="dropdown-divider"></div>
                        <li><Link className="dropdown-item" href="#">Изменить</Link></li>
                        <li><Link className="dropdown-item" href="#">Удалить</Link></li>

                    </ul>
                </div>
            </div>
            <div className="p-2">
                <p dangerouslySetInnerHTML={{__html: getFirst100Chars(data.text)}}>
                </p>
                <div className="d-flex justify-content-start mb-3 align-items-center">
                </div>
            </div>
            <div className='p-2 d-flex justify-content-end'>
                <p style={{fontSize: "16px"}}> {statusText} {dateConverter(data.schedule_time)}</p>
                </div>
        </li>
    )
}
