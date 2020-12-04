import React from "react";
import Image from "../Image/Image";
import NoImages from "../NoImage/NoImage";
import './Gallery.scss'

const Gallery = props => {
    const results = props.data;
    let images;
    let noImages;
    // map variables to each item in fetched image array and return image component
    if (results.length > 0) {
        images = results.map((image, i) => {
            let farm = image.farm;
            let server = image.server;
            let id = image.id;
            let secret = image.secret;
            let title = image.title;
            let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
            return <Image url={url} key={i} alt={title}/>;
        });
    } else {
        noImages = <NoImages/>; // return 'not found' component if no images fetched
    }
    return (
        <div className={'gallery'}>
            <ul>{images}</ul>
            {noImages}
        </div>
    );
};

export default Gallery;