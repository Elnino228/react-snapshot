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
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight || isFetching) {
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