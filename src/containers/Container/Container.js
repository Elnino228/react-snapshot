import React, {useContext, useEffect, useState} from "react";
import {PhotoContext} from "../../context/PhotoContext";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Navigator from "../Navigator/Navigator";
import Gallery from "../Gallery/Gallery";
import {debounce} from 'debounce';
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";

export default function Container({keySearch}) {
    let {images, loading, runSearch} = useContext(PhotoContext);
    // let [isFetching, setIsFetching] = useState(false);
    // let [page, setPage] = useState(1);

    const loadData = (keySearch, page) => {
        runSearch(keySearch, page);
    };

    useInfiniteScroll({keySearch, startPage: 1}, loadData);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     }
    // }, []);

    // useEffect(() => {
    //     setPage(1)
    //     runSearch(keySearch, 1);
    //     // eslint-disable-next-line
    // }, [keySearch]);

    // useEffect(() => {
    //     if (!isFetching) return;
    //     console.log(page)
    //     loadMore();
    // }, [isFetching]);
    //
    //
    // let handleScroll = () => {
    //     if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isFetching) {
    //         return;
    //     }
    //     setPage(page => page + 1);
    //     setIsFetching(true);
    // };
    //
    // let loadMore = () => {
    //     runSearch(keySearch, page);
    //     setIsFetching(false);
    //
    // };


    return (
        <div className={'container'}>
            <Header/>
            <SearchForm/>
            <Navigator/>
            <h2>{keySearch} Pictures</h2>
            {<Gallery data={images}/>}
        </div>
    )
}