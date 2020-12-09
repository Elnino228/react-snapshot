import React, {useContext} from "react";
import Image from "../Image/Image";
import NoImages from "../NoImage/NoImage";
import './Gallery.scss'
import {PhotoContext} from "../../context/PhotoContext";
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";

const Gallery = props => {
    let {images, keySearch, service} = useContext(PhotoContext);

    const loadData = (keySearch, page) => {
        service.runSearch(keySearch, page);
    };

    useInfiniteScroll({keySearch, startPage: 1}, loadData);

    let imagesNode;
    let noImagesNode;
    if (images.length > 0) {
        imagesNode = images.map((image, i) => {
            return <Image data={image} key={i}/>;
        });
    } else {
        noImagesNode = <NoImages/>;
    }
    return (
        <div className={'gallery'}>
            <ul>{imagesNode}</ul>
            {noImagesNode}
        </div>
    );
};

export default Gallery;