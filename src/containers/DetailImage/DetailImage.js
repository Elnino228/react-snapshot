import React, {useContext} from "react";
import {useParams} from 'react-router-dom';
import {PhotoContext} from "../../context/PhotoContext";
import * as Util from "../../Util/Util";

export default function DetailImage(props) {
    const {imageId} = useParams();
    const {images} = useContext(PhotoContext);
    const image = images.find(it => it.id === imageId);
    const imageUrl = Util.genImageUrl(image);
    return (
        <div className={'detail-image'}>
            <img src={imageUrl} alt={image.title}/>
        </div>
    )

}