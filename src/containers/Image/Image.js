import React from "react";
import {NavLink, useRouteMatch} from 'react-router-dom';
import * as Util from "../../Util/Util";

export default function Image({data, ...props}) {
    const {url} = useRouteMatch();
    const imageUrl = Util.genImageUrl(data);
    console.log(url)
    console.log((url.match(/\//g) || []).length);
    return (
        <li>
            <NavLink to={`${url}/${data.id}`}>
                <img src={imageUrl} alt={data.title}/>
            </NavLink>
        </li>
    )
}