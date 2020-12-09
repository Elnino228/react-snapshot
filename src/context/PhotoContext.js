import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {apiKey} from "../api/config";

export const PhotoContext = createContext();

const PhotoContextProvider = props => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keySearch, setKeySearch] = useState('mountain');
    const service = {};
    service.runSearch = (query, page = 1, perPage = 24) => {
        console.log(query, page);
        setLoading(true);
        axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
            )
            .then(response => {
                if (query == keySearch) {
                    setImages([...images, ...response.data.photos.photo]);
                } else {
                    setImages(response.data.photos.photo);
                }
                setLoading(false);
                setKeySearch(query);
            })
            .catch(error => {
                console.log(
                    "Encountered an error with fetching and parsing data",
                    error
                );
            });
    };

    service.getDetailPhoto = (photoId) => {
        setLoading(true);
        return axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
            )
            .then(response => {
                setLoading(false);
                return  response.data;
            })
            .catch(error => {
                setLoading(false);
                console.log(
                    "Encountered an error with fetching and parsing data",
                    error
                );
            });
    };
    return (
        <PhotoContext.Provider value={{images, loading, service}}>
            {props.children}
        </PhotoContext.Provider>
    );
};

export default PhotoContextProvider;
