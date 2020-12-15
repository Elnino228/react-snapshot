import React, {createContext, useState} from "react";
import axios from "axios";
import {apiKey} from "../api/config";
import * as Constant from "../Constants/Constants";

export const PhotoContext = createContext();

const PhotoContextProvider = props => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keySearch, setKeySearch] = useState(Constant.DEFAULT_SEARCH);
    const [page, setPage] = useState(1);

    const service = {};
    service.runSearch = (query, _page, perPage = 24) => {
        console.log(query, page);
        setLoading(true);
        axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${perPage}&page=${_page || page}&format=json&nojsoncallback=1`
            )
            .then(response => {
                if (response && response.data && response.data.photos && response.data.photos.photo) {
                    let rs = response.data.photos.photo || [];
                    if (query === keySearch) {
                        //filter to remove duplicate item
                        setImages([...images, ...rs].filter((it, i, arr) => arr.indexOf(it) === i));
                    } else {
                        //filter to remove duplicate item
                        setImages(rs.filter((it, i, arr) => arr.indexOf(it) === i));
                    }
                }
                setLoading(false);
                setKeySearch(query);
                setPage(page => page + 1);
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
                return response.data;
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
