import React, {useContext, useEffect} from "react";
import Image from "../Image/Image";
import NoImages from "../NoImage/NoImage";
import './Gallery.scss'
import {PhotoContext} from "../../context/PhotoContext";
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";
import {useParams} from 'react-router-dom';

const Gallery = (props) => {
    let imagesNode;
    let noImagesNode;
    let images = props.data;
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