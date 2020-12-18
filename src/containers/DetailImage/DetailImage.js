import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import {PhotoContext} from "../../context/PhotoContext";
import './DetailImage.scss'
import * as Constants from "../../Constants/Constants";
import Gallery from "../Gallery/Gallery";
import $ from 'jquery';
import useEffectKeyPress from "../../customHooks/useEffectKeyPress";

export default function DetailImage() {
    const {imageId, tag} = useParams();
    const history = useHistory();
    const {images, loading, service} = useContext(PhotoContext);

    const [image, setImage] = useState({id: imageId, width: 0, height: 0, title: '', src: ''});
    const [currentIndexImage, setCurrentIndexImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState($('.highlight-image'));

    const getInfoImageBySize = (strSize, arrData) => {
        return arrData.find(it => it.label === strSize);
    };

    const scrollBySelectedImage = () => {
        let selectedImage = $('.highlight-image');
        if (selectedImage.get(0)) {
            selectedImage.get(0).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
    };

    const plusSlide = (step) => {
        let currentIndex = images.findIndex(it => it.id === imageId);
        if (currentIndex + step < 0) return;
        if (currentIndex + step >= images.length) {
            service.runSearch(tag);
        }
        setCurrentIndexImage(currentIndex + step);
    };

    useEffectKeyPress((key) => {
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            plusSlide(-1);
        } else if (key === 'ArrowRight' || key === 'ArrowDown') {
            plusSlide(1);
        }
    }, [imageId]);

    useEffect(() => {
        const handleChangeImage = async () => {
            let rs = await service.getDetailPhoto(imageId);
            if (rs && rs.stat === 'ok') {
                if (rs && rs.sizes && rs.sizes.size) {
                    let info = getInfoImageBySize(Constants.SIZE_LIST.MEDIUM, rs.sizes.size) ||
                        getInfoImageBySize(Constants.SIZE_LIST.MEDIUM_640, rs.sizes.size) ||
                        getInfoImageBySize(Constants.SIZE_LIST.MEDIUM_800, rs.sizes.size);
                    setImage({
                        id: imageId,
                        width: info.width,
                        height: info.height,
                        title: (images.find(it => it.id === imageId) && images.find(it => it.id === imageId).title) || '',
                        src: info.source
                    });
                    if (images.length) {
                        setCurrentIndexImage(images.findIndex(it => it.id === imageId));
                    }
                    setSelectedImage($('.highlight-image'));
                }
            }
        };

        handleChangeImage();
    }, [imageId]);

    useEffect(() => {
        scrollBySelectedImage();
    }, [selectedImage]);

    useEffect(() => {
        if ((currentIndexImage || currentIndexImage === 0) && currentIndexImage < images.length) {
            history.push(images[currentIndexImage].id)
        }
    }, [images, currentIndexImage]);

    return (
        <div className={'detail-container'}>
            <div className={'gallery-side'}>
                <Gallery data={images}/>
            </div>
            <div className={'detail-image'}>
                <div className={'frame-image'} style={{display: loading ? 'none' : 'block'}}>
                    <img src={image.src} alt={(image.title) || ''}/>
                </div>
                <div className={'switch-btn-wrapped'}>
                    <a className={'prev'}
                       onClick={() => plusSlide(-1)}
                       style={{
                           display: loading ? 'none' : 'block',
                           pointerEvents: (currentIndexImage === 0) ? 'none' : ''
                       }}
                    >
                        <span>&#10094;</span>
                    </a>
                    <a className={'next'}
                       onClick={() => plusSlide(1)}
                       style={{
                           display: loading ? 'none' : 'block',
                           pointerEvents: (currentIndexImage >= images.length) ? 'none' : ''
                       }}
                    >
                        <span>&#10095;</span>
                    </a>
                </div>
            </div>
        </div>
    )

}