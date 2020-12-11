import React from "react";
import './Image.scss'
import {NavLink, useParams, useRouteMatch} from 'react-router-dom';
import * as Util from "../../Util/Util";

export default function Image({data}) {
    const {url} = useRouteMatch();
    const {imageId} = useParams();
    const imageUrl = Util.genImageUrl(data);
    let base = url && url.split('/').filter(it => !!it).length && url.split('/').filter(it => !!it)[0];
    return (
        <li className={`${imageId === data.id ? 'highlight-image' : ''}`}>
            <NavLink to={`/${base}/${data.id}`}>
                <img src={imageUrl} alt={data.title}/>
            </NavLink>
        </li>
    )
}