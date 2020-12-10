import {useEffect, useState} from "react";
import styles from '../styles/_variables.scss';
import {useLocation} from 'react-router-dom';
import $ from 'jquery';

const useInfiniteScroll = (option, funcLoadData) => {
    const {keySearch, startPage} = option;
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(startPage);
    const {pathname} = useLocation();
    const [container, setContainer] = useState($('.gallery').parent());

    useEffect(() => {
        setContainer($('.gallery').parent());
        container.css({"overflow": "auto", "height": `calc(100vh - ${styles.headerHeight}`});
        container.scroll(handleScroll);
        return () => {
            container.css({"overflow": "", "height": ""});
            container.off('scroll', handleScroll)
        }
    }, [container.get(0), pathname]);

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
        let element = container.get(0);
        if (Math.floor(element.scrollHeight - element.scrollTop) === element.clientHeight
            || Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight
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