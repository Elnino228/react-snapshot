import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

const useInfiniteScroll = (option, funcLoadData) => {
    const {keySearch, startPage} = option;
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(startPage);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setPage(startPage);
        funcLoadData(keySearch, startPage);
        // eslint-disable-next-line
    }, [keySearch]);

    useEffect(() => {
        if (isFetching) {
            loadMore();
        }
    }, [isFetching]);

    const handleScroll = () => {
        // const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        // const body = document.body;
        // const html = document.documentElement;
        // const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        // const windowBottom = windowHeight + window.pageYOffset;
        // console.log(Math.floor(document.documentElement.getBoundingClientRect().bottom))
        // console.log(window.innerHeight)
        // if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.scrollHeight || isFetching) {
        // if (windowBottom >= docHeight) {
        if (Math.floor(document.documentElement.getBoundingClientRect().bottom) === window.innerHeight
            || Math.ceil(document.documentElement.getBoundingClientRect().bottom) === window.innerHeight
            || isFetching) {
            setPage(page => page + 1);
            setIsFetching(true);
        }
    };

    const loadMore = () => {
        funcLoadData(keySearch, page);
        setIsFetching(false);
    };

    return null;
};

export default useInfiniteScroll;