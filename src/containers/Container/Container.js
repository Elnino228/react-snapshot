import React, {useContext, useEffect} from "react";
import {PhotoContext} from "../../context/PhotoContext";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Navigator from "../Navigator/Navigator";
import Gallery from "../Gallery/Gallery";

export default function Container({keySearch}) {
    let {images, loading, runSearch} = useContext(PhotoContext);
    useEffect(() => {
        runSearch(keySearch);
        // eslint-disable-next-line
    }, [keySearch]);


    return (
        <div className={'container'}>
            <Header title={'Snapshot'}/>
            <SearchForm/>
            <Navigator/>
            <h2>{keySearch} Pictures</h2>
            {loading ? <Loader/> : <Gallery data={images}/>}
        </div>
    )
}