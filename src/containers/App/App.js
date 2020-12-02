import React from 'react';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './App.scss'

export default function App() {
    return (
        <div className={'app'}>
            <Header title={'Snapshot'}/>
            <SearchForm/>
        </div>
    )
}