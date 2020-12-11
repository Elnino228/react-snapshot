import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from 'react-router-dom';
import {PhotoContext} from "../../context/PhotoContext";
import './DetailImage.scss'
import * as Constants from "../../Constants/Constants";
import Gallery from "../Gallery/Gallery";

export default function DetailImage(props) {
    const {imageId} = useParams();
    const history = useHistory();
    const a = useRouteMatch();
    console.log(a);
    const {images, loading, service} = useContext(PhotoContext);

    const [image, setImage] = useState({id: imageId, width: 0, height: 0, title: '', src: ''});
    const [imageUrl, setImageUrl] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const getInfoImageBySize = (strSize, arrData) => {
        return arrData.find(it => it.label === strSize);
    };

    useEffect(() => {
        const getDetailPhoto = async () => {
            let rs = await service.getDetailPhoto(imageId);
            console.log(rs.sizes.size);

            if (rs && rs.stat === 'ok') {
                if (rs && rs.sizes && rs.sizes.size) {
                    let info =
                        getInfoImageBySize(Constants.SIZE_LIST.MEDIUM, rs.sizes.size) ||
                        getInfoImageBySize(Constants.SIZE_LIST.MEDIUM_640, rs.sizes.size) ||
                        getInfoImageBySize(Constants.SIZE_LIST.MEDIUM_800, rs.sizes.size);
                    // setImageUrl(info.source);
                    // setWidth(info.width);
                    // setHeight(info.height);
                    let tempImage = images.find(it => it.id === imageId);
                    setImage({
                        id: imageId,
                        width: info.width,
                        height: info.height,
                        title: (tempImage && tempImage.title) || '',
                        src: info.source
                    });
                }
            }
        };

        getDetailPhoto();
    }, [imageId, image.id, image.width, image.height, image.title, image.src]);

    const plusSlide = (step) => {
        let currentIndex = images.findIndex(it => it.id === imageId);
        history.replace()

    };

    return (
        <div className={'detail-container'}>
            <div className={'gallery-side'}>
                <Gallery data={images}/>
            </div>
            <div className={'detail-image'}>
                <div className={'frame-image'}>
                    <img src={imageUrl} alt={(image && image.title) || ''}/>
                </div>
                <div className={'switch-btn-wrapped'}>
                    <a className={'prev'} onClick={() => plusSlide(-1)}
                       style={{display: loading ? 'none' : 'block'}}>&#10094;</a>
                    <a className={'next'} onClick={() => plusSlide(1)}
                       style={{display: loading ? 'none' : 'block'}}>&#10095;</a>
                </div>
            </div>
        </div>
    )

}