import React, {useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {PhotoContext} from "../../context/PhotoContext";
import * as Util from "../../Util/Util";
import './DetailImage.scss'
import * as Constants from "../../Constants/Constants";

export default function DetailImage(props) {
    const {imageId} = useParams();
    const {images, service} = useContext(PhotoContext);
    const image = images.find(it => it.id === imageId);
    const [imageUrl, setImageUrl] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const getInfoImageBySize = (strSize, arrData) => {
        return arrData.find(it => it.label === strSize);
    };

    useEffect(() => {
        const getDetailPhoto = async () => {
            let rs = await service.getDetailPhoto(imageId);
            console.log(rs);
            console.log(rs.sizes.size);

            if (rs && rs.stat === 'ok') {
                if (rs && rs.sizes && rs.sizes.size) {
                    let info = getInfoImageBySize(Constants.SIZE_LIST.MEDIUM, rs.sizes.size);
                    setImageUrl(info.source);
                    setWidth(info.width);
                    setHeight(info.height);
                }
            }
        };

        getDetailPhoto();
    }, [imageUrl]);
    return (
        <div className={'detail-image'}>
            <img src={imageUrl} alt={(image && image.title) || ''} width={width} height={height}/>
        </div>
    )

}