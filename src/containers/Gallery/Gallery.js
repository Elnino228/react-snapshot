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
            return  <Image data={image} key={i}/>;
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